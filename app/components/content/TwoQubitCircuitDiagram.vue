<script setup lang="ts">
import type { TwoQubitCircuitStep } from '~/utils/twoQubit'

const props = withDefaults(defineProps<{
  step?: TwoQubitCircuitStep
}>(), {
  step: 'cnot'
})

const columnWidth = 56
const wirePadding = 36
const svgWidth = wirePadding * 2 + columnWidth * 3

const wireY = [28, 52] as const

function columnX(index: number) {
  return wirePadding + index * columnWidth
}

function isHighlighted(step: TwoQubitCircuitStep) {
  return props.step === step
}
</script>

<template>
  <div class="overflow-x-auto">
    <svg
      :viewBox="`0 0 ${svgWidth} 80`"
      class="mx-auto min-w-[280px] w-full max-w-md"
      aria-label="Two-qubit quantum circuit"
    >
      <line
        v-for="y in wireY"
        :key="y"
        :x1="16"
        :y1="y"
        :x2="svgWidth - 16"
        :y2="y"
        stroke="var(--ui-border-accented)"
        stroke-width="2"
      />

      <text
        x="6"
        :y="wireY[0] + 4"
        fill="var(--ui-text-toned)"
        class="text-[9px] font-mono"
      >q0</text>
      <text
        x="6"
        :y="wireY[1] + 4"
        fill="var(--ui-text-toned)"
        class="text-[9px] font-mono"
      >q1</text>

      <g :transform="`translate(${columnX(0)}, 8)`">
        <rect
          width="40"
          height="40"
          rx="6"
          :fill="isHighlighted('hadamard') ? 'var(--ui-primary)' : 'var(--ui-bg-accented)'"
          :stroke="isHighlighted('hadamard') ? 'var(--ui-primary)' : 'var(--ui-border-accented)'"
          stroke-width="1.5"
        />
        <text
          x="20"
          y="25"
          text-anchor="middle"
          class="text-[14px] font-bold font-mono"
          :fill="isHighlighted('hadamard') ? 'var(--ui-text-inverted)' : 'var(--ui-text-highlighted)'"
        >
          H
        </text>
      </g>

      <g :transform="`translate(${columnX(1)}, 0)`">
        <line
          :x1="20"
          :y1="wireY[0]"
          :x2="20"
          :y2="wireY[1]"
          stroke="var(--ui-border-accented)"
          stroke-width="2"
          :stroke-opacity="isHighlighted('cnot') ? 1 : 0.7"
        />
        <circle
          :cx="20"
          :cy="wireY[0]"
          r="5"
          :fill="isHighlighted('cnot') ? 'var(--ui-primary)' : 'var(--ui-bg-accented)'"
          :stroke="isHighlighted('cnot') ? 'var(--ui-primary)' : 'var(--ui-border-accented)'"
          stroke-width="1.5"
        />
        <circle
          :cx="20"
          :cy="wireY[1]"
          r="8"
          fill="none"
          :stroke="isHighlighted('cnot') ? 'var(--ui-primary)' : 'var(--ui-border-accented)'"
          stroke-width="2"
        />
        <line
          :x1="14"
          :y1="wireY[1]"
          :x2="26"
          :y2="wireY[1]"
          :stroke="isHighlighted('cnot') ? 'var(--ui-primary)' : 'var(--ui-text-toned)'"
          stroke-width="2"
        />
        <line
          :x1="20"
          :y1="wireY[1] - 8"
          :x2="20"
          :y2="wireY[1] + 8"
          :stroke="isHighlighted('cnot') ? 'var(--ui-primary)' : 'var(--ui-text-toned)'"
          stroke-width="2"
        />
      </g>

      <text
        :x="svgWidth - 10"
        :y="wireY[0] + 4"
        text-anchor="end"
        fill="var(--ui-text-toned)"
        class="text-[9px] font-mono"
      >M</text>
      <text
        :x="svgWidth - 10"
        :y="wireY[1] + 4"
        text-anchor="end"
        fill="var(--ui-text-toned)"
        class="text-[9px] font-mono"
      >M</text>
    </svg>
  </div>
</template>
