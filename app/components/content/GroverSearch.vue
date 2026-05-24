<script setup lang="ts">
import type { BasisState } from '~/utils/twoQubit'
import { basisLabel, getTwoQubitProbabilities } from '~/utils/twoQubit'
import { groverStateAfterIterations } from '~/utils/algorithms'

const marked = ref<BasisState>('11')
const iterations = ref(0)

const options: BasisState[] = ['00', '01', '10', '11']

const state = computed(() => groverStateAfterIterations(marked.value, iterations.value))
const probabilities = computed(() => getTwoQubitProbabilities(state.value))

const maxIterations = 2

function runIteration() {
  if (iterations.value < maxIterations) {
    iterations.value += 1
  }
}

function reset() {
  iterations.value = 0
}

watch(marked, () => {
  iterations.value = 0
})

const barHeight = (value: number) => `${Math.max(value * 100, 4)}%`
</script>

<template>
  <div class="not-prose my-8 space-y-6">
    <UCard>
      <div class="space-y-4">
        <UAlert
          icon="i-lucide-box"
          color="neutral"
          variant="subtle"
          title="What is an oracle?"
        >
          <template #description>
            <p class="text-sm">
              An <strong>oracle</strong> is a black-box gate that encodes problem information into
              the quantum state — without revealing the full answer upfront. In Grover's search, the
              oracle flips the <em>phase</em> of the marked item (multiplies its amplitude by −1).
              That sign change has no effect on measurement probabilities by itself, but it sets up
              <NuxtLink
                to="/learn/qubits/superposition"
                class="text-primary underline underline-offset-2"
              >interference</NuxtLink>
              when combined with the diffuser. You saw a different kind of oracle in
              <NuxtLink
                to="/learn/algorithms/deutsch-jozsa"
                class="text-primary underline underline-offset-2"
              >Deutsch–Jozsa</NuxtLink>, where it encodes a function <span class="font-mono">f(x)</span>.
            </p>
          </template>
        </UAlert>

        <p class="text-sm text-muted">
          Four items, one marked. Grover's algorithm alternates the oracle with a
          <strong>diffuser</strong> (reflect amplitudes about their average). One iteration is
          often enough for this tiny search space.
        </p>

        <div>
          <p class="text-xs text-muted mb-2">
            Marked item
          </p>
          <div class="flex flex-wrap gap-2">
            <UButton
              v-for="option in options"
              :key="option"
              :label="basisLabel(option)"
              size="sm"
              :color="marked === option ? 'primary' : 'neutral'"
              :variant="marked === option ? 'solid' : 'outline'"
              @click="marked = option"
            />
          </div>
        </div>

        <div class="flex flex-wrap gap-3">
          <UButton
            icon="i-lucide-play"
            :disabled="iterations >= maxIterations"
            @click="runIteration"
          >
            Run Grover iteration ({{ iterations }}/{{ maxIterations }})
          </UButton>

          <UButton
            color="neutral"
            variant="outline"
            icon="i-lucide-rotate-ccw"
            @click="reset"
          >
            Reset
          </UButton>
        </div>

        <p class="text-xs text-muted">
          Start: equal 25% on each state. After each iteration, watch the marked amplitude grow.
        </p>
      </div>
    </UCard>

    <UCard>
      <template #header>
        <h3 class="font-semibold">
          Amplitude probabilities
        </h3>
      </template>

      <div class="grid grid-cols-4 gap-3">
        <div
          v-for="option in options"
          :key="option"
          class="flex flex-col items-center gap-1"
        >
          <div class="flex h-36 w-full items-end justify-center rounded-lg bg-default/50 px-2">
            <div
              class="w-full rounded-t transition-all duration-500"
              :class="option === marked
                ? 'bg-[var(--color-superposition)]'
                : 'bg-[var(--color-qubit-zero)]'"
              :style="{ height: barHeight(probabilities[option]) }"
            />
          </div>
          <span
            class="font-mono text-xs"
            :class="option === marked ? 'text-primary font-semibold' : ''"
          >
            {{ basisLabel(option) }}
          </span>
          <span class="text-xs text-muted">{{ Math.round(probabilities[option] * 100) }}%</span>
        </div>
      </div>

      <UAlert
        v-if="iterations > 0 && probabilities[marked] > 0.9"
        class="mt-4"
        icon="i-lucide-target"
        color="primary"
        variant="subtle"
        title="Marked state amplified"
        :description="`${basisLabel(marked)} now has ${Math.round(probabilities[marked] * 100)}% probability — ready to measure with high confidence.`"
      />
    </UCard>
  </div>
</template>
