import type { BasisState, TwoQubitState } from '~/utils/twoQubit'
import {
  applyCNOT,
  applyHOnQubit,
  getBasisState
} from '~/utils/twoQubit'
import type { DjOracleType } from '~/utils/algorithms'
import {
  applyDjOracle,
  applyGroverDiffuser,
  applyGroverOracle,
  applyXOnQubit
} from '~/utils/algorithms'

export type PlaygroundStepDef
  = | { kind: 'H', qubit: 0 | 1 }
    | { kind: 'X', qubit: 0 | 1 }
    | { kind: 'Z', qubit: 0 | 1 }
    | { kind: 'CNOT', control: 0 | 1, target: 0 | 1 }
    | { kind: 'DJ_ORACLE', oracle: DjOracleType }
    | { kind: 'GROVER_ORACLE', marked: BasisState }
    | { kind: 'DIFFUSER' }

export interface PlaygroundStep {
  id: string
  def: PlaygroundStepDef
}

export interface PlaygroundDropPayload {
  source: 'palette' | 'circuit'
  def?: PlaygroundStepDef
  index?: number
  qubit?: 0 | 1
  mode?: 'insert' | 'wire'
}

export interface PlaygroundPreset {
  id: string
  label: string
  description: string
  initial: BasisState
  steps: PlaygroundStepDef[]
}

export function isSingleQubitStep(def: PlaygroundStepDef): def is Extract<PlaygroundStepDef, { kind: 'H' | 'X' | 'Z' }> {
  return def.kind === 'H' || def.kind === 'X' || def.kind === 'Z'
}

export function withQubit(def: PlaygroundStepDef, qubit: 0 | 1): PlaygroundStepDef {
  if (isSingleQubitStep(def)) {
    return { ...def, qubit }
  }

  return def
}

export function qubitFromPointer(event: DragEvent, element: HTMLElement): 0 | 1 {
  const rect = element.getBoundingClientRect()
  return event.clientY < rect.top + rect.height / 2 ? 0 : 1
}

export function createPlaygroundStep(def: PlaygroundStepDef): PlaygroundStep {
  return {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
    def
  }
}

export function applyZOnQubit(state: TwoQubitState, qubit: 0 | 1): TwoQubitState {
  const [a00, a01, a10, a11] = state.amplitudes

  if (qubit === 0) {
    return { amplitudes: [a00, a01, -a10, -a11] }
  }

  return { amplitudes: [a00, -a01, a10, -a11] }
}

export function applyPlaygroundStep(state: TwoQubitState, step: PlaygroundStepDef): TwoQubitState {
  switch (step.kind) {
    case 'H':
      return applyHOnQubit(state, step.qubit)
    case 'X':
      return applyXOnQubit(state, step.qubit)
    case 'Z':
      return applyZOnQubit(state, step.qubit)
    case 'CNOT':
      return applyCNOT(state, step.control, step.target)
    case 'DJ_ORACLE':
      return applyDjOracle(state, step.oracle)
    case 'GROVER_ORACLE':
      return applyGroverOracle(state, step.marked)
    case 'DIFFUSER':
      return applyGroverDiffuser(state)
  }
}

export function runPlaygroundCircuit(
  steps: PlaygroundStepDef[],
  initial: BasisState = '00'
): TwoQubitState {
  return steps.reduce(
    (state, step) => applyPlaygroundStep(state, step),
    getBasisState(initial)
  )
}

export function stepLabel(step: PlaygroundStepDef): string {
  switch (step.kind) {
    case 'H':
    case 'X':
    case 'Z':
      return `${step.kind} on q${step.qubit}`
    case 'CNOT':
      return `CNOT q${step.control} → q${step.target}`
    case 'DJ_ORACLE':
      return step.oracle === 'balanced' ? 'Oracle (balanced)' : `Oracle (${step.oracle === 'constant-0' ? 'f=0' : 'f=1'})`
    case 'GROVER_ORACLE':
      return `Oracle mark |${step.marked}⟩`
    case 'DIFFUSER':
      return 'Grover diffuser'
  }
}

export function stepShortLabel(step: PlaygroundStepDef): string {
  switch (step.kind) {
    case 'H':
    case 'X':
    case 'Z':
      return step.kind
    case 'CNOT':
      return 'CNOT'
    case 'DJ_ORACLE':
      return 'O'
    case 'GROVER_ORACLE':
      return 'O'
    case 'DIFFUSER':
      return 'D'
  }
}

export function stepSublabel(step: PlaygroundStepDef): string | undefined {
  switch (step.kind) {
    case 'H':
    case 'X':
    case 'Z':
      return `q${step.qubit}`
    case 'CNOT':
      return `${step.control}→${step.target}`
    case 'GROVER_ORACLE':
      return step.marked
    case 'DJ_ORACLE':
      return step.oracle === 'balanced' ? 'bal' : step.oracle === 'constant-0' ? 'f0' : 'f1'
    default:
      return undefined
  }
}

export const playgroundPresets: PlaygroundPreset[] = [
  {
    id: 'bell',
    label: 'Bell |Φ+⟩',
    description: 'H on q0, then CNOT — classic entanglement',
    initial: '00',
    steps: [
      { kind: 'H', qubit: 0 },
      { kind: 'CNOT', control: 0, target: 1 }
    ]
  },
  {
    id: 'dj-setup',
    label: 'Deutsch–Jozsa',
    description: 'Prepare ancilla and superposition — add a DJ oracle + H on q0',
    initial: '00',
    steps: [
      { kind: 'X', qubit: 1 },
      { kind: 'H', qubit: 0 },
      { kind: 'H', qubit: 1 }
    ]
  },
  {
    id: 'grover',
    label: 'Grover iteration',
    description: 'Uniform superposition, then add mark oracle + diffuser',
    initial: '00',
    steps: [
      { kind: 'H', qubit: 0 },
      { kind: 'H', qubit: 1 },
      { kind: 'GROVER_ORACLE', marked: '11' },
      { kind: 'DIFFUSER' }
    ]
  },
  {
    id: 'superposition',
    label: 'Product |+⟩|+⟩',
    description: 'Independent superposition on both qubits',
    initial: '00',
    steps: [
      { kind: 'H', qubit: 0 },
      { kind: 'H', qubit: 1 }
    ]
  }
]
