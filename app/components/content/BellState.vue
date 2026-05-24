<script setup lang="ts">
import TwoQubitCircuitDiagram from './TwoQubitCircuitDiagram.vue'
import type { TwoQubitCircuitStep } from '~/utils/twoQubit'
import {
  applyCNOT,
  applyHOnQubit,
  getBasisState,
  getTwoQubitProbabilities,
  twoQubitStateLabel
} from '~/utils/twoQubit'

const steps: { key: TwoQubitCircuitStep, title: string, description: string }[] = [
  {
    key: 'init',
    title: 'Start in |00⟩',
    description: 'Both qubits begin in |0⟩. The combined state is |00⟩.'
  },
  {
    key: 'hadamard',
    title: 'Apply H to q0',
    description: 'Hadamard puts q0 into superposition while q1 stays |0⟩. The state becomes |+⟩|0⟩ — still a product state.'
  },
  {
    key: 'cnot',
    title: 'Apply CNOT',
    description: 'CNOT flips q1 when q0 is |1⟩. Superposition on q0 spreads to q1 — now neither qubit has its own definite value alone.'
  }
]

const stepIndex = ref(0)

const currentStep = computed(() => steps[stepIndex.value]!)

const state = computed(() => {
  let current = getBasisState('00')

  if (stepIndex.value >= 1) {
    current = applyHOnQubit(current, 0)
  }

  if (stepIndex.value >= 2) {
    current = applyCNOT(current, 0, 1)
  }

  return current
})

const probabilities = computed(() => getTwoQubitProbabilities(state.value))

function nextStep() {
  stepIndex.value = Math.min(stepIndex.value + 1, steps.length - 1)
}

function prevStep() {
  stepIndex.value = Math.max(stepIndex.value - 1, 0)
}
</script>

<template>
  <div class="not-prose my-8 space-y-6">
    <UCard>
      <div class="space-y-4">
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
              :disabled="stepIndex === 0"
              aria-label="Previous step"
              @click="prevStep"
            />
            <UButton
              icon="i-lucide-chevron-right"
              color="neutral"
              variant="outline"
              size="sm"
              :disabled="stepIndex === steps.length - 1"
              aria-label="Next step"
              @click="nextStep"
            />
          </div>
        </div>

        <TwoQubitCircuitDiagram :step="currentStep.key" />
      </div>
    </UCard>

    <div class="grid gap-4 sm:grid-cols-2 rounded-xl border border-default bg-elevated/50 p-4">
      <div>
        <p class="text-xs text-muted mb-1">
          State
        </p>
        <p class="font-mono text-sm sm:text-base font-semibold">
          {{ twoQubitStateLabel(state) }}
        </p>
      </div>
      <div>
        <p class="text-xs text-muted mb-1">
          Probabilities
        </p>
        <p class="text-sm">
          |00⟩ {{ Math.round(probabilities['00'] * 100) }}% ·
          |01⟩ {{ Math.round(probabilities['01'] * 100) }}% ·
          |10⟩ {{ Math.round(probabilities['10'] * 100) }}% ·
          |11⟩ {{ Math.round(probabilities['11'] * 100) }}%
        </p>
      </div>
    </div>

    <UAlert
      v-if="stepIndex === 2"
      icon="i-lucide-link"
      color="primary"
      variant="subtle"
      title="Bell state |Φ+⟩"
      description="Only |00⟩ and |11⟩ have nonzero probability — and you cannot describe q0 or q1 separately. That correlation is entanglement."
    />
  </div>
</template>
