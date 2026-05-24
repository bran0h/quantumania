export interface GlossaryTerm {
  term: string
  definition: string
  href: string
  chapter: string
}

export const glossaryTerms: GlossaryTerm[] = [
  {
    term: 'Qubit',
    definition: 'The basic unit of quantum information — like a bit, but can exist in superposition.',
    href: '/learn/qubits/bit-vs-qubit',
    chapter: 'Qubits & Superposition'
  },
  {
    term: 'Superposition',
    definition: 'A quantum combination of basis states until measurement collapses the state.',
    href: '/learn/qubits/superposition',
    chapter: 'Qubits & Superposition'
  },
  {
    term: 'Measurement',
    definition: 'Extracting a classical 0 or 1 from a qubit, with probabilities set by its amplitudes.',
    href: '/learn/qubits/measurement',
    chapter: 'Qubits & Superposition'
  },
  {
    term: 'Quantum gate',
    definition: 'An operation that transforms a qubit state on a circuit wire.',
    href: '/learn/gates/what-are-gates',
    chapter: 'Quantum Gates'
  },
  {
    term: 'Pauli X',
    definition: 'Bit-flip gate — swaps |0⟩ and |1⟩.',
    href: '/learn/gates/pauli-gates',
    chapter: 'Quantum Gates'
  },
  {
    term: 'Pauli Z',
    definition: 'Phase-flip gate — adds a minus sign to the |1⟩ component.',
    href: '/learn/gates/pauli-gates',
    chapter: 'Quantum Gates'
  },
  {
    term: 'Hadamard (H)',
    definition: 'Creates equal superposition from |0⟩ or |−⟩ from |1⟩.',
    href: '/learn/gates/hadamard-gate',
    chapter: 'Quantum Gates'
  },
  {
    term: 'Two-qubit state',
    definition: 'A joint system with four basis states: |00⟩, |01⟩, |10⟩, |11⟩.',
    href: '/learn/entanglement/two-qubits',
    chapter: 'Entanglement'
  },
  {
    term: 'Entanglement',
    definition: 'A joint state that cannot be described by separate qubit values.',
    href: '/learn/entanglement/measuring-entanglement',
    chapter: 'Entanglement'
  },
  {
    term: 'Bell state |Φ+⟩',
    definition: 'An entangled state (|00⟩ + |11⟩) / √2 built with H and CNOT.',
    href: '/learn/entanglement/bell-state',
    chapter: 'Entanglement'
  },
  {
    term: 'CNOT',
    definition: 'Controlled-NOT gate — flips the target qubit when the control is |1⟩.',
    href: '/learn/entanglement/bell-state',
    chapter: 'Entanglement'
  },
  {
    term: 'Oracle',
    definition: 'A black-box gate that encodes problem information into quantum amplitudes.',
    href: '/learn/algorithms/deutsch-jozsa',
    chapter: 'Quantum Algorithms'
  },
  {
    term: 'Diffuser',
    definition: 'Grover step that reflects amplitudes about their average to amplify the marked state.',
    href: '/learn/algorithms/grover-search',
    chapter: 'Quantum Algorithms'
  },
  {
    term: 'Grover search',
    definition: 'Quantum search algorithm with about √N queries instead of N classically.',
    href: '/learn/algorithms/grover-search',
    chapter: 'Quantum Algorithms'
  }
]

export const glossaryChapters = [...new Set(glossaryTerms.map(term => term.chapter))]
