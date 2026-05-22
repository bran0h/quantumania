<script setup lang="ts">
definePageMeta({ layout: 'learn' })

const chapterSlug = 'entanglement'
const lessonSlug = 'two-qubits'

const { chapter, lesson, lessonIndex, prevPath, nextPath } = useChapterNav(chapterSlug, lessonSlug)

useSeoMeta({
  title: `${lesson.value?.title ?? 'Two Qubits'} — Quantumania`,
  description: lesson.value?.description
})
</script>

<template>
  <div>
    <LearnLessonHeader
      :title="lesson?.title ?? 'Two Qubits'"
      :description="lesson?.description ?? ''"
      :lesson-number="lessonIndex + 1"
      :total-lessons="chapter?.lessons.length"
    />

    <div class="max-w-3xl mb-8 space-y-4 text-muted [&_strong]:text-default [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:space-y-1">
      <p>
        Two qubits together need four amplitudes — one for each combination of 0 and 1.
        States like |01⟩ mean "q0 is 0 and q1 is 1" — both values are definite.
      </p>
      <p>
        These are called <strong>product states</strong>: each qubit can still be described
        independently. Entanglement breaks that independence.
      </p>
      <p>
        Select each basis state below and notice how only one of the four outcomes has 100%
        probability.
      </p>
    </div>

    <QuantumTwoQubitsIntroDemo />

    <LearnLessonNav
      :prev-path="prevPath"
      :next-path="nextPath"
      prev-label="Chapter overview"
      next-label="Next: Bell State"
    />
  </div>
</template>
