<script setup lang="ts">
import type { QubitPreset } from '~/utils/qubit'
import { ketFormula, ketLabel } from '~/utils/qubit'

const classicalBit = ref<0 | 1>(0)
const qubitPreset = ref<QubitPreset>('zero')

const qubitOptions: { label: string, value: QubitPreset }[] = [
  { label: '|0⟩', value: 'zero' },
  { label: '|1⟩', value: 'one' },
  { label: '|+⟩', value: 'plus' }
]
</script>

<template>
  <div class="not-prose my-8 grid gap-6 md:grid-cols-2">
    <UCard>
      <template #header>
        <div class="flex items-center gap-2">
          <UIcon
            name="i-lucide-binary"
            class="size-5 text-muted"
          />
          <h3 class="font-semibold">
            Classical bit
          </h3>
        </div>
      </template>

      <p class="mb-4 text-sm text-muted">
        A classical bit is always exactly 0 or 1 — like a coin lying flat, showing heads or tails.
      </p>

      <div class="flex items-center justify-center gap-4 py-6">
        <button
          type="button"
          class="flex size-24 items-center justify-center rounded-2xl border-2 text-4xl font-bold transition-all"
          :class="classicalBit === 0
            ? 'border-[var(--color-qubit-zero)] bg-[var(--color-qubit-zero)]/15 text-[var(--color-qubit-zero)] scale-105'
            : 'border-default bg-elevated text-muted hover:border-[var(--color-qubit-zero)]'"
          @click="classicalBit = 0"
        >
          0
        </button>

        <button
          type="button"
          class="flex size-24 items-center justify-center rounded-2xl border-2 text-4xl font-bold transition-all"
          :class="classicalBit === 1
            ? 'border-[var(--color-qubit-one)] bg-[var(--color-qubit-one)]/15 text-[var(--color-qubit-one)] scale-105'
            : 'border-default bg-elevated text-muted hover:border-[var(--color-qubit-one)]'"
          @click="classicalBit = 1"
        >
          1
        </button>
      </div>

      <p class="text-center text-sm font-medium">
        Current value: <span class="font-mono">{{ classicalBit }}</span>
      </p>
    </UCard>

    <UCard>
      <template #header>
        <div class="flex items-center gap-2">
          <UIcon
            name="i-lucide-atom"
            class="size-5 text-primary"
          />
          <h3 class="font-semibold">
            Qubit
          </h3>
        </div>
      </template>

      <p class="mb-4 text-sm text-muted">
        A qubit can be prepared in basis states or in superposition — like a coin still spinning in the air.
      </p>

      <div class="mb-4 flex flex-wrap justify-center gap-2">
        <UButton
          v-for="option in qubitOptions"
          :key="option.value"
          :label="option.label"
          size="sm"
          :color="qubitPreset === option.value ? 'primary' : 'neutral'"
          :variant="qubitPreset === option.value ? 'solid' : 'outline'"
          @click="qubitPreset = option.value"
        />
      </div>

      <div class="relative flex items-center justify-center py-6">
        <Transition
          mode="out-in"
          enter-active-class="transition duration-300"
          enter-from-class="opacity-0 scale-90"
          enter-to-class="opacity-100 scale-100"
          leave-active-class="transition duration-200"
          leave-from-class="opacity-100 scale-100"
          leave-to-class="opacity-0 scale-90"
        >
          <div
            :key="qubitPreset"
            class="flex size-32 items-center justify-center rounded-full border-2 text-2xl font-bold"
            :class="qubitPreset === 'plus'
              ? 'border-[var(--color-superposition)] bg-[var(--color-superposition)]/15 text-[var(--color-superposition)] animate-pulse'
              : qubitPreset === 'zero'
                ? 'border-[var(--color-qubit-zero)] bg-[var(--color-qubit-zero)]/15 text-[var(--color-qubit-zero)]'
                : 'border-[var(--color-qubit-one)] bg-[var(--color-qubit-one)]/15 text-[var(--color-qubit-one)]'"
          >
            {{ ketLabel(qubitPreset) }}
          </div>
        </Transition>
      </div>

      <p class="text-center font-mono text-sm text-muted">
        {{ ketFormula(qubitPreset) }}
      </p>
    </UCard>
  </div>
</template>
