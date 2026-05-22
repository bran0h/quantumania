<script setup lang="ts">
definePageMeta({ layout: 'learn' })

const chapterSlug = 'qubits'
const lessonSlug = 'bit-vs-qubit'

const { chapter, lesson, lessonIndex, prevPath, nextPath } = useChapterNav(chapterSlug, lessonSlug)

useSeoMeta({
  title: `${lesson.value?.title ?? 'Bit vs Qubit'} — Quantumania`,
  description: lesson.value?.description
})
</script>

<template>
  <div>
    <LearnLessonHeader
      :title="lesson?.title ?? 'Bit vs Qubit'"
      :description="lesson?.description ?? ''"
      :lesson-number="lessonIndex + 1"
      :total-lessons="chapter?.lessons.length"
    />

    <div class="max-w-3xl mb-8 space-y-4 text-muted [&_strong]:text-default [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:space-y-1">
      <p>
        A classical computer stores information in <strong>bits</strong>. Each bit is unambiguous:
        it is either 0 or 1, like a light switch that is off or on.
      </p>
      <p>
        A <strong>qubit</strong> can also be prepared in |0⟩ or |1⟩, but it can also exist in
        combinations such as |+⟩, where neither outcome is definite until you measure it.
      </p>
      <p>
        Try the panel below: flip the classical bit and switch the qubit between |0⟩, |1⟩, and |+⟩.
        Notice how the classical bit is always exactly one value, while the qubit can represent
        something richer.
      </p>
    </div>

    <QuantumBitVsQubit />

    <LearnLessonNav
      :prev-path="prevPath"
      :next-path="nextPath"
      prev-label="Chapter overview"
      next-label="Next: Superposition"
    />
  </div>
</template>
