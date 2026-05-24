<script setup lang="ts">
import type { BasisState, TwoQubitState } from '~/utils/twoQubit'
import { basisLabel, getTwoQubitProbabilities, twoQubitStateLabel } from '~/utils/twoQubit'

const props = defineProps<{
  state: TwoQubitState
  lastOutcome?: BasisState | null
  measurementCount?: number
}>()

const basisStates: BasisState[] = ['00', '01', '10', '11']
const probabilities = computed(() => getTwoQubitProbabilities(props.state))

const barHeight = (value: number) => `${Math.max(value * 100, 4)}%`
</script>

<template>
  <UCard>
    <template #header>
      <h3 class="font-semibold">
        Output state
      </h3>
    </template>

    <p class="font-mono text-sm sm:text-base font-semibold mb-4 break-words">
      {{ twoQubitStateLabel(state) }}
    </p>

    <div class="grid grid-cols-4 gap-2 mb-4">
      <div
        v-for="basis in basisStates"
        :key="basis"
        class="flex flex-col items-center gap-1"
      >
        <div class="flex h-28 w-full items-end justify-center rounded-lg bg-default/50 px-1">
          <div
            class="w-full rounded-t transition-all duration-500"
            :class="probabilities[basis] > 0.001
              ? 'bg-[var(--color-superposition)]'
              : 'bg-[var(--color-qubit-zero)]/30'"
            :style="{ height: barHeight(probabilities[basis]) }"
          />
        </div>
        <span class="font-mono text-xs">{{ basisLabel(basis) }}</span>
        <span class="text-xs text-muted">{{ Math.round(probabilities[basis] * 100) }}%</span>
      </div>
    </div>

    <UAlert
      v-if="lastOutcome"
      icon="i-lucide-scan-line"
      color="primary"
      variant="subtle"
      :title="`Shot ${measurementCount ?? 1}: ${basisLabel(lastOutcome)}`"
      description="Your circuit is unchanged — measure again to sample another outcome from the current state."
    />
  </UCard>
</template>
