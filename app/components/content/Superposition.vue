<script setup lang="ts">
import type { QubitPreset } from '~/utils/qubit'
import { getPresetState, getProbabilities, ketFormula, ketLabel } from '~/utils/qubit'

const preset = ref<QubitPreset>('plus')

const presets: { label: string, value: QubitPreset, hint: string }[] = [
  { label: '|0⟩', value: 'zero', hint: '100% chance of measuring 0' },
  { label: '|1⟩', value: 'one', hint: '100% chance of measuring 1' },
  { label: '|+⟩', value: 'plus', hint: '50/50 — true superposition' }
]

const probabilities = computed(() => getProbabilities(getPresetState(preset.value)))

const barHeight = (value: number) => `${Math.max(value * 100, 4)}%`
</script>

<template>
  <div class="not-prose my-8">
    <UCard>
      <div class="space-y-6">
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

        <p class="text-sm text-muted">
          {{ presets.find(item => item.value === preset)?.hint }}
        </p>

        <div class="rounded-xl border border-default bg-elevated/50 p-6">
          <p class="mb-6 text-center font-mono text-lg">
            {{ ketFormula(preset) }}
          </p>

          <div class="mx-auto flex max-w-md items-end justify-center gap-8 h-48">
            <div class="flex flex-col items-center gap-2 flex-1">
              <div class="relative flex h-40 w-full items-end justify-center rounded-lg bg-default/50 px-4 pb-2">
                <Transition
                  enter-active-class="transition-all duration-500 ease-out"
                  enter-from-class="h-0 opacity-0"
                  enter-to-class="opacity-100"
                  leave-active-class="transition-all duration-300"
                  leave-from-class="opacity-100"
                  leave-to-class="h-0 opacity-0"
                >
                  <div
                    :key="`${preset}-zero`"
                    class="w-full max-w-16 rounded-t-md bg-[var(--color-qubit-zero)] transition-all duration-500"
                    :style="{ height: barHeight(probabilities.zero) }"
                  />
                </Transition>
              </div>
              <span class="font-mono text-sm font-semibold text-[var(--color-qubit-zero)]">|0⟩</span>
              <span class="text-xs text-muted">{{ Math.round(probabilities.zero * 100) }}%</span>
            </div>

            <div class="flex flex-col items-center gap-2 flex-1">
              <div class="relative flex h-40 w-full items-end justify-center rounded-lg bg-default/50 px-4 pb-2">
                <Transition
                  enter-active-class="transition-all duration-500 ease-out"
                  enter-from-class="h-0 opacity-0"
                  enter-to-class="opacity-100"
                  leave-active-class="transition-all duration-300"
                  leave-from-class="opacity-100"
                  leave-to-class="h-0 opacity-0"
                >
                  <div
                    :key="`${preset}-one`"
                    class="w-full max-w-16 rounded-t-md bg-[var(--color-qubit-one)] transition-all duration-500"
                    :style="{ height: barHeight(probabilities.one) }"
                  />
                </Transition>
              </div>
              <span class="font-mono text-sm font-semibold text-[var(--color-qubit-one)]">|1⟩</span>
              <span class="text-xs text-muted">{{ Math.round(probabilities.one * 100) }}%</span>
            </div>
          </div>
        </div>

        <UAlert
          v-if="preset === 'plus'"
          icon="i-lucide-sparkles"
          color="primary"
          variant="subtle"
          title="Superposition"
          description="Before measurement, the qubit is not 'half 0 and half 1' in the classical sense — it exists in a quantum combination of both outcomes."
        />

        <p
          v-else
          class="text-center text-sm text-muted"
        >
          State {{ ketLabel(preset) }} is a definite basis state — no superposition.
        </p>
      </div>
    </UCard>
  </div>
</template>
