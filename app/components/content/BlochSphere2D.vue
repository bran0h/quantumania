<script setup lang="ts">
import type { QubitState } from '~/utils/qubit'
import { blochCoordinates } from '~/utils/qubit'

const props = withDefaults(defineProps<{
  state: QubitState
  label?: string
  compact?: boolean
}>(), {
  compact: false
})

const bloch = computed(() => blochCoordinates(props.state))

const blochPoint = computed(() => ({
  cx: 100 + bloch.value.x * 70,
  cy: 100 - bloch.value.z * 70
}))
</script>

<template>
  <div class="space-y-2">
    <p
      v-if="label"
      class="text-xs font-medium text-muted text-center"
    >
      {{ label }}
    </p>

    <svg
      viewBox="0 0 200 200"
      :class="compact ? 'mx-auto w-full max-w-[140px]' : 'mx-auto w-full max-w-xs'"
      aria-label="Bloch sphere projection"
    >
      <circle
        cx="100"
        cy="100"
        r="70"
        fill="none"
        stroke="var(--ui-border-accented)"
        stroke-width="1.5"
      />
      <line
        x1="30"
        y1="100"
        x2="170"
        y2="100"
        stroke="var(--ui-border)"
        stroke-width="1"
      />
      <line
        x1="100"
        y1="30"
        x2="100"
        y2="170"
        stroke="var(--ui-border)"
        stroke-width="1"
      />
      <text
        x="168"
        y="104"
        fill="var(--ui-text-toned)"
        class="text-[8px]"
      >|0⟩</text>
      <text
        x="28"
        y="104"
        fill="var(--ui-text-toned)"
        class="text-[8px]"
      >|1⟩</text>

      <line
        :x1="100"
        :y1="100"
        :x2="blochPoint.cx"
        :y2="blochPoint.cy"
        stroke="var(--color-superposition)"
        stroke-width="2"
        stroke-opacity="0.8"
      />

      <circle
        :cx="blochPoint.cx"
        :cy="blochPoint.cy"
        r="6"
        fill="var(--color-superposition)"
        class="transition-all duration-500"
      />
    </svg>
  </div>
</template>
