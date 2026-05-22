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
