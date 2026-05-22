<script setup lang="ts">
const route = useRoute()

const chapterSlug = computed(() => {
  const segments = route.path.split('/').filter(Boolean)
  return segments[1] ?? 'qubits'
})

const lessonSlug = computed(() => {
  const segments = route.path.split('/').filter(Boolean)
  return segments[2]
})

const { breadcrumbs } = useChapterNav(chapterSlug, lessonSlug)
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
