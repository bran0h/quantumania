<script setup lang="ts">
definePageMeta({ layout: 'learn' })

const chapterSlug = 'qubits'
const lessonSlug = 'superposition'

const { chapter, lesson, lessonIndex, prevPath, nextPath } = useChapterNav(chapterSlug, lessonSlug)

useSeoMeta({
  title: `${lesson.value?.title ?? 'Superposition'} — Quantumania`,
  description: lesson.value?.description
})
</script>

<template>
  <div>
    <LearnLessonHeader
      :title="lesson?.title ?? 'Superposition'"
      :description="lesson?.description ?? ''"
      :lesson-number="lessonIndex + 1"
      :total-lessons="chapter?.lessons.length"
    />

    <div class="max-w-3xl mb-8 space-y-4 text-muted [&_strong]:text-default [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:space-y-1">
      <p>
        <strong>Superposition</strong> means a qubit is in a weighted combination of |0⟩ and |1⟩
        at the same time. We describe this with amplitudes; when you measure, those amplitudes
        turn into probabilities.
      </p>
      <p>
        The state |+⟩ is an equal superposition: 50% chance of 0 and 50% chance of 1.
        States |0⟩ and |1⟩ are not superpositions — they are definite basis states.
      </p>
      <p>
        Switch between the three states below and watch the probability bars animate.
        This is the same information a quantum computer tracks before a measurement.
      </p>
    </div>

    <QuantumSuperpositionDemo />

    <LearnLessonNav
      :prev-path="prevPath"
      :next-path="nextPath"
      prev-label="Previous: Bit vs Qubit"
      next-label="Next: Measurement"
    />
  </div>
</template>
