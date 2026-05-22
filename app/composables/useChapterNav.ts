import {
  chapterPath,
  getChapter,
  getLesson,
  lessonPath,
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

  const nextPath = computed(() =>
    nextLesson.value ? lessonPath(chapterSlugRef.value, nextLesson.value.slug) : undefined
  )

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
    prevLesson,
    nextLesson,
    prevPath,
    nextPath,
    breadcrumbs
  }
}
