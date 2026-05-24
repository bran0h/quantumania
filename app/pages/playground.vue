<script setup lang="ts">
import type { BasisState } from '~/utils/twoQubit'
import { measureTwoQubits } from '~/utils/twoQubit'
import type { DjOracleType } from '~/utils/algorithms'
import type { PlaygroundDropPayload, PlaygroundStep, PlaygroundStepDef } from '~/utils/playground'
import {
  createPlaygroundStep,
  isSingleQubitStep,
  playgroundPresets,
  runPlaygroundCircuit,
  stepLabel,
  withQubit
} from '~/utils/playground'

useSeoMeta({
  title: 'Playground — Quantumania',
  description: 'Build two-qubit circuits with gates and oracles. See the state update live.'
})

const initialBasis = ref<BasisState>('00')
const steps = ref<PlaygroundStep[]>([])
const selectedIndex = ref<number | undefined>()
const lastOutcome = ref<BasisState | null>(null)
const measurementCount = ref(0)

const djOracle = ref<DjOracleType>('balanced')
const groverMarked = ref<BasisState>('11')

const state = computed(() =>
  runPlaygroundCircuit(
    steps.value.map(item => item.def),
    initialBasis.value
  )
)

const selectedStep = computed(() =>
  selectedIndex.value !== undefined ? steps.value[selectedIndex.value] : undefined
)

function addStep(def: PlaygroundStepDef) {
  steps.value.push(createPlaygroundStep(def))
  selectedIndex.value = steps.value.length - 1
  lastOutcome.value = null
}

function insertStepAt(index: number, def: PlaygroundStepDef) {
  steps.value.splice(index, 0, createPlaygroundStep(def))
  selectedIndex.value = index
  lastOutcome.value = null
}

function moveStep(from: number, to: number) {
  if (from === to || from + 1 === to) {
    return
  }

  const item = steps.value[from]!
  const next = [...steps.value]
  next.splice(from, 1)
  const insertAt = to > from ? to - 1 : to
  next.splice(insertAt, 0, item)
  steps.value = next
  selectedIndex.value = insertAt
}

function setStepQubit(index: number, qubit: 0 | 1) {
  const step = steps.value[index]

  if (!step || !isSingleQubitStep(step.def)) {
    return
  }

  steps.value[index] = {
    ...step,
    def: { ...step.def, qubit }
  }
  selectedIndex.value = index
  lastOutcome.value = null
}

function handleDrop(index: number, payload: PlaygroundDropPayload) {
  const qubit = payload.qubit ?? 0

  if (payload.mode === 'wire') {
    if (payload.source === 'palette' && payload.def) {
      insertStepAt(index, withQubit(payload.def, qubit))
      return
    }

    if (payload.source === 'circuit' && payload.index !== undefined) {
      if (payload.index === index) {
        setStepQubit(index, qubit)
        return
      }

      moveStep(payload.index, index)

      if (selectedIndex.value !== undefined) {
        setStepQubit(selectedIndex.value, qubit)
      }
    }

    return
  }

  if (payload.source === 'palette' && payload.def) {
    insertStepAt(index, withQubit(payload.def, qubit))
    return
  }

  if (payload.source === 'circuit' && payload.index !== undefined) {
    moveStep(payload.index, index)

    if (selectedIndex.value !== undefined) {
      const step = steps.value[selectedIndex.value]

      if (step && isSingleQubitStep(step.def)) {
        setStepQubit(selectedIndex.value, qubit)
      }
    }
  }
}

function removeSelected() {
  if (selectedIndex.value === undefined) {
    return
  }

  steps.value.splice(selectedIndex.value, 1)
  selectedIndex.value = undefined
}

function clearCircuit() {
  steps.value = []
  selectedIndex.value = undefined
  lastOutcome.value = null
  measurementCount.value = 0
}

function loadPreset(presetId: string) {
  const preset = playgroundPresets.find(item => item.id === presetId)

  if (!preset) {
    return
  }

  initialBasis.value = preset.initial
  steps.value = preset.steps.map(def => createPlaygroundStep(def))
  selectedIndex.value = undefined
  lastOutcome.value = null
  measurementCount.value = 0
}

function measure() {
  const outcome = measureTwoQubits(state.value)
  lastOutcome.value = outcome.basis
  measurementCount.value += 1
}

