export interface Lesson {
  slug: string
  title: string
  description: string
}

export interface Chapter {
  slug: string
  title: string
  description: string
  available: boolean
  lessons: Lesson[]
}

export const chapters: Chapter[] = [
  {
    slug: 'qubits',
    title: 'Qubits & Superposition',
    description: 'Discover how quantum bits differ from classical bits, what superposition means, and why measurement changes everything.',
    available: true,
    lessons: [
      {
        slug: 'bit-vs-qubit',
        title: 'Bit vs Qubit',
        description: 'Compare a classical bit with a qubit and see why quantum information is different.'
      },
      {
        slug: 'superposition',
        title: 'Superposition',
        description: 'Explore how a qubit can hold both 0 and 1 at the same time — until you look.'
      },
      {
        slug: 'measurement',
        title: 'Measurement',
        description: 'Measure a qubit repeatedly and watch probabilities turn into definite outcomes.'
      }
    ]
  },
  {
    slug: 'gates',
    title: 'Quantum Gates',
    description: 'Learn how operations rotate and flip qubit states — the building blocks of quantum circuits.',
    available: true,
    lessons: [
      {
        slug: 'what-are-gates',
        title: 'What Are Gates?',
        description: 'See how quantum circuits are built from gates on a qubit wire.'
      },
      {
        slug: 'pauli-gates',
        title: 'Pauli Gates',
        description: 'Apply X and Z gates to flip bits and phases.'
      },
      {
        slug: 'hadamard-gate',
        title: 'Hadamard Gate',
        description: 'Use H to create superposition from |0⟩ and |1⟩.'
      }
    ]
  },
  {
    slug: 'entanglement',
    title: 'Entanglement',
    description: 'See how two qubits can become linked in ways classical bits never can.',
    available: true,
    lessons: [
      {
        slug: 'two-qubits',
        title: 'Two Qubits',
        description: 'Meet the four basis states of a two-qubit system.'
      },
      {
        slug: 'bell-state',
        title: 'Bell State',
        description: 'Build the |Φ+⟩ entangled state with H and CNOT.'
      },
      {
        slug: 'measuring-entanglement',
        title: 'Measuring Entanglement',
        description: 'Compare entangled and product states through joint measurements.'
      }
    ]
  }
]

export function getChapter(slug: string): Chapter | undefined {
  return chapters.find(chapter => chapter.slug === slug)
}

export function getLesson(chapterSlug: string, lessonSlug: string): Lesson | undefined {
  return getChapter(chapterSlug)?.lessons.find(lesson => lesson.slug === lessonSlug)
}

export function lessonPath(chapterSlug: string, lessonSlug: string): string {
  return `/learn/${chapterSlug}/${lessonSlug}`
}

export function chapterPath(chapterSlug: string): string {
  return `/learn/${chapterSlug}`
}

export function nextChapterPath(currentChapterSlug: string): string | undefined {
  const index = chapters.findIndex(chapter => chapter.slug === currentChapterSlug)

  if (index < 0) {
    return undefined
  }

  const next = chapters[index + 1]

  if (!next?.available || next.lessons.length === 0) {
    return next ? chapterPath(next.slug) : undefined
  }

  return lessonPath(next.slug, next.lessons[0]!.slug)
}
