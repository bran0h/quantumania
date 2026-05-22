<script setup lang="ts">
definePageMeta({ layout: 'learn' })

const chapterSlug = 'gates'
const lessonSlug = 'what-are-gates'

const { chapter, lesson, lessonIndex, prevPath, nextPath } = useChapterNav(chapterSlug, lessonSlug)

useSeoMeta({
  title: `${lesson.value?.title ?? 'What Are Gates?'} — Quantumania`,
  description: lesson.value?.description
})
</script>

<template>
  <div>
    <LearnLessonHeader
      :title="lesson?.title ?? 'What Are Gates?'"
      :description="lesson?.description ?? ''"
      :lesson-number="lessonIndex + 1"
      :total-lessons="chapter?.lessons.length"
    />

    <div class="max-w-3xl mb-8 space-y-4 text-muted [&_strong]:text-default [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:space-y-1">
      <p>
        A <strong>quantum gate</strong> is an operation that changes a qubit's state — like rotating
        a vector on the Bloch sphere. Gates appear as labeled boxes on a horizontal wire in a
        <strong>circuit diagram</strong>.
      </p>
      <p>
        Circuits read left to right: start with |0⟩, apply gates in sequence, then measure.
        Each gate's output becomes the next gate's input.
      </p>
      <p>
        Step through the demo below to see how a circuit is structured and preview the gates
        you'll use in the next lessons.
      </p>
    </div>

    <QuantumGatesIntroDemo />

    <LearnLessonNav
      :prev-path="prevPath"
      :next-path="nextPath"
      prev-label="Chapter overview"
      next-label="Next: Pauli Gates"
    />
  </div>
</template>
