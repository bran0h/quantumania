<script setup lang="ts">
import { chapterPath, chapters } from '~/data/chapters'

const { chapterStats, isLessonComplete } = useLessonProgress()

useSeoMeta({
  title: 'Learn — Quantumania',
  description: 'Browse quantum computing chapters and interactive lessons.'
})
</script>

<template>
  <UContainer class="max-w-4xl py-12 sm:py-14 lg:py-16">
    <header class="mb-10 space-y-3">
      <h1 class="text-3xl font-bold tracking-tight sm:text-4xl">
        Learn quantum computing
      </h1>
      <p class="text-lg text-muted max-w-2xl">
        Work through chapters at your own pace. Each lesson includes an interactive experiment and a short chapter quiz.
      </p>
    </header>

    <div class="grid gap-4">
      <UCard
        v-for="chapter in chapters"
        :key="chapter.slug"
        :ui="{ body: 'space-y-4' }"
      >
        <div class="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div class="space-y-3 flex-1">
            <div class="flex flex-wrap items-center gap-2">
              <h2 class="text-xl font-semibold">
                {{ chapter.title }}
              </h2>
              <UBadge
                v-if="!chapter.available"
                color="neutral"
                variant="subtle"
                label="Coming soon"
              />
              <UBadge
                v-else-if="chapterStats(chapter.slug, chapter.lessons.map(l => l.slug)).isComplete"
                color="primary"
                variant="subtle"
                label="Complete"
                icon="i-lucide-check"
              />
              <UBadge
                v-else
                color="neutral"
                variant="subtle"
                :label="`${chapterStats(chapter.slug, chapter.lessons.map(l => l.slug)).completed}/${chapter.lessons.length} lessons`"
              />
            </div>

            <p class="text-sm text-muted max-w-xl">
              {{ chapter.description }}
            </p>

            <div
              v-if="chapter.available"
              class="space-y-2"
            >
              <div class="flex items-center justify-between text-xs text-muted">
                <span>Progress</span>
                <span>
                  {{ chapterStats(chapter.slug, chapter.lessons.map(l => l.slug)).completed }}
                  / {{ chapter.lessons.length }} lessons
                  <span v-if="chapterStats(chapter.slug, chapter.lessons.map(l => l.slug)).quizPassed"> · quiz passed</span>
                </span>
              </div>
              <UProgress
                :model-value="chapterStats(chapter.slug, chapter.lessons.map(l => l.slug)).completed"
                :max="chapter.lessons.length"
                size="sm"
              />
            </div>
          </div>

          <UButton
            v-if="chapter.available"
            :to="chapterPath(chapter.slug)"
            label="Open chapter"
            trailing-icon="i-lucide-arrow-right"
            class="shrink-0"
          />
        </div>
      </UCard>
    </div>
  </UContainer>
</template>
