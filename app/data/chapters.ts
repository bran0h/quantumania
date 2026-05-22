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
    description: 'Learn how operations rotate and flip qubit states on the Bloch sphere.',
    available: false,
    lessons: []
  },
  {
    slug: 'entanglement',
    title: 'Entanglement',
    description: 'See how two qubits can become linked in ways classical bits never can.',
    available: false,
    lessons: []
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
