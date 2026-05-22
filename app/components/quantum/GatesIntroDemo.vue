<script setup lang="ts">
import type { GateName } from '~/utils/gates'
import { GATES } from '~/utils/gates'
import { applyGates } from '~/utils/gates'
import { getPresetState, getProbabilities, stateLabel } from '~/utils/qubit'

const steps = [
  {
    title: 'Prepare |0⟩',
    description: 'Every circuit starts by initializing a qubit to |0⟩.',
    gates: [] as GateName[],
    highlight: -1
  },
  {
    title: 'Apply a gate',
    description: 'Gates are boxes on the wire. Each one transforms the qubit state.',
    gates: ['H'] as GateName[],
    highlight: 0
  },
  {
    title: 'Build a short circuit',
    description: 'Gates compose left to right — the output of one becomes the input of the next.',
    gates: ['H', 'X'] as GateName[],
    highlight: 1
  },
  {
    title: 'Measure',
    description: 'Measurement at the end (M) extracts a classical 0 or 1 from the final state.',
    gates: ['H'] as GateName[],
    highlight: -1
  }
]

const stepIndex = ref(0)

const currentStep = computed(() => steps[stepIndex.value]!)
const outputState = computed(() => applyGates(getPresetState('zero'), currentStep.value.gates))
const probabilities = computed(() => getProbabilities(outputState.value))

function nextStep() {
  stepIndex.value = (stepIndex.value + 1) % steps.length
}

function prevStep() {
  stepIndex.value = (stepIndex.value - 1 + steps.length) % steps.length
}
</script>

<template>
  <UCard>
    <div class="space-y-6">
      <div class="flex items-center justify-between gap-4">
        <div>
          <p class="text-sm font-semibold">
            Step {{ stepIndex + 1 }} of {{ steps.length }}: {{ currentStep.title }}
          </p>
          <p class="text-sm text-muted mt-1">
            {{ currentStep.description }}
          </p>
        </div>

        <div class="flex gap-2 shrink-0">
          <UButton
            icon="i-lucide-chevron-left"
            color="neutral"
            variant="outline"
            size="sm"
            aria-label="Previous step"
            @click="prevStep"
          />
          <UButton
            icon="i-lucide-chevron-right"
            color="neutral"
            variant="outline"
            size="sm"
            aria-label="Next step"
            @click="nextStep"
          />
        </div>
      </div>

      <QuantumCircuitDiagram
        :gates="currentStep.gates"
        :active-index="currentStep.highlight"
      />

      <div
        v-if="currentStep.gates.length"
        class="grid gap-4 sm:grid-cols-2 rounded-xl border border-default bg-elevated/50 p-4"
      >
        <div>
          <p class="text-xs text-muted mb-1">
            Output state
          </p>
          <p class="font-mono text-lg font-semibold">
            {{ stateLabel(outputState) }}
          </p>
        </div>
        <div>
          <p class="text-xs text-muted mb-1">
            Measurement probabilities
          </p>
          <p class="text-sm">
            P(0) = {{ Math.round(probabilities.zero * 100) }}% ·
            P(1) = {{ Math.round(probabilities.one * 100) }}%
          </p>
        </div>
      </div>

      <div class="grid gap-3 sm:grid-cols-3">
        <div
          v-for="gate in (['X', 'Z', 'H'] as GateName[])"
          :key="gate"
          class="rounded-lg border border-default p-3 text-sm"
        >
          <p class="font-mono font-bold text-primary">
            {{ gate }}
          </p>
          <p class="text-muted mt-1">
            {{ GATES[gate].description }}
          </p>
        </div>
      </div>
    </div>
  </UCard>
</template>
