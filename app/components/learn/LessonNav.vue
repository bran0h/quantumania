<script setup lang="ts">
const props = defineProps<{
  chapterSlug: string
  lessonSlug: string
  prevPath: string
  nextPath?: string
  nextLabel?: string
  prevLabel?: string
}>()

const { markLessonComplete, isLessonComplete } = useLessonProgress()

const completed = computed(() => isLessonComplete(props.chapterSlug, props.lessonSlug))

onMounted(() => {
  markLessonComplete(props.chapterSlug, props.lessonSlug)
})
</script>

<template>
  <nav class="mt-10 space-y-4 border-t border-default pt-8">
    <div
      v-if="completed"
      class="flex items-center gap-2 text-sm text-primary"
    >
      <UIcon
        name="i-lucide-check-circle"
        class="size-4"
      />
      <span>Lesson marked complete</span>
    </div>

    <div class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <UButton
        :to="prevPath"
        icon="i-lucide-arrow-left"
        color="neutral"
        variant="outline"
      >
        {{ prevLabel ?? 'Previous' }}
      </UButton>

      <UButton
        v-if="nextPath"
        :to="nextPath"
        trailing-icon="i-lucide-arrow-right"
      >
        {{ nextLabel ?? 'Next lesson' }}
      </UButton>
    </div>
  </nav>
</template>
