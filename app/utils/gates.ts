import type { QubitState } from '~/utils/qubit'

export type GateName = 'X' | 'Z' | 'H'

export interface GateInfo {
  name: GateName
  label: string
  description: string
  matrix: string
}

export const GATES: Record<GateName, GateInfo> = {
  X: {
    name: 'X',
    label: 'Pauli X',
    description: 'Bit flip — swaps |0⟩ and |1⟩.',
    matrix: '[[0, 1], [1, 0]]'
  },
  Z: {
    name: 'Z',
    label: 'Pauli Z',
    description: 'Phase flip — adds a minus sign to |1⟩.',
    matrix: '[[1, 0], [0, -1]]'
  },
  H: {
    name: 'H',
    label: 'Hadamard',
    description: 'Creates superposition from basis states.',
    matrix: '1/√2 [[1, 1], [1, -1]]'
  }
}

export function applyGate(state: QubitState, gate: GateName): QubitState {
  const { alpha, beta } = state

  switch (gate) {
    case 'X':
      return { alpha: beta, beta: alpha }
    case 'Z':
      return { alpha, beta: -beta }
    case 'H': {
      const invSqrt2 = 1 / Math.SQRT2
      return {
        alpha: invSqrt2 * (alpha + beta),
        beta: invSqrt2 * (alpha - beta)
      }
    }
  }
}

export function applyGates(state: QubitState, gates: GateName[]): QubitState {
  return gates.reduce((current, gate) => applyGate(current, gate), state)
}
