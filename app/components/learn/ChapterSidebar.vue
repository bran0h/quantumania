<script setup lang="ts">
const route = useRoute()

const chapterSlug = computed(() => {
  const segments = route.path.split('/').filter(Boolean)
  return segments[1] ?? 'qubits'
})

const { chapter } = useChapterNav(chapterSlug)
</script>

<template>
  <aside class="hidden lg:block w-64 shrink-0">
    <nav class="sticky top-24 space-y-1">
      <p class="px-3 pb-2 text-xs font-semibold uppercase tracking-wide text-muted">
        {{ chapter?.title }}
      </p>

      <NuxtLink
        v-for="(lesson, index) in chapter?.lessons"
        :key="lesson.slug"
        :to="`/learn/${chapterSlug}/${lesson.slug}`"
        class="flex items-start gap-3 rounded-lg px-3 py-2 text-sm transition-colors"
        :class="route.path.endsWith(lesson.slug)
          ? 'bg-primary/10 text-primary font-medium'
          : 'text-muted hover:bg-elevated hover:text-default'"
      >
        <span
          class="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full text-xs"
          :class="route.path.endsWith(lesson.slug)
            ? 'bg-primary text-white'
            : 'bg-elevated text-muted'"
        >
          {{ index + 1 }}
        </span>
        <span>{{ lesson.title }}</span>
      </NuxtLink>
    </nav>
  </aside>

  <div class="lg:hidden mb-6">
    <nav class="flex gap-2 overflow-x-auto pb-1">
      <UButton
        v-for="(lesson, index) in chapter?.lessons"
        :key="lesson.slug"
        :to="`/learn/${chapterSlug}/${lesson.slug}`"
        :label="`${index + 1}. ${lesson.title}`"
        size="xs"
        :color="route.path.endsWith(lesson.slug) ? 'primary' : 'neutral'"
        :variant="route.path.endsWith(lesson.slug) ? 'solid' : 'outline'"
        class="shrink-0"
      />
    </nav>
  </div>
</template>
