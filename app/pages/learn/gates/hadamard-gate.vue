<script setup lang="ts">
definePageMeta({ layout: 'learn' })

const chapterSlug = 'gates'
const lessonSlug = 'hadamard-gate'

const { chapter, lesson, lessonIndex, prevPath } = useChapterNav(chapterSlug, lessonSlug)

useSeoMeta({
  title: `${lesson.value?.title ?? 'Hadamard Gate'} — Quantumania`,
  description: lesson.value?.description
})
</script>

<template>
  <div>
    <LearnLessonHeader
      :title="lesson?.title ?? 'Hadamard Gate'"
      :description="lesson?.description ?? ''"
      :lesson-number="lessonIndex + 1"
      :total-lessons="chapter?.lessons.length"
    />

    <div class="max-w-3xl mb-8 space-y-4 text-muted [&_strong]:text-default [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:space-y-1">
      <p>
        The <strong>Hadamard gate (H)</strong> is one of the most important gates in quantum
        computing. It turns definite states into superpositions:
      </p>
      <ul>
        <li>H|0⟩ = |+⟩ — equal mix of 0 and 1</li>
        <li>H|1⟩ = |−⟩ — equal mix with a negative phase on |1⟩</li>
      </ul>
      <p>
        This is how quantum algorithms create the interference patterns they need. Try both
        starting states below and watch the probabilities and Bloch vector update.
      </p>
    </div>

    <QuantumHadamardGateDemo />

    <LearnLessonNav
      :prev-path="prevPath"
      next-path="/learn/entanglement/two-qubits"
      prev-label="Previous: Pauli Gates"
      next-label="Next chapter: Two Qubits"
    />
  </div>
</template>
