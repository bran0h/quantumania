<script setup lang="ts">
definePageMeta({ layout: 'learn' })

const chapterSlug = 'gates'
const lessonSlug = 'pauli-gates'

const { chapter, lesson, lessonIndex, prevPath, nextPath } = useChapterNav(chapterSlug, lessonSlug)

useSeoMeta({
  title: `${lesson.value?.title ?? 'Pauli Gates'} — Quantumania`,
  description: lesson.value?.description
})
</script>

<template>
  <div>
    <LearnLessonHeader
      :title="lesson?.title ?? 'Pauli Gates'"
      :description="lesson?.description ?? ''"
      :lesson-number="lessonIndex + 1"
      :total-lessons="chapter?.lessons.length"
    />

    <div class="max-w-3xl mb-8 space-y-4 text-muted [&_strong]:text-default [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:space-y-1">
      <p>
        The <strong>Pauli X</strong> gate is the quantum NOT gate: it swaps |0⟩ and |1⟩.
        Think of it as a bit flip on the Bloch sphere.
      </p>
      <p>
        The <strong>Pauli Z</strong> gate flips the phase of |1⟩ (|1⟩ → −|1⟩) without changing
        measurement probabilities in the standard basis. Phase is a hidden property that matters
        when gates are combined.
      </p>
      <p>
        Pick a starting state and gate below to compare before and after on the Bloch sphere.
      </p>
    </div>

    <QuantumPauliGatesDemo />

    <LearnLessonNav
      :prev-path="prevPath"
      :next-path="nextPath"
      prev-label="Previous: What Are Gates?"
      next-label="Next: Hadamard Gate"
    />
  </div>
</template>
