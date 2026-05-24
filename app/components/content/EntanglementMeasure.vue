<script setup lang="ts">
import type { BasisState } from '~/utils/twoQubit'
import {
  basisLabel,
  createBellPhiPlus,
  createProductPlusZero,
  getTwoQubitProbabilities,
  measureTwoQubits,
  twoQubitStateLabel
} from '~/utils/twoQubit'

type StateMode = 'bell' | 'product'

const mode = ref<StateMode>('bell')
const counts = ref<Record<BasisState, number>>({ '00': 0, '01': 0, '10': 0, '11': 0 })
const lastOutcome = ref<BasisState | null>(null)

const modes: { label: string, value: StateMode, hint: string }[] = [
  {
    label: 'Bell |Φ+⟩',
    value: 'bell',
    hint: 'Entangled — only |00⟩ and |11⟩ appear'
  },
  {
    label: 'Product |+⟩|0⟩',
    value: 'product',
    hint: 'Not entangled — only |00⟩ and |10⟩ appear'
  }
]

const state = computed(() =>
  mode.value === 'bell' ? createBellPhiPlus() : createProductPlusZero()
)

const probabilities = computed(() => getTwoQubitProbabilities(state.value))
const totalShots = computed(() =>
  Object.values(counts.value).reduce((sum, count) => sum + count, 0)
)

const basisStates: BasisState[] = ['00', '01', '10', '11']

function runMeasurement() {
  const outcome = measureTwoQubits(state.value)
  lastOutcome.value = outcome.basis
  counts.value[outcome.basis] += 1
}

function resetStats() {
  counts.value = { '00': 0, '01': 0, '10': 0, '11': 0 }
  lastOutcome.value = null
}

watch(mode, () => {
  resetStats()
})

const barHeight = (count: number) =>
  totalShots.value ? `${Math.max((count / totalShots.value) * 100, 4)}%` : '4%'
</script>

<template>
  <div class="not-prose my-8 space-y-6">
    <UCard>
      <div class="space-y-4">
        <p class="text-sm text-muted">
          Measure both qubits many times. Entangled states show correlations that product states do not.
        </p>

        <div class="flex flex-wrap gap-2">
          <UButton
            v-for="item in modes"
            :key="item.value"
            :label="item.label"
            size="sm"
            :color="mode === item.value ? 'primary' : 'neutral'"
            :variant="mode === item.value ? 'solid' : 'outline'"
            @click="mode = item.value"
          />
        </div>

        <p class="text-sm font-mono text-primary">
          {{ modes.find(item => item.value === mode)?.hint }}
        </p>

        <p class="text-sm text-muted">
          Current state: <span class="font-mono text-default">{{ twoQubitStateLabel(state) }}</span>
        </p>

        <div class="flex flex-wrap gap-3">
          <UButton
            icon="i-lucide-scan-line"
            @click="runMeasurement"
          >
            Measure both qubits
          </UButton>

          <UButton
            color="neutral"
            variant="outline"
            icon="i-lucide-rotate-ccw"
            @click="resetStats"
          >
            Reset stats
          </UButton>
        </div>

        <Transition
          enter-active-class="transition duration-300"
          enter-from-class="opacity-0 translate-y-1"
          enter-to-class="opacity-100 translate-y-0"
        >
          <UAlert
            v-if="lastOutcome"
            :key="lastOutcome"
            color="primary"
            variant="subtle"
            :title="`Outcome: ${basisLabel(lastOutcome)}`"
            description="Each shot gives one of four joint outcomes for the pair of qubits."
          />
        </Transition>
      </div>
    </UCard>

    <UCard>
      <template #header>
        <h3 class="font-semibold">
          Joint measurement histogram
        </h3>
      </template>

      <p class="mb-4 text-xs text-muted">
        Expected:
        <span
          v-for="basis in basisStates"
          :key="basis"
        >
          {{ basisLabel(basis) }} {{ Math.round(probabilities[basis] * 100) }}%<span v-if="basis !== '11'"> · </span>
        </span>
        <span v-if="totalShots > 0"> · {{ totalShots }} shots</span>
      </p>

      <div class="grid grid-cols-4 gap-3">
        <div
          v-for="basis in basisStates"
          :key="basis"
          class="flex flex-col items-center gap-1"
        >
          <div class="flex h-32 w-full items-end justify-center rounded-lg bg-elevated px-2">
            <div
              class="w-full rounded-t transition-all duration-300"
              :class="probabilities[basis] > 0.001
                ? 'bg-[var(--color-superposition)]'
                : 'bg-[var(--ui-border)]'"
              :style="{ height: barHeight(counts[basis]) }"
            />
          </div>
          <span class="font-mono text-xs">{{ basisLabel(basis) }}</span>
          <span class="text-xs text-muted">{{ counts[basis] }}</span>
        </div>
      </div>
    </UCard>

    <UAlert
      icon="i-lucide-lightbulb"
      color="neutral"
      variant="subtle"
      title="Spot the difference"
      description="Bell |Φ+⟩ never produces |01⟩ or |10⟩ — q0 and q1 always match. Product |+⟩|0⟩ never produces |01⟩ or |11⟩ — q1 is always 0. Same single-qubit statistics can hide very different correlations."
    />
  </div>
</template>
