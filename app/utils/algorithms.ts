import type { BasisState, TwoQubitState } from '~/utils/twoQubit'
import {
  applyCNOT,
  applyHOnQubit,
  getBasisState,
  getTwoQubitProbabilities
} from '~/utils/twoQubit'

export type DjOracleType = 'constant-0' | 'constant-1' | 'balanced'

export type DjCircuitStep = 'init' | 'ancilla' | 'superposition' | 'oracle' | 'interference' | 'measure'

const BASIS: BasisState[] = ['00', '01', '10', '11']

export function applyXOnQubit(state: TwoQubitState, qubit: 0 | 1): TwoQubitState {
  const [a00, a01, a10, a11] = state.amplitudes

  if (qubit === 0) {
    return { amplitudes: [a10, a11, a00, a01] }
  }

  return { amplitudes: [a01, a00, a11, a10] }
}

export function applyDjOracle(state: TwoQubitState, oracle: DjOracleType): TwoQubitState {
  switch (oracle) {
    case 'constant-0':
      return state
    case 'constant-1':
      return applyXOnQubit(state, 1)
    case 'balanced':
      return applyCNOT(state, 0, 1)
  }
}

export function runDeutschJozsa(oracle: DjOracleType): TwoQubitState {
  let state = getBasisState('00')
  state = applyXOnQubit(state, 1)
  state = applyHOnQubit(state, 0)
  state = applyHOnQubit(state, 1)
  state = applyDjOracle(state, oracle)
  state = applyHOnQubit(state, 0)
  return state
}

export function deutschJozsaInputProbabilities(oracle: DjOracleType): { zero: number, one: number } {
  const state = runDeutschJozsa(oracle)
  const probs = getTwoQubitProbabilities(state)

  return {
    zero: probs['00'] + probs['01'],
    one: probs['10'] + probs['11']
  }
}

export function isDjOracleConstant(oracle: DjOracleType): boolean {
  return oracle === 'constant-0' || oracle === 'constant-1'
}

export function djOracleLabel(oracle: DjOracleType): string {
  switch (oracle) {
    case 'constant-0':
      return 'Constant: f(x) = 0'
    case 'constant-1':
      return 'Constant: f(x) = 1'
    case 'balanced':
      return 'Balanced: f(0) ≠ f(1)'
  }
}

export function djTruthTable(oracle: DjOracleType): { x: 0 | 1, fx: 0 | 1 }[] {
  switch (oracle) {
    case 'constant-0':
      return [{ x: 0, fx: 0 }, { x: 1, fx: 0 }]
    case 'constant-1':
      return [{ x: 0, fx: 1 }, { x: 1, fx: 1 }]
    case 'balanced':
      return [{ x: 0, fx: 0 }, { x: 1, fx: 1 }]
  }
}

export function deutschJozsaStateAtStep(oracle: DjOracleType, step: DjCircuitStep): TwoQubitState {
  let state = getBasisState('00')

  if (step === 'init') {
    return state
  }

  state = applyXOnQubit(state, 1)

  if (step === 'ancilla') {
    return state
  }

  state = applyHOnQubit(state, 0)
  state = applyHOnQubit(state, 1)

  if (step === 'superposition') {
    return state
  }

  state = applyDjOracle(state, oracle)

  if (step === 'oracle') {
    return state
  }

  state = applyHOnQubit(state, 0)

  if (step === 'interference') {
    return state
  }

  return state
}

export function createUniformSuperposition(): TwoQubitState {
  let state = getBasisState('00')
  state = applyHOnQubit(state, 0)
  state = applyHOnQubit(state, 1)
  return state
}

export function applyGroverOracle(state: TwoQubitState, marked: BasisState): TwoQubitState {
  const index = BASIS.indexOf(marked)
  const amplitudes = state.amplitudes.map((value, i) =>
    i === index ? -value : value
  ) as [number, number, number, number]

  return { amplitudes }
}

export function applyGroverDiffuser(state: TwoQubitState): TwoQubitState {
  const mean = state.amplitudes.reduce((sum, value) => sum + value, 0) / state.amplitudes.length

  return {
    amplitudes: state.amplitudes.map(value => 2 * mean - value) as [number, number, number, number]
  }
}

export function runGroverIteration(state: TwoQubitState, marked: BasisState): TwoQubitState {
  let next = applyGroverOracle(state, marked)
  next = applyGroverDiffuser(next)
  return next
}

export function groverStateAfterIterations(marked: BasisState, iterations: number): TwoQubitState {
  let state = createUniformSuperposition()

  for (let i = 0; i < iterations; i++) {
    state = runGroverIteration(state, marked)
  }

  return state
}

export function classicalSearchQueries(searchSpace: number): { best: number, worst: number } {
  return {
    best: 1,
    worst: searchSpace
  }
}

export function groverQueryCount(searchSpace: number): number {
  return Math.ceil((Math.PI / 4) * Math.sqrt(searchSpace))
}
