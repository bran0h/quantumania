import {
  chapterPath,
  getChapter,
  getLesson,
  lessonPath,
  nextChapterPath,
  quizPath,
  type Chapter,
  type Lesson
} from '~/data/chapters'

export function useChapterNav(chapterSlug: MaybeRef<string>, lessonSlug?: MaybeRef<string | undefined>) {
  const chapterSlugRef = toRef(chapterSlug)
  const lessonSlugRef = lessonSlug !== undefined ? toRef(lessonSlug) : ref<string | undefined>(undefined)

  const chapter = computed<Chapter | undefined>(() => getChapter(chapterSlugRef.value))

  const lesson = computed<Lesson | undefined>(() => {
    const slug = lessonSlugRef.value
    return slug ? getLesson(chapterSlugRef.value, slug) : undefined
  })

  const lessonIndex = computed(() => {
    if (!chapter.value || !lessonSlugRef.value) {
      return -1
    }

    return chapter.value.lessons.findIndex(item => item.slug === lessonSlugRef.value)
  })

  const isLastLesson = computed(() =>
    chapter.value !== undefined
    && lessonIndex.value >= 0
    && lessonIndex.value === chapter.value.lessons.length - 1
  )

  const prevLesson = computed<Lesson | undefined>(() => {
    if (!chapter.value || lessonIndex.value <= 0) {
      return undefined
    }

    return chapter.value.lessons[lessonIndex.value - 1]
  })

  const nextLesson = computed<Lesson | undefined>(() => {
    if (!chapter.value || lessonIndex.value < 0) {
      return undefined
    }

    return chapter.value.lessons[lessonIndex.value + 1]
  })

  const prevPath = computed(() =>
    prevLesson.value
      ? lessonPath(chapterSlugRef.value, prevLesson.value.slug)
      : chapterPath(chapterSlugRef.value)
  )

  const nextPath = computed(() => {
    if (nextLesson.value) {
      return lessonPath(chapterSlugRef.value, nextLesson.value.slug)
    }

    if (isLastLesson.value) {
      return quizPath(chapterSlugRef.value)
    }

    return undefined
  })

  const nextLabel = computed(() => {
    if (nextLesson.value) {
      return 'Next lesson'
    }

    if (isLastLesson.value) {
      return 'Chapter quiz'
    }

    return undefined
  })

  const prevLabel = computed(() => {
    if (prevLesson.value) {
      return `Previous: ${prevLesson.value.title}`
    }

    return 'Chapter overview'
  })

  const nextChapterLink = computed(() => nextChapterPath(chapterSlugRef.value))

  const breadcrumbs = computed(() => {
    const items = [
      { label: 'Learn', to: '/learn' },
      { label: chapter.value?.title ?? chapterSlugRef.value, to: chapterPath(chapterSlugRef.value) }
    ]

    if (lesson.value && lessonSlugRef.value) {
      items.push({
        label: lesson.value.title,
        to: lessonPath(chapterSlugRef.value, lessonSlugRef.value)
      })
    }

    return items
  })

  return {
    chapter,
    lesson,
    lessonIndex,
    isLastLesson,
    prevLesson,
    nextLesson,
    prevPath,
    nextPath,
    nextLabel,
    prevLabel,
    nextChapterLink,
    breadcrumbs
  }
}
