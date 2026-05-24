<script setup lang="ts">
import type { GateName } from '~/utils/gates'

const props = defineProps<{
  gates: GateName[]
  activeIndex?: number
}>()

const gateWidth = 48
const wirePadding = 40
const gateGap = 16

const svgWidth = computed(() => {
  if (props.gates.length === 0) {
    return 160
  }

  return wirePadding * 2 + props.gates.length * gateWidth + Math.max(0, props.gates.length - 1) * gateGap
})

function isActive(index: number) {
  return props.activeIndex === index
}
</script>

<template>
  <div class="overflow-x-auto">
    <svg
      :viewBox="`0 0 ${svgWidth} 80`"
      class="mx-auto min-w-[280px] w-full max-w-lg"
      aria-label="Quantum circuit diagram"
    >
      <line
        :x1="20"
        y1="40"
        :x2="svgWidth - 20"
        y2="40"
        stroke="var(--ui-border-accented)"
        stroke-width="2"
      />

      <text
        x="8"
        y="44"
        fill="var(--ui-text-toned)"
        class="text-[10px] font-mono"
      >|0⟩</text>

      <g
        v-for="(gate, index) in gates"
        :key="`${gate}-${index}`"
        :transform="`translate(${wirePadding + index * (gateWidth + gateGap)}, 16)`"
      >
        <rect
          width="48"
          height="48"
          rx="6"
          :fill="isActive(index) ? 'var(--ui-primary)' : 'var(--ui-bg-accented)'"
          :stroke="isActive(index) ? 'var(--ui-primary)' : 'var(--ui-border-accented)'"
          stroke-width="1.5"
          class="transition-colors duration-300"
        />
        <text
          x="24"
          y="30"
          text-anchor="middle"
          class="text-[16px] font-bold font-mono"
          :fill="isActive(index) ? 'var(--ui-text-inverted)' : 'var(--ui-text-highlighted)'"
        >
          {{ gate }}
        </text>
      </g>

      <text
        :x="svgWidth - 12"
        y="44"
        text-anchor="end"
        fill="var(--ui-text-toned)"
        class="text-[10px] font-mono"
      >M</text>
    </svg>
  </div>
</template>
