<script setup lang="ts">
import { getChapter, lessonPath } from '~/data/chapters'

definePageMeta({ layout: 'learn' })

const route = useRoute()
const chapterSlug = computed(() => route.params.chapter as string)
const lessonSlug = computed(() => route.params.lesson as string | undefined)

const contentPath = computed(() =>
  lessonSlug.value
    ? `/learn/${chapterSlug.value}/${lessonSlug.value}`
    : `/learn/${chapterSlug.value}`
)

const { data: doc } = await useAsyncData(
  () => `lesson-doc-${contentPath.value}`,
  () => queryCollection('lessons').path(contentPath.value).first()
)

if (!doc.value) {
  throw createError({ statusCode: 404, statusMessage: 'Page not found' })
}

if (!getChapter(chapterSlug.value)) {
  throw createError({ statusCode: 404, statusMessage: 'Chapter not found' })
}

const {
  chapter,
  lesson,
  lessonIndex,
  prevPath,
  nextPath,
  nextLabel,
  prevLabel
} = useChapterNav(chapterSlug, lessonSlug)

const pageTitle = computed(() =>
  doc.value?.title ?? lesson.value?.title ?? chapter.value?.title ?? 'Learn'
)

const pageDescription = computed(() =>
  doc.value?.description ?? lesson.value?.description ?? chapter.value?.description ?? ''
)

useSeoMeta({
  title: () => `${pageTitle.value} — Quantumania`,
  description: () => pageDescription.value
})

const firstLessonPath = computed(() => {
  const first = chapter.value?.lessons[0]
  return first ? lessonPath(chapterSlug.value, first.slug) : undefined
})
</script>

<template>
  <div>
    <LearnLessonHeader
      :title="pageTitle"
      :description="pageDescription"
      :lesson-number="lessonSlug ? lessonIndex + 1 : undefined"
      :total-lessons="lessonSlug ? chapter?.lessons.length : undefined"
    />

    <ContentRenderer
      v-if="doc"
      :value="doc"
      class="max-w-3xl prose prose-neutral dark:prose-invert prose-p:text-muted prose-strong:text-default mb-8"
    />

    <UButton
      v-if="!lessonSlug && firstLessonPath"
      :to="firstLessonPath"
      :label="`Start Lesson 1: ${chapter?.lessons[0]?.title}`"
      trailing-icon="i-lucide-arrow-right"
      size="lg"
      class="mt-4"
    />

    <LearnLessonNav
      v-if="lessonSlug"
      :chapter-slug="chapterSlug"
      :lesson-slug="lessonSlug"
      :prev-path="prevPath"
      :next-path="nextPath"
      :next-label="nextLabel"
      :prev-label="prevLabel"
    />
  </div>
</template>
