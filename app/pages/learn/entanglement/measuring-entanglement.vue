<script setup lang="ts">
definePageMeta({ layout: 'learn' })

const chapterSlug = 'entanglement'
const lessonSlug = 'measuring-entanglement'

const { chapter, lesson, lessonIndex, prevPath } = useChapterNav(chapterSlug, lessonSlug)

useSeoMeta({
  title: `${lesson.value?.title ?? 'Measuring Entanglement'} — Quantumania`,
  description: lesson.value?.description
})
</script>

<template>
  <div>
    <LearnLessonHeader
      :title="lesson?.title ?? 'Measuring Entanglement'"
      :description="lesson?.description ?? ''"
      :lesson-number="lessonIndex + 1"
      :total-lessons="chapter?.lessons.length"
    />

    <div class="max-w-3xl mb-8 space-y-4 text-muted [&_strong]:text-default [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:space-y-1">
      <p>
        Entanglement shows up in <strong>joint measurements</strong>. For the Bell state,
        q0 and q1 are individually random (50/50) but always agree — you never see |01⟩ or |10⟩.
      </p>
      <p>
        Compare that to the product state |+⟩|0⟩: q0 is random but q1 is always 0.
        Same marginals, different correlations.
      </p>
      <p>
        Measure both qubits repeatedly in each mode and watch which outcomes appear in the histogram.
      </p>
    </div>

    <QuantumEntanglementMeasureDemo />

    <LearnLessonNav
      :prev-path="prevPath"
      prev-label="Previous: Bell State"
    />
  </div>
</template>
