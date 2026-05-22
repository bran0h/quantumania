export type QubitPreset = 'zero' | 'one' | 'plus'

export interface QubitState {
  alpha: number
  beta: number
}

export interface QubitProbabilities {
  zero: number
  one: number
}

const PRESETS: Record<QubitPreset, QubitState> = {
  zero: { alpha: 1, beta: 0 },
  one: { alpha: 0, beta: 1 },
  plus: { alpha: 1 / Math.SQRT2, beta: 1 / Math.SQRT2 }
}

export function getPresetState(preset: QubitPreset): QubitState {
  return PRESETS[preset]
}

export function getProbabilities(state: QubitState): QubitProbabilities {
  return {
    zero: state.alpha ** 2,
    one: state.beta ** 2
  }
}

export function measure(state: QubitState): 0 | 1 {
  const { zero } = getProbabilities(state)
  return Math.random() < zero ? 0 : 1
}

export function ketLabel(preset: QubitPreset): string {
  switch (preset) {
    case 'zero':
      return '|0⟩'
    case 'one':
      return '|1⟩'
    case 'plus':
      return '|+⟩'
  }
}

export function ketFormula(preset: QubitPreset): string {
  switch (preset) {
    case 'zero':
      return '|0⟩'
    case 'one':
      return '|1⟩'
    case 'plus':
      return '(|0⟩ + |1⟩) / √2'
  }
}

export function blochCoordinates(state: QubitState): { x: number, y: number, z: number } {
  const { alpha, beta } = state
  return {
    x: 2 * alpha * beta,
    y: 0,
    z: alpha ** 2 - beta ** 2
  }
}

export function cloneState(state: QubitState): QubitState {
  return { alpha: state.alpha, beta: state.beta }
}

export function statesEqual(a: QubitState, b: QubitState, tolerance = 1e-6): boolean {
  return (
    Math.abs(a.alpha - b.alpha) < tolerance
    && Math.abs(a.beta - b.beta) < tolerance
  )
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

export function formatState(state: QubitState): string {
  const terms: string[] = []

  if (Math.abs(state.alpha) > 1e-6) {
    const coeff = formatCoeff(state.alpha)
    terms.push(coeff === '' || coeff === '-' ? `${coeff}|0⟩` : `${coeff}|0⟩`)
  }

  if (Math.abs(state.beta) > 1e-6) {
    const coeff = formatCoeff(state.beta)
    const sign = coeff.startsWith('-') ? ' - ' : terms.length ? ' + ' : ''
    const absCoeff = coeff.startsWith('-') ? coeff.slice(1) : coeff
    const betaTerm = absCoeff === '' ? '|1⟩' : `${absCoeff}|1⟩`
    terms.push(`${sign}${betaTerm}`.trim())
  }

  return terms.length ? terms.join('').replace(/^\+ /, '') : '0'
}

export function stateLabel(state: QubitState): string {
  if (statesEqual(state, getPresetState('zero'))) {
    return '|0⟩'
  }

  if (statesEqual(state, getPresetState('one'))) {
    return '|1⟩'
  }

  if (statesEqual(state, getPresetState('plus'))) {
    return '|+⟩'
  }

  if (statesEqual(state, { alpha: 1 / Math.SQRT2, beta: -1 / Math.SQRT2 })) {
    return '|-⟩'
  }

  return formatState(state)
}
