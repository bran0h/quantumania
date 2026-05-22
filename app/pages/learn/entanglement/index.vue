<script setup lang="ts">
definePageMeta({ layout: 'learn' })

const chapterSlug = 'entanglement'
const { chapter } = useChapterNav(chapterSlug)

useSeoMeta({
  title: `${chapter.value?.title ?? 'Entanglement'} — Quantumania`,
  description: chapter.value?.description
})
</script>

<template>
  <div>
    <LearnLessonHeader
      :title="chapter?.title ?? 'Entanglement'"
      :description="chapter?.description ?? ''"
    />

    <div class="max-w-3xl mb-8 space-y-4 text-muted [&_strong]:text-default [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:space-y-1">
      <p>
        So far each qubit lived on its own. With two qubits, the combined system has
        <strong>four basis states</strong>: |00⟩, |01⟩, |10⟩, and |11⟩.
      </p>
      <p>
        <strong>Entanglement</strong> is when the joint state cannot be split into separate
        descriptions for each qubit. Measuring one instantly tells you about the other —
        a correlation with no classical equivalent.
      </p>
      <p>
        In this chapter you will:
      </p>
      <ul>
        <li>Explore the four two-qubit basis states</li>
        <li>Build the Bell state |Φ+⟩ with H and CNOT</li>
        <li>See how entangled measurements differ from product states</li>
      </ul>
    </div>

    <UButton
      to="/learn/entanglement/two-qubits"
      label="Start Lesson 1: Two Qubits"
      trailing-icon="i-lucide-arrow-right"
      size="lg"
    />
  </div>
</template>
