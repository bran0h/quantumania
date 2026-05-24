<script setup lang="ts">
import type { DjCircuitStep, DjOracleType } from '~/utils/algorithms'
import {
  deutschJozsaInputProbabilities,
  deutschJozsaStateAtStep,
  djOracleLabel,
  djTruthTable,
  isDjOracleConstant
} from '~/utils/algorithms'
import { getTwoQubitProbabilities } from '~/utils/twoQubit'

const oracle = ref<DjOracleType>('balanced')

const oracleOptions: { label: string, value: DjOracleType }[] = [
  { label: 'f(x) = 0', value: 'constant-0' },
  { label: 'f(x) = 1', value: 'constant-1' },
  { label: 'Balanced', value: 'balanced' }
]

const steps: { key: DjCircuitStep, title: string }[] = [
  { key: 'init', title: '|00⟩' },
  { key: 'ancilla', title: 'X on q1' },
  { key: 'superposition', title: 'H on both' },
  { key: 'oracle', title: 'Oracle' },
  { key: 'interference', title: 'H on q0' },
  { key: 'measure', title: 'Measure q0' }
]

const stepIndex = ref(0)

const currentStep = computed(() => steps[stepIndex.value]!)
const state = computed(() =>
  deutschJozsaStateAtStep(oracle.value, currentStep.value.key)
)
const probabilities = computed(() => getTwoQubitProbabilities(state.value))
const inputProbs = computed(() => deutschJozsaInputProbabilities(oracle.value))
const truthTable = computed(() => djTruthTable(oracle.value))

const quantumVerdict = computed(() =>
  inputProbs.value.zero > 0.5 ? 'Constant' : 'Balanced'
)

const classicalQueriesNeeded = computed(() => {
  const [first, second] = truthTable.value
  return first!.fx === second!.fx ? 1 : 2
})

function nextStep() {
  stepIndex.value = Math.min(stepIndex.value + 1, steps.length - 1)
}

function prevStep() {
  stepIndex.value = Math.max(stepIndex.value - 1, 0)
}

watch(oracle, () => {
  stepIndex.value = 0
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
              An <strong>oracle</strong> is a gate that encodes a hidden function
              <span class="font-mono">f(x)</span> into the quantum state. You cannot see inside it
              — you only know what it does to amplitudes. Here, the balanced oracle is a
              <NuxtLink
                to="/learn/entanglement/bell-state"
                class="text-primary underline underline-offset-2"
              >CNOT</NuxtLink>
              gate; constant oracles leave the state unchanged or flip the ancilla. The
              <NuxtLink
                to="/learn/gates/hadamard-gate"
                class="text-primary underline underline-offset-2"
              >Hadamard</NuxtLink>
              step after the oracle uses
              <NuxtLink
                to="/learn/qubits/superposition"
                class="text-primary underline underline-offset-2"
              >interference</NuxtLink>
              to reveal whether <span class="font-mono">f</span> is constant or balanced.
            </p>
          </template>
        </UAlert>

        <p class="text-sm text-muted">
          Pick a hidden function, then step through the Deutsch–Jozsa circuit. After one run,
          measuring q0 tells you whether the function is constant or balanced.
        </p>

        <div class="flex flex-wrap gap-2">
          <UButton
            v-for="option in oracleOptions"
            :key="option.value"
            :label="option.label"
            size="sm"
            :color="oracle === option.value ? 'primary' : 'neutral'"
            :variant="oracle === option.value ? 'solid' : 'outline'"
            @click="oracle = option.value"
          />
        </div>

        <p class="text-sm font-mono text-primary">
          {{ djOracleLabel(oracle) }}
        </p>

        <div class="overflow-x-auto">
          <table class="w-full text-sm">
            <thead>
              <tr class="border-b border-default text-muted">
                <th class="py-2 pr-4 text-left font-medium">
                  x
                </th>
                <th class="py-2 text-left font-medium">
                  f(x)
                </th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="row in truthTable"
                :key="row.x"
                class="border-b border-default/50 font-mono"
              >
                <td class="py-2 pr-4">
                  {{ row.x }}
                </td>
                <td class="py-2">
                  {{ row.fx }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="flex items-center justify-between gap-4">
          <div>
            <p class="text-sm font-semibold">
              Step {{ stepIndex + 1 }} of {{ steps.length }}: {{ currentStep.title }}
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
      </div>
    </UCard>

    <div class="grid gap-6 md:grid-cols-2">
      <UCard>
        <template #header>
          <h3 class="font-semibold text-sm">
            Joint state probabilities
          </h3>
        </template>

        <div class="grid grid-cols-4 gap-2">
          <div
            v-for="(prob, basis) in probabilities"
            :key="basis"
            class="flex flex-col items-center gap-1"
          >
            <div class="flex h-24 w-full items-end justify-center rounded-lg bg-elevated px-1">
              <div
                class="w-full rounded-t bg-[var(--color-superposition)] transition-all duration-500"
                :style="{ height: barHeight(prob) }"
              />
            </div>
            <span class="font-mono text-xs">|{{ basis }}⟩</span>
            <span class="text-xs text-muted">{{ Math.round(prob * 100) }}%</span>
          </div>
        </div>
      </UCard>

      <UCard>
        <template #header>
          <h3 class="font-semibold text-sm">
            Result on q0
          </h3>
        </template>

        <div
          v-if="stepIndex < steps.length - 1"
          class="text-sm text-muted py-8 text-center"
        >
          Finish the circuit to read the verdict.
        </div>

        <div
          v-else
          class="space-y-4"
        >
          <div class="flex items-end justify-center gap-8 h-32">
            <div class="flex flex-col items-center gap-1">
              <div class="flex h-24 w-14 items-end rounded-lg bg-elevated">
                <div
                  class="w-full rounded-t bg-[var(--color-qubit-zero)] transition-all duration-500"
                  :style="{ height: barHeight(inputProbs.zero) }"
                />
              </div>
              <span class="font-mono text-xs">|0⟩</span>
              <span class="text-xs text-muted">{{ Math.round(inputProbs.zero * 100) }}%</span>
            </div>
            <div class="flex flex-col items-center gap-1">
              <div class="flex h-24 w-14 items-end rounded-lg bg-elevated">
                <div
                  class="w-full rounded-t bg-[var(--color-qubit-one)] transition-all duration-500"
                  :style="{ height: barHeight(inputProbs.one) }"
                />
              </div>
              <span class="font-mono text-xs">|1⟩</span>
              <span class="text-xs text-muted">{{ Math.round(inputProbs.one * 100) }}%</span>
            </div>
          </div>

          <UAlert
            icon="i-lucide-check"
            color="primary"
            variant="subtle"
            :title="`Verdict: ${quantumVerdict}`"
            :description="`Correct — oracle is ${isDjOracleConstant(oracle) ? 'constant' : 'balanced'}. Classical worst case needed ${classicalQueriesNeeded} query${classicalQueriesNeeded === 1 ? '' : 'ies'}.`"
          />
        </div>
      </UCard>
    </div>
  </div>
</template>
