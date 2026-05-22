<script setup lang="ts">
definePageMeta({ layout: 'learn' })

const chapterSlug = 'qubits'
const { chapter } = useChapterNav(chapterSlug)

useSeoMeta({
  title: `${chapter.value?.title ?? 'Qubits'} — Quantumania`,
  description: chapter.value?.description
})
</script>

<template>
  <div>
    <LearnLessonHeader
      :title="chapter?.title ?? 'Qubits & Superposition'"
      :description="chapter?.description ?? ''"
    />

    <div class="max-w-3xl mb-8 space-y-4 text-muted [&_strong]:text-default [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:space-y-1">
      <p>
        Welcome to your first chapter. A <strong>qubit</strong> is the basic unit of quantum information —
        the quantum version of a classical bit. But unlike a bit that must be 0 or 1, a qubit can do
        something strange and powerful called <strong>superposition</strong>.
      </p>
      <p>
        In this chapter you will:
      </p>
      <ul>
        <li>Compare classical bits with qubits side by side</li>
        <li>See what superposition looks like as probabilities</li>
        <li>Measure a qubit and watch random outcomes build a histogram</li>
      </ul>
    </div>

    <UButton
      to="/learn/qubits/bit-vs-qubit"
      label="Start Lesson 1: Bit vs Qubit"
      trailing-icon="i-lucide-arrow-right"
      size="lg"
    />
  </div>
</template>
