<script setup lang="ts">
defineProps<{
  title: string
  description: string
  lessonNumber?: number
  totalLessons?: number
}>()
</script>

<template>
  <header class="mb-8 space-y-3 pt-1">
    <p
      v-if="lessonNumber && totalLessons"
      class="text-sm font-medium text-primary"
    >
      Lesson {{ lessonNumber }} of {{ totalLessons }}
    </p>

    <h1 class="text-3xl font-bold tracking-tight sm:text-4xl">
      {{ title }}
    </h1>

    <p class="text-lg text-muted max-w-3xl">
      {{ description }}
    </p>
  </header>
</template>
