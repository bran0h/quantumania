<script setup lang="ts">
import { chapterPath, chapters } from '~/data/chapters'

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
        Work through chapters at your own pace. Each lesson includes an interactive experiment.
      </p>
    </header>

    <div class="grid gap-4">
      <UCard
        v-for="chapter in chapters"
        :key="chapter.slug"
        :ui="{ body: 'space-y-4' }"
      >
        <div class="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div class="space-y-2">
            <div class="flex items-center gap-2">
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
                v-else
                color="primary"
                variant="subtle"
                :label="`${chapter.lessons.length} lessons`"
              />
            </div>
            <p class="text-sm text-muted max-w-xl">
              {{ chapter.description }}
            </p>
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
