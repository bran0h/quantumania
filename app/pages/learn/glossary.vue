<script setup lang="ts">
import { glossaryChapters, glossaryTerms } from '~/data/glossary'

useSeoMeta({
  title: 'Glossary — Quantumania',
  description: 'Quick definitions of quantum computing terms used across Quantumania lessons.'
})

const groupedTerms = computed(() =>
  glossaryChapters.map(chapter => ({
    chapter,
    terms: glossaryTerms.filter(term => term.chapter === chapter)
  }))
)
</script>

<template>
  <UContainer class="max-w-3xl py-12 sm:py-14 lg:py-16">
    <header class="mb-10 space-y-3">
      <UButton
        to="/learn"
        label="Back to chapters"
        icon="i-lucide-arrow-left"
        color="neutral"
        variant="ghost"
        size="sm"
        class="-ml-2"
      />

      <h1 class="text-3xl font-bold tracking-tight sm:text-4xl">
        Glossary
      </h1>
      <p class="text-lg text-muted max-w-2xl">
        Key terms from all four chapters, with links back to the lessons where each concept is explained.
      </p>
    </header>

    <div class="space-y-10">
      <section
        v-for="group in groupedTerms"
        :key="group.chapter"
        class="space-y-4"
      >
        <h2 class="text-lg font-semibold">
          {{ group.chapter }}
        </h2>

        <dl class="divide-y divide-default rounded-xl border border-default">
          <div
            v-for="item in group.terms"
            :key="item.term"
            class="px-4 py-4 sm:px-5"
          >
            <dt class="font-semibold">
              <NuxtLink
                :to="item.href"
                class="text-primary hover:underline underline-offset-2"
              >
                {{ item.term }}
              </NuxtLink>
            </dt>
            <dd class="mt-1 text-sm text-muted">
              {{ item.definition }}
            </dd>
          </div>
        </dl>
      </section>
    </div>
  </UContainer>
</template>
