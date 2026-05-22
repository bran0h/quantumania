<script setup lang="ts">
definePageMeta({ layout: 'learn' })

const chapterSlug = 'entanglement'
const lessonSlug = 'bell-state'

const { chapter, lesson, lessonIndex, prevPath, nextPath } = useChapterNav(chapterSlug, lessonSlug)

useSeoMeta({
  title: `${lesson.value?.title ?? 'Bell State'} — Quantumania`,
  description: lesson.value?.description
})
</script>

<template>
  <div>
    <LearnLessonHeader
      :title="lesson?.title ?? 'Bell State'"
      :description="lesson?.description ?? ''"
      :lesson-number="lessonIndex + 1"
      :total-lessons="chapter?.lessons.length"
    />

    <div class="max-w-3xl mb-8 space-y-4 text-muted [&_strong]:text-default [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:space-y-1">
      <p>
        The <strong>Bell state |Φ+⟩</strong> is the hello world of entanglement:
        (|00⟩ + |11⟩) / √2. It is created by putting q0 in superposition, then applying
        <strong>CNOT</strong> with q0 as control and q1 as target.
      </p>
      <p>
        CNOT means: flip the target qubit if the control qubit is |1⟩. When q0 is in
        superposition, that conditional flip entangles the pair.
      </p>
      <p>
        Step through the circuit below and watch how |01⟩ and |10⟩ probabilities drop to zero.
      </p>
    </div>

    <QuantumBellStateDemo />

    <LearnLessonNav
      :prev-path="prevPath"
      :next-path="nextPath"
      prev-label="Previous: Two Qubits"
      next-label="Next: Measuring Entanglement"
    />
  </div>
</template>
