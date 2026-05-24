<script setup lang="ts">
const route = useRoute()

const chapterSlug = computed(() => {
  const segments = route.path.split('/').filter(Boolean)
  return segments[1] ?? 'qubits'
})

const { chapter } = useChapterNav(chapterSlug)
const { isLessonComplete } = useLessonProgress()
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
            : isLessonComplete(chapterSlug, lesson.slug)
              ? 'bg-primary/20 text-primary'
              : 'bg-elevated text-muted'"
        >
          <UIcon
            v-if="isLessonComplete(chapterSlug, lesson.slug) && !route.path.endsWith(lesson.slug)"
            name="i-lucide-check"
            class="size-3"
          />
          <span v-else>{{ index + 1 }}</span>
        </span>
        <span>{{ lesson.title }}</span>
      </NuxtLink>

      <NuxtLink
        :to="`/learn/${chapterSlug}/quiz`"
        class="flex items-start gap-3 rounded-lg px-3 py-2 text-sm transition-colors mt-2 border-t border-default pt-3"
        :class="route.path.endsWith('quiz')
          ? 'bg-primary/10 text-primary font-medium'
          : 'text-muted hover:bg-elevated hover:text-default'"
      >
        <UIcon
          name="i-lucide-clipboard-check"
          class="mt-0.5 size-5 shrink-0"
        />
        <span>Chapter quiz</span>
      </NuxtLink>
    </nav>
  </aside>

  <div class="lg:hidden mb-6 space-y-3">
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
      <UButton
        :to="`/learn/${chapterSlug}/quiz`"
        label="Quiz"
        size="xs"
        icon="i-lucide-clipboard-check"
        :color="route.path.endsWith('quiz') ? 'primary' : 'neutral'"
        :variant="route.path.endsWith('quiz') ? 'solid' : 'outline'"
        class="shrink-0"
      />
    </nav>
  </div>
</template>
