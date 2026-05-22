<script setup lang="ts">
definePageMeta({ layout: 'learn' })

const chapterSlug = 'qubits'
const lessonSlug = 'measurement'

const { chapter, lesson, lessonIndex, prevPath } = useChapterNav(chapterSlug, lessonSlug)

useSeoMeta({
  title: `${lesson.value?.title ?? 'Measurement'} — Quantumania`,
  description: lesson.value?.description
})
</script>

<template>
  <div>
    <LearnLessonHeader
      :title="lesson?.title ?? 'Measurement'"
      :description="lesson?.description ?? ''"
      :lesson-number="lessonIndex + 1"
      :total-lessons="chapter?.lessons.length"
    />

    <div class="max-w-3xl mb-8 space-y-4 text-muted [&_strong]:text-default [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:space-y-1">
      <p>
        Measurement is the moment quantum uncertainty becomes a classical answer. When you measure
        a qubit in the computational basis, you always get 0 or 1 — never a fraction.
      </p>
      <p>
        For |+⟩, each individual measurement is random, but over many repetitions the counts
        approach 50/50. That is the signature of superposition: random single outcomes,
        predictable statistics.
      </p>
      <p>
        Prepare |+⟩ and click <strong>Measure</strong> repeatedly. The histogram fills in,
        and the Bloch view shows where the state lives on the sphere before collapse.
      </p>
    </div>

    <QuantumMeasurementDemo />

    <LearnLessonNav
      :prev-path="prevPath"
      prev-label="Previous: Superposition"
    />
  </div>
</template>
