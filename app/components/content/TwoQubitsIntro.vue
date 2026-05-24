<script setup lang="ts">
import type { BasisState } from '~/utils/twoQubit'
import { basisLabel, getBasisState, getTwoQubitProbabilities } from '~/utils/twoQubit'

const selected = ref<BasisState>('00')

const options: BasisState[] = ['00', '01', '10', '11']

const state = computed(() => getBasisState(selected.value))
const probabilities = computed(() => getTwoQubitProbabilities(state.value))

const barHeight = (value: number) => `${Math.max(value * 100, 4)}%`
</script>

<template>
  <div class="not-prose my-8">
    <UCard>
      <div class="space-y-6">
        <p class="text-sm text-muted">
          With two qubits, the system has four basis states. Each is a definite classical pair —
          both qubits are independent and fully specified.
        </p>

        <div class="flex flex-wrap gap-2">
          <UButton
            v-for="option in options"
            :key="option"
            :label="basisLabel(option)"
            size="sm"
            :color="selected === option ? 'primary' : 'neutral'"
            :variant="selected === option ? 'solid' : 'outline'"
            @click="selected = option"
          />
        </div>

        <div class="rounded-xl border border-default bg-elevated/50 p-6">
          <p class="mb-6 text-center font-mono text-lg">
            {{ basisLabel(selected) }}
          </p>

          <div class="grid grid-cols-4 gap-3 max-w-lg mx-auto">
            <div
              v-for="option in options"
              :key="option"
              class="flex flex-col items-center gap-2"
            >
              <div class="flex h-28 w-full items-end justify-center rounded-lg bg-default/50 px-2">
                <div
                  class="w-full rounded-t transition-all duration-500"
                  :class="option === selected
                    ? 'bg-[var(--color-superposition)]'
                    : 'bg-[var(--ui-border)]'"
                  :style="{ height: barHeight(probabilities[option]) }"
                />
              </div>
              <span class="font-mono text-xs">{{ basisLabel(option) }}</span>
              <span class="text-xs text-muted">{{ Math.round(probabilities[option] * 100) }}%</span>
            </div>
          </div>
        </div>

        <UAlert
          icon="i-lucide-info"
          color="primary"
          variant="subtle"
          title="Product states"
          description="States like |01⟩ are product states: q0 and q1 each have their own definite value. Entanglement is something different — coming up next."
        />
      </div>
    </UCard>
  </div>
</template>
