export interface QuizQuestion {
  question: string
  options: string[]
  correctIndex: number
  explanation: string
}

export const quizzes: Record<string, QuizQuestion[]> = {
  qubits: [
    {
      question: 'How many definite values can a classical bit hold at once?',
      options: ['One (0 or 1)', 'Two at once', 'Any fraction between 0 and 1', 'Infinite values'],
      correctIndex: 0,
      explanation: 'A classical bit is always exactly 0 or 1 — never both, never a fraction.'
    },
    {
      question: 'What happens when you measure a qubit in superposition (e.g. |+⟩)?',
      options: [
        'You get 0.5 as the answer',
        'You get 0 or 1 at random, with predictable statistics over many shots',
        'The qubit stays in superposition',
        'Both 0 and 1 are returned simultaneously'
      ],
      correctIndex: 1,
      explanation: 'Each measurement yields a definite 0 or 1. Random single outcomes, predictable probabilities over many repetitions.'
    },
    {
      question: 'Which state is an equal superposition of |0⟩ and |1⟩?',
      options: ['|0⟩', '|1⟩', '|+⟩', 'None of the above'],
      correctIndex: 2,
      explanation: '|+⟩ = (|0⟩ + |1⟩) / √2 gives 50% probability for each outcome when measured.'
    }
  ],
  gates: [
    {
      question: 'What does the Pauli X gate do?',
      options: ['Flips |0⟩ ↔ |1⟩', 'Adds a phase to |1⟩', 'Creates superposition', 'Measures the qubit'],
      correctIndex: 0,
      explanation: 'Pauli X is the quantum NOT gate — it swaps computational basis states.'
    },
    {
      question: 'Which gate creates superposition from |0⟩?',
      options: ['X', 'Z', 'H', 'CNOT'],
      correctIndex: 2,
      explanation: 'H|0⟩ = |+⟩, an equal mix of 0 and 1.'
    },
    {
      question: 'In a circuit diagram, how do you read gate order?',
      options: ['Right to left', 'Top to bottom', 'Left to right', 'Random order'],
      correctIndex: 2,
      explanation: 'Circuits flow left to right: prepare |0⟩, apply gates in sequence, then measure.'
    }
  ],
  entanglement: [
    {
      question: 'How many basis states does a two-qubit system have?',
      options: ['2', '3', '4', '8'],
      correctIndex: 2,
      explanation: 'Two qubits have four computational basis states: |00⟩, |01⟩, |10⟩, |11⟩.'
    },
    {
      question: 'Which outcomes appear when measuring the Bell state |Φ+⟩ = (|00⟩ + |11⟩) / √2?',
      options: ['Only |00⟩ and |11⟩', 'Only |01⟩ and |10⟩', 'All four equally', 'Only |00⟩'],
      correctIndex: 0,
      explanation: 'Bell |Φ+⟩ has zero amplitude for |01⟩ and |10⟩ — the qubits always agree.'
    },
    {
      question: 'What makes entanglement different from a product state?',
      options: [
        'Entangled qubits have more qubits',
        'You cannot describe each qubit independently',
        'Entangled states never change under measurement',
        'Product states cannot be measured'
      ],
      correctIndex: 1,
      explanation: 'Entangled joint states cannot be factored into separate descriptions for each qubit.'
    }
  ]
}

export function getQuiz(chapterSlug: string): QuizQuestion[] {
  return quizzes[chapterSlug] ?? []
}