watch(initialBasis, () => {
  lastOutcome.value = null
  measurementCount.value = 0
})
</script>

<template>
  <UContainer class="max-w-6xl py-10 sm:py-12 lg:py-14">
    <header class="mb-8 space-y-3">
      <div class="flex flex-wrap items-center gap-2">
        <UBadge
          color="primary"
          variant="subtle"
          label="Interactive"
          icon="i-lucide-flask-conical"
        />
      </div>
      <h1 class="text-3xl font-bold tracking-tight sm:text-4xl">
        Quantum playground
      </h1>
      <p class="text-lg text-muted max-w-2xl">
        Build two-qubit circuits with gates and oracles. Gates start on q0 — drag them
        between wires or reorder left to right.
      </p>
    </header>

    <div class="grid gap-6 lg:grid-cols-[minmax(0,1fr)_300px]">
      <div class="space-y-6 min-w-0">
        <UCard>
          <div class="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p class="text-sm font-medium mb-2">
                Initial state
              </p>
              <div class="flex flex-wrap gap-2">
                <UButton
                  v-for="basis in (['00', '01', '10', '11'] as BasisState[])"
                  :key="basis"
                  :label="`|${basis}⟩`"
                  size="sm"
                  :color="initialBasis === basis ? 'primary' : 'neutral'"
                  :variant="initialBasis === basis ? 'solid' : 'outline'"
                  @click="initialBasis = basis"
                />
              </div>
            </div>

            <div class="flex flex-wrap gap-2">
              <UButton
                color="neutral"
                variant="outline"
                icon="i-lucide-rotate-ccw"
                label="Clear circuit"
                size="sm"
                @click="clearCircuit"
              />
              <UButton
                icon="i-lucide-scan-line"
                label="Measure shot"
                size="sm"
                @click="measure"
              />
            </div>
          </div>
        </UCard>

        <div class="space-y-2">
          <div class="flex items-center justify-between gap-3">
            <h2 class="font-semibold">
              Circuit
            </h2>
            <p class="text-xs text-muted">
              Reorder left/right · drag gates up/down to switch q0 ↔ q1
            </p>
          </div>

          <PlaygroundCircuitCanvas
            :steps="steps"
            :initial-basis="initialBasis"
            :selected-index="selectedIndex"
            @select="selectedIndex = $event"
            @drop="handleDrop"
          />

          <div
            v-if="selectedStep"
            class="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-default bg-elevated/50 px-4 py-3"
          >
            <p class="text-sm">
              Selected: <span class="font-medium">{{ stepLabel(selectedStep.def) }}</span>
            </p>
            <UButton
              color="error"
              variant="soft"
              icon="i-lucide-trash-2"
              label="Remove"
              size="sm"
              @click="removeSelected"
            />
          </div>
        </div>

        <PlaygroundGateCatalogue
          v-model:dj-oracle="djOracle"
          v-model:grover-marked="groverMarked"
          class="lg:hidden"
          @add="addStep"
        />

        <UCard>
          <template #header>
            <h3 class="font-semibold text-sm">
              Presets
            </h3>
          </template>

          <div class="grid gap-3 sm:grid-cols-2">
            <button
              v-for="preset in playgroundPresets"
              :key="preset.id"
              type="button"
              class="rounded-lg border border-default p-3 text-left transition-colors hover:border-primary hover:bg-primary/5"
              @click="loadPreset(preset.id)"
            >
              <p class="font-medium text-sm">
                {{ preset.label }}
              </p>
              <p class="text-xs text-muted mt-1">
                {{ preset.description }}
              </p>
            </button>
          </div>
        </UCard>
      </div>

      <div class="space-y-6">
        <PlaygroundGateCatalogue
          v-model:dj-oracle="djOracle"
          v-model:grover-marked="groverMarked"
          class="hidden lg:block"
          @add="addStep"
        />

        <PlaygroundOutput
          :state="state"
          :last-outcome="lastOutcome"
          :measurement-count="measurementCount"
        />

        <UAlert
          icon="i-lucide-lightbulb"
          color="neutral"
          variant="subtle"
          title="Tip"
          description="Measure runs a simulated shot without clearing your circuit — run it many times to explore outcome statistics."
        />
      </div>
    </div>
  </UContainer>
</template>
