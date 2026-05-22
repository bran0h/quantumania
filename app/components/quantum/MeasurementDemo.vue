<script setup lang="ts">
import type { QubitPreset } from '~/utils/qubit'
import {
  getPresetState,
  getProbabilities,
  ketLabel,
  measure
} from '~/utils/qubit'

const preset = ref<QubitPreset>('plus')
const counts = ref({ zero: 0, one: 0 })
const lastOutcome = ref<0 | 1 | null>(null)
const totalShots = computed(() => counts.value.zero + counts.value.one)

const presets: { label: string, value: QubitPreset }[] = [
  { label: '|0⟩', value: 'zero' },
  { label: '|1⟩', value: 'one' },
  { label: '|+⟩', value: 'plus' }
]

const state = computed(() => getPresetState(preset.value))
const probabilities = computed(() => getProbabilities(state.value))

function runMeasurement() {
  const outcome = measure(state.value)
  lastOutcome.value = outcome

  if (outcome === 0) {
    counts.value.zero += 1
  } else {
    counts.value.one += 1
  }
}

function resetStats() {
  counts.value = { zero: 0, one: 0 }
  lastOutcome.value = null
}

watch(preset, () => {
  resetStats()
})
</script>

<template>
  <div class="space-y-6">
    <UCard>
      <div class="space-y-4">
        <p class="text-sm text-muted">
          Choose a prepared state, then measure it many times. Watch the histogram converge toward the predicted probabilities.
        </p>

        <div class="flex flex-wrap gap-2">
          <UButton
            v-for="item in presets"
            :key="item.value"
            :label="item.label"
            size="sm"
            :color="preset === item.value ? 'primary' : 'neutral'"
            :variant="preset === item.value ? 'solid' : 'outline'"
            @click="preset = item.value"
          />
        </div>

        <div class="flex flex-wrap gap-3">
          <UButton
            icon="i-lucide-scan"
            @click="runMeasurement"
          >
            Measure
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
            v-if="lastOutcome !== null"
            :key="lastOutcome"
            :color="lastOutcome === 0 ? 'primary' : 'warning'"
            variant="subtle"
            :title="`Measured: ${lastOutcome}`"
            description="Each measurement gives a definite 0 or 1. The superposition collapses to that outcome for that shot."
          />
        </Transition>
      </div>
    </UCard>

    <div class="grid gap-6 md:grid-cols-2">
      <UCard>
        <template #header>
          <h3 class="font-semibold">
            Measurement histogram
          </h3>
        </template>

        <p class="mb-4 text-xs text-muted">
          Expected: {{ Math.round(probabilities.zero * 100) }}% |0⟩, {{ Math.round(probabilities.one * 100) }}% |1⟩
          <span v-if="totalShots > 0"> · {{ totalShots }} shots</span>
        </p>

        <div class="flex items-end justify-center gap-6 h-40">
          <div class="flex flex-col items-center gap-1 flex-1">
            <div class="flex h-32 w-full items-end justify-center rounded-lg bg-elevated px-3">
              <div
                class="w-full max-w-12 rounded-t bg-[var(--color-qubit-zero)] transition-all duration-300"
                :style="{ height: totalShots ? `${(counts.zero / totalShots) * 100}%` : '4%' }"
              />
            </div>
            <span class="font-mono text-xs">|0⟩</span>
            <span class="text-xs text-muted">{{ counts.zero }}</span>
          </div>

          <div class="flex flex-col items-center gap-1 flex-1">
            <div class="flex h-32 w-full items-end justify-center rounded-lg bg-elevated px-3">
              <div
                class="w-full max-w-12 rounded-t bg-[var(--color-qubit-one)] transition-all duration-300"
                :style="{ height: totalShots ? `${(counts.one / totalShots) * 100}%` : '4%' }"
              />
            </div>
            <span class="font-mono text-xs">|1⟩</span>
            <span class="text-xs text-muted">{{ counts.one }}</span>
          </div>
        </div>
      </UCard>

      <UCard>
        <template #header>
          <h3 class="font-semibold">
            Bloch sphere (2D view)
          </h3>
        </template>

        <p class="mb-4 text-xs text-muted">
          State {{ ketLabel(preset) }} shown as a point on the equatorial plane (x–z).
        </p>

        <ClientOnly>
          <QuantumBlochSphere2D :state="state" />
        </ClientOnly>
      </UCard>
    </div>
  </div>
</template>
