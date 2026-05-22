<script setup lang="ts">
definePageMeta({ layout: 'learn' })

const chapterSlug = 'gates'
const { chapter } = useChapterNav(chapterSlug)

useSeoMeta({
  title: `${chapter.value?.title ?? 'Quantum Gates'} — Quantumania`,
  description: chapter.value?.description
})
</script>

<template>
  <div>
    <LearnLessonHeader
      :title="chapter?.title ?? 'Quantum Gates'"
      :description="chapter?.description ?? ''"
    />

    <div class="max-w-3xl mb-8 space-y-4 text-muted [&_strong]:text-default [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:space-y-1">
      <p>
        Classical computers use logic gates (AND, OR, NOT) to process bits. Quantum computers use
        <strong>quantum gates</strong> to transform qubit states before measurement.
      </p>
      <p>
        In this chapter you will:
      </p>
      <ul>
        <li>Read simple circuit diagrams with gates on a qubit wire</li>
        <li>Apply Pauli X and Z gates and see how they change states</li>
        <li>Use the Hadamard gate to create superposition</li>
      </ul>
    </div>

    <UButton
      to="/learn/gates/what-are-gates"
      label="Start Lesson 1: What Are Gates?"
      trailing-icon="i-lucide-arrow-right"
      size="lg"
    />
  </div>
</template>
