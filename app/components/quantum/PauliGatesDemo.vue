<script setup lang="ts">
import type { GateName } from '~/utils/gates'
import { GATES, applyGate } from '~/utils/gates'
import { getPresetState, getProbabilities, stateLabel } from '~/utils/qubit'

type StartPreset = 'zero' | 'one'

const startPreset = ref<StartPreset>('zero')
const selectedGate = ref<GateName>('X')

const startOptions: { label: string, value: StartPreset }[] = [
  { label: '|0⟩', value: 'zero' },
  { label: '|1⟩', value: 'one' }
]

const gateOptions: GateName[] = ['X', 'Z']

const inputState = computed(() => getPresetState(startPreset.value))
const outputState = computed(() => applyGate(inputState.value, selectedGate.value))
const inputProbs = computed(() => getProbabilities(inputState.value))
const outputProbs = computed(() => getProbabilities(outputState.value))
const gateInfo = computed(() => GATES[selectedGate.value])
</script>

<template>
  <div class="space-y-6">
    <UCard>
      <div class="space-y-4">
        <div class="flex flex-wrap gap-4">
          <div>
            <p class="text-xs text-muted mb-2">
              Start state
            </p>
            <div class="flex gap-2">
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
          </div>

          <div>
            <p class="text-xs text-muted mb-2">
              Apply gate
            </p>
            <div class="flex gap-2">
              <UButton
                v-for="gate in gateOptions"
                :key="gate"
                :label="gate"
                size="sm"
                :color="selectedGate === gate ? 'primary' : 'neutral'"
                :variant="selectedGate === gate ? 'solid' : 'outline'"
                @click="selectedGate = gate"
              />
            </div>
          </div>
        </div>

        <UAlert
          icon="i-lucide-info"
          color="primary"
          variant="subtle"
          :title="gateInfo.label"
          :description="gateInfo.description"
        />
      </div>
    </UCard>

    <div class="grid gap-6 md:grid-cols-2">
      <UCard>
        <template #header>
          <h3 class="font-semibold text-sm">
            Before
          </h3>
        </template>

        <p class="font-mono text-xl font-bold mb-4 text-center">
          {{ stateLabel(inputState) }}
        </p>

        <div class="flex justify-center gap-6 text-sm mb-4">
          <span class="text-[var(--color-qubit-zero)]">P(0): {{ Math.round(inputProbs.zero * 100) }}%</span>
          <span class="text-[var(--color-qubit-one)]">P(1): {{ Math.round(inputProbs.one * 100) }}%</span>
        </div>

        <ClientOnly>
          <QuantumBlochSphere2D
            :state="inputState"
            label="Input"
            compact
          />
        </ClientOnly>
      </UCard>

      <UCard>
        <template #header>
          <h3 class="font-semibold text-sm">
            After {{ selectedGate }}
          </h3>
        </template>

        <Transition
          mode="out-in"
          enter-active-class="transition duration-300"
          enter-from-class="opacity-0 translate-y-1"
          enter-to-class="opacity-100 translate-y-0"
        >
          <div :key="`${startPreset}-${selectedGate}`">
            <p class="font-mono text-xl font-bold mb-4 text-center">
              {{ stateLabel(outputState) }}
            </p>

            <div class="flex justify-center gap-6 text-sm mb-4">
              <span class="text-[var(--color-qubit-zero)]">P(0): {{ Math.round(outputProbs.zero * 100) }}%</span>
              <span class="text-[var(--color-qubit-one)]">P(1): {{ Math.round(outputProbs.one * 100) }}%</span>
            </div>

            <ClientOnly>
              <QuantumBlochSphere2D
                :state="outputState"
                label="Output"
                compact
              />
            </ClientOnly>
          </div>
        </Transition>
      </UCard>
    </div>

    <UAlert
      v-if="selectedGate === 'Z'"
      icon="i-lucide-eye-off"
      color="neutral"
      variant="subtle"
      title="Phase is invisible to measurement"
      description="The Z gate flips the phase of |1⟩ but measurement probabilities stay the same. You would need a different basis (like X-basis) to see the difference."
    />
  </div>
</template>
