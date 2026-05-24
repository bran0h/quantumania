<script setup lang="ts">
import { quizPath } from '~/data/chapters'

const route = useRoute()

const chapterSlug = computed(() => {
  const segments = route.path.split('/').filter(Boolean)
  return segments[1] ?? 'qubits'
})

const lessonSlug = computed(() => {
  const segments = route.path.split('/').filter(Boolean)
  const slug = segments[2]
  return slug && slug !== 'quiz' ? slug : undefined
})

const isQuizPage = computed(() => route.path.endsWith('/quiz'))

const { breadcrumbs: navBreadcrumbs } = useChapterNav(chapterSlug, lessonSlug)

const breadcrumbs = computed(() => {
  if (isQuizPage.value) {
    return [
      ...navBreadcrumbs.value,
      { label: 'Chapter quiz', to: quizPath(chapterSlug.value) }
    ]
  }

  return navBreadcrumbs.value
})
</script>

<template>
  <UContainer class="py-6 sm:py-8 lg:py-10">
    <UBreadcrumb
      :items="breadcrumbs"
      class="mb-8"
    />

    <div class="flex flex-col gap-8 lg:flex-row lg:gap-12">
      <LearnChapterSidebar />

      <main class="min-w-0 flex-1 pb-8">
        <slot />
      </main>
    </div>
  </UContainer>
</template>
