<script setup lang="ts">
import { applyGate } from '~/utils/gates'
import { getPresetState, getProbabilities, stateLabel } from '~/utils/qubit'

type StartPreset = 'zero' | 'one'

const startPreset = ref<StartPreset>('zero')

const startOptions: { label: string, value: StartPreset, hint: string }[] = [
  { label: '|0⟩', value: 'zero', hint: 'H|0⟩ = |+⟩' },
  { label: '|1⟩', value: 'one', hint: 'H|1⟩ = |-⟩' }
]

const inputState = computed(() => getPresetState(startPreset.value))
const outputState = computed(() => applyGate(inputState.value, 'H'))
const inputProbs = computed(() => getProbabilities(inputState.value))
const outputProbs = computed(() => getProbabilities(outputState.value))

const barHeight = (value: number) => `${Math.max(value * 100, 4)}%`
</script>

<template>
  <div class="space-y-6">
    <UCard>
      <div class="space-y-4">
        <p class="text-sm text-muted">
          The Hadamard gate is the gateway to superposition. Pick a starting state and see how H transforms it.
        </p>

        <div class="flex flex-wrap gap-2">
          <UButton
            v-for="option in startOptions"
            :key="option.value"
            :label="option.label"
            size="sm"
            :color="startPreset === option.value ? 'primary' : 'neutral'"
            :variant="startPreset === option.value ? 'solid' : 'outline'"
            @click="startPreset = option.value"
          />
        </div>

        <p class="text-sm font-mono text-primary">
          {{ startOptions.find(o => o.value === startPreset)?.hint }}
        </p>
      </div>
    </UCard>

    <QuantumCircuitDiagram :gates="['H']" />

    <div class="grid gap-6 md:grid-cols-2">
      <UCard>
        <template #header>
          <h3 class="font-semibold text-sm">
            Input
          </h3>
        </template>

        <p class="font-mono text-2xl font-bold text-center mb-2">
          {{ stateLabel(inputState) }}
        </p>
        <p class="text-center text-sm text-muted mb-4">
          P(0) = {{ Math.round(inputProbs.zero * 100) }}% · P(1) = {{ Math.round(inputProbs.one * 100) }}%
        </p>

        <ClientOnly>
          <QuantumBlochSphere2D
            :state="inputState"
            compact
          />
        </ClientOnly>
      </UCard>

      <UCard>
        <template #header>
          <h3 class="font-semibold text-sm">
            After H
          </h3>
        </template>

        <Transition
          mode="out-in"
          enter-active-class="transition duration-300"
          enter-from-class="opacity-0"
          enter-to-class="opacity-100"
        >
          <div :key="startPreset">
            <p class="font-mono text-2xl font-bold text-center mb-2 text-[var(--color-superposition)]">
              {{ stateLabel(outputState) }}
            </p>
            <p class="text-center text-sm text-muted mb-4">
              P(0) = {{ Math.round(outputProbs.zero * 100) }}% · P(1) = {{ Math.round(outputProbs.one * 100) }}%
            </p>

            <div class="flex items-end justify-center gap-6 h-24 mb-4">
              <div class="flex flex-col items-center gap-1">
                <div class="flex h-20 w-12 items-end rounded bg-elevated">
                  <div
                    class="w-full rounded-t bg-[var(--color-qubit-zero)] transition-all duration-500"
                    :style="{ height: barHeight(outputProbs.zero) }"
                  />
                </div>
                <span class="font-mono text-xs">|0⟩</span>
              </div>
              <div class="flex flex-col items-center gap-1">
                <div class="flex h-20 w-12 items-end rounded bg-elevated">
                  <div
                    class="w-full rounded-t bg-[var(--color-qubit-one)] transition-all duration-500"
                    :style="{ height: barHeight(outputProbs.one) }"
                  />
                </div>
                <span class="font-mono text-xs">|1⟩</span>
              </div>
            </div>

            <ClientOnly>
              <QuantumBlochSphere2D
                :state="outputState"
                compact
              />
            </ClientOnly>
          </div>
        </Transition>
      </UCard>
    </div>
  </div>
</template>
