<script setup lang="ts">
import { getChapter } from '~/data/chapters'

definePageMeta({ layout: 'learn' })

const route = useRoute()
const chapterSlug = computed(() => route.params.chapter as string)

const chapter = getChapter(chapterSlug.value)

if (!chapter) {
  throw createError({ statusCode: 404, statusMessage: 'Chapter not found' })
}

const lastLesson = chapter.lessons.at(-1)
const { prevPath } = useChapterNav(chapterSlug, lastLesson?.slug)

useSeoMeta({
  title: () => `${chapter.title} Quiz — Quantumania`,
  description: () => `Test your understanding of ${chapter.title}.`
})
</script>

<template>
  <div>
    <LearnLessonHeader
      :title="`${chapter.title} Quiz`"
      :description="`Check what you learned in ${chapter.title}.`"
    />

    <LearnChapterQuiz :chapter-slug="chapterSlug" />

    <LearnLessonNav
      v-if="lastLesson"
      :chapter-slug="chapterSlug"
      :lesson-slug="lastLesson.slug"
      :prev-path="prevPath"
      :prev-label="`Previous: ${lastLesson.title}`"
    />
  </div>
</template>
