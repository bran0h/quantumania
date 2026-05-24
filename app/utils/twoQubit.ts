export type BasisState = '00' | '01' | '10' | '11'

export type TwoQubitCircuitStep = 'init' | 'hadamard' | 'cnot' | 'measure'

export interface TwoQubitState {
  amplitudes: [number, number, number, number]
}

const BASIS_INDEX: Record<BasisState, number> = {
  '00': 0,
  '01': 1,
  '10': 2,
  '11': 3
}

export function getBasisState(basis: BasisState): TwoQubitState {
  const amplitudes: [number, number, number, number] = [0, 0, 0, 0]
  amplitudes[BASIS_INDEX[basis]] = 1
  return { amplitudes }
}

export function cloneTwoQubitState(state: TwoQubitState): TwoQubitState {
  return { amplitudes: [...state.amplitudes] as [number, number, number, number] }
}

export function getTwoQubitProbabilities(state: TwoQubitState): Record<BasisState, number> {
  const [a00, a01, a10, a11] = state.amplitudes
  return {
    '00': a00 ** 2,
    '01': a01 ** 2,
    '10': a10 ** 2,
    '11': a11 ** 2
  }
}

export function applyHOnQubit(state: TwoQubitState, qubit: 0 | 1): TwoQubitState {
  const [a00, a01, a10, a11] = state.amplitudes
  const invSqrt2 = 1 / Math.SQRT2

  if (qubit === 0) {
    return {
      amplitudes: [
        invSqrt2 * (a00 + a10),
        invSqrt2 * (a01 + a11),
        invSqrt2 * (a00 - a10),
        invSqrt2 * (a01 - a11)
      ]
    }
  }

  return {
    amplitudes: [
      invSqrt2 * (a00 + a01),
      invSqrt2 * (a00 - a01),
      invSqrt2 * (a10 + a11),
      invSqrt2 * (a10 - a11)
    ]
  }
}

export function applyCNOT(state: TwoQubitState, control: 0 | 1, target: 0 | 1): TwoQubitState {
  if (control === target) {
    return cloneTwoQubitState(state)
  }

  const next = cloneTwoQubitState(state)

  if (control === 0 && target === 1) {
    next.amplitudes[2] = state.amplitudes[3]
    next.amplitudes[3] = state.amplitudes[2]
  }

  if (control === 1 && target === 0) {
    next.amplitudes[1] = state.amplitudes[3]
    next.amplitudes[3] = state.amplitudes[1]
  }

  return next
}

export function createBellPhiPlus(): TwoQubitState {
  let state = getBasisState('00')
  state = applyHOnQubit(state, 0)
  return applyCNOT(state, 0, 1)
}

export function createProductPlusZero(): TwoQubitState {
  return applyHOnQubit(getBasisState('00'), 0)
}

export function measureTwoQubits(state: TwoQubitState): { q0: 0 | 1, q1: 0 | 1, basis: BasisState } {
  const probabilities = getTwoQubitProbabilities(state)
  const roll = Math.random()
  let cumulative = 0

  for (const basis of ['00', '01', '10', '11'] as BasisState[]) {
    cumulative += probabilities[basis]

    if (roll < cumulative) {
      return {
        q0: basis[0] === '0' ? 0 : 1,
        q1: basis[1] === '0' ? 0 : 1,
        basis
      }
    }
  }

  return { q0: 1, q1: 1, basis: '11' }
}

export function twoQubitStateLabel(state: TwoQubitState): string {
  const bell = createBellPhiPlus()
  const product = createProductPlusZero()

  if (statesEqual(state, bell)) {
    return '|Φ+⟩ = (|00⟩ + |11⟩) / √2'
  }

  if (statesEqual(state, product)) {
    return '|+⟩|0⟩'
  }

  for (const basis of ['00', '01', '10', '11'] as BasisState[]) {
    if (statesEqual(state, getBasisState(basis))) {
      return `|${basis}⟩`
    }
  }

  return formatTwoQubitState(state)
}

function formatTwoQubitState(state: TwoQubitState): string {
  const terms: string[] = []

  for (const basis of ['00', '01', '10', '11'] as BasisState[]) {
    const value = state.amplitudes[BASIS_INDEX[basis]] ?? 0

    if (Math.abs(value) < 1e-6) {
      continue
    }

    const coeff = formatCoeff(value)
    const ket = `|${basis}⟩`
    terms.push(coeff === '' || coeff === '-' ? `${coeff}${ket}` : `${coeff}${ket}`)
  }

  return terms.length ? terms.join(' + ').replace(/\+ -/g, '- ') : '0'
}

function formatCoeff(value: number): string {
  if (Math.abs(value - 1) < 1e-6) {
    return ''
  }

  if (Math.abs(value + 1) < 1e-6) {
    return '-'
  }

  if (Math.abs(Math.abs(value) - 1 / Math.SQRT2) < 1e-6) {
    return value > 0 ? '1/√2' : '-1/√2'
  }

  return value.toFixed(2)
}

function statesEqual(a: TwoQubitState, b: TwoQubitState, tolerance = 1e-6): boolean {
  return a.amplitudes.every((value, index) => Math.abs(value - b.amplitudes[index]!) < tolerance)
}

export function basisLabel(basis: BasisState): string {
  return `|${basis}⟩`
}
