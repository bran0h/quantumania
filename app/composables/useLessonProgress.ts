const STORAGE_KEY = 'quantumania-progress'

export interface LessonProgress {
  completedLessons: string[]
  passedQuizzes: string[]
}

function defaultProgress(): LessonProgress {
  return { completedLessons: [], passedQuizzes: [] }
}

export function lessonKey(chapterSlug: string, lessonSlug: string): string {
  return `${chapterSlug}/${lessonSlug}`
}

export function useLessonProgress() {
  const progress = useState<LessonProgress>('lesson-progress', defaultProgress)
  const hydrated = useState('lesson-progress-hydrated', () => false)

  function loadFromStorage() {
    if (!import.meta.client) {
      return
    }

    try {
      const raw = localStorage.getItem(STORAGE_KEY)

      if (raw) {
        progress.value = { ...defaultProgress(), ...JSON.parse(raw) }
      }
    } catch {
      progress.value = defaultProgress()
    }

    hydrated.value = true
  }

  function saveToStorage() {
    if (!import.meta.client) {
      return
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress.value))
  }

  if (import.meta.client && !hydrated.value) {
    loadFromStorage()
  }

  watch(progress, saveToStorage, { deep: true })

  function isLessonComplete(chapterSlug: string, lessonSlug: string): boolean {
    return progress.value.completedLessons.includes(lessonKey(chapterSlug, lessonSlug))
  }

  function isQuizPassed(chapterSlug: string): boolean {
    return progress.value.passedQuizzes.includes(chapterSlug)
  }

  function markLessonComplete(chapterSlug: string, lessonSlug: string) {
    const key = lessonKey(chapterSlug, lessonSlug)

    if (!progress.value.completedLessons.includes(key)) {
      progress.value.completedLessons.push(key)
    }
  }

  function markQuizPassed(chapterSlug: string) {
    if (!progress.value.passedQuizzes.includes(chapterSlug)) {
      progress.value.passedQuizzes.push(chapterSlug)
    }
  }

  function resetProgress() {
    progress.value = defaultProgress()
    saveToStorage()
  }

  function chapterStats(chapterSlug: string, lessonSlugs: string[]) {
    const completed = lessonSlugs.filter(slug => isLessonComplete(chapterSlug, slug)).length
    const total = lessonSlugs.length
    const quizPassed = isQuizPassed(chapterSlug)

    return { completed, total, quizPassed, isComplete: completed === total && quizPassed }
  }

  return {
    progress,
    isLessonComplete,
    isQuizPassed,
    markLessonComplete,
    markQuizPassed,
    resetProgress,
    chapterStats
  }
}
