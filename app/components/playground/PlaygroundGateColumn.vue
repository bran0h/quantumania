<script setup lang="ts">
import type { PlaygroundStep } from '~/utils/playground'
import { isSingleQubitStep, stepShortLabel, stepSublabel } from '~/utils/playground'

const props = defineProps<{
  step: PlaygroundStep
  selected?: boolean
  wireHighlight?: 0 | 1 | null
}>()

const emit = defineEmits<{
  select: []
  dragStart: [event: DragEvent]
  dragEnd: []
  wireOver: [qubit: 0 | 1, event: DragEvent]
  wireDrop: [qubit: 0 | 1, event: DragEvent]
}>()

const def = computed(() => props.step.def)
const isSingle = computed(() => isSingleQubitStep(def.value))
const isTwoQubit = computed(() => !isSingle.value)
const singleQubitDef = computed(() => {
  const d = def.value
  return isSingleQubitStep(d) ? d : null
})

function wireClass(qubit: 0 | 1) {
  return props.wireHighlight === qubit ? 'bg-primary/15 ring-1 ring-primary/40' : ''
}
</script>

<template>
  <!-- Two-qubit gate spans both wires -->
  <div
    v-if="isTwoQubit"
    draggable="true"
    class="relative h-[72px] w-11 cursor-grab active:cursor-grabbing"
    @dragstart="emit('dragStart', $event)"
    @dragend="emit('dragEnd')"
    @click="emit('select')"
  >
    <!-- CNOT -->
    <div
      v-if="def.kind === 'CNOT'"
      class="relative mx-auto h-full w-8"
    >
      <div class="absolute left-1/2 top-3 bottom-3 w-px -translate-x-1/2 bg-[var(--ui-border-accented)]" />
      <div
        class="absolute left-1/2 size-2.5 -translate-x-1/2 rounded-full border-2 bg-elevated"
        :class="selected ? 'border-primary bg-primary' : 'border-[var(--ui-border-accented)]'"
        :style="{ top: def.control === 0 ? '6px' : 'auto', bottom: def.control === 1 ? '6px' : 'auto' }"
      />
      <div
        class="absolute left-1/2 flex size-5 -translate-x-1/2 items-center justify-center rounded-full border-2 bg-elevated text-[11px] font-bold leading-none"
        :class="selected ? 'border-primary text-primary' : 'border-[var(--ui-border-accented)] text-muted'"
        :style="{ top: def.target === 0 ? '4px' : 'auto', bottom: def.target === 1 ? '4px' : 'auto' }"
      >
        +
      </div>
    </div>

    <!-- Oracle / diffuser -->
    <div
      v-else
      class="mx-auto flex h-full w-11 flex-col items-center justify-center rounded-md border border-dashed text-center"
      :class="selected
        ? 'border-primary bg-primary text-inverted'
        : 'border-[var(--ui-border-accented)] bg-elevated'"
    >
      <span class="text-sm font-bold font-mono">{{ stepShortLabel(def) }}</span>
      <span
        v-if="stepSublabel(def)"
        class="mt-0.5 text-[8px] font-mono opacity-80"
      >
        {{ stepSublabel(def) }}
      </span>
    </div>
  </div>

  <!-- Single-qubit: one gate on q0 or q1, drag between wires -->
  <div
    v-else
    class="grid h-[72px] w-11 grid-rows-2 gap-y-0"
  >
    <div
      class="flex items-center justify-center rounded-sm transition-colors"
      :class="wireClass(0)"
      @dragover.prevent="emit('wireOver', 0, $event)"
      @drop="emit('wireDrop', 0, $event)"
    >
      <div
        v-if="singleQubitDef?.qubit === 0"
        draggable="true"
        class="flex h-9 w-11 cursor-grab items-center justify-center rounded-md border text-sm font-bold font-mono active:cursor-grabbing"
        :class="selected
          ? 'border-primary bg-primary text-inverted'
          : 'border-[var(--ui-border-accented)] bg-elevated'"
        @dragstart="emit('dragStart', $event)"
        @dragend="emit('dragEnd')"
        @click.stop="emit('select')"
      >
        {{ stepShortLabel(def) }}
      </div>
    </div>

    <div
      class="flex items-center justify-center rounded-sm transition-colors"
      :class="wireClass(1)"
      @dragover.prevent="emit('wireOver', 1, $event)"
      @drop="emit('wireDrop', 1, $event)"
    >
      <div
        v-if="singleQubitDef?.qubit === 1"
        draggable="true"
        class="flex h-9 w-11 cursor-grab items-center justify-center rounded-md border text-sm font-bold font-mono active:cursor-grabbing"
        :class="selected
          ? 'border-primary bg-primary text-inverted'
          : 'border-[var(--ui-border-accented)] bg-elevated'"
        @dragstart="emit('dragStart', $event)"
        @dragend="emit('dragEnd')"
        @click.stop="emit('select')"
      >
        {{ stepShortLabel(def) }}
      </div>
    </div>
  </div>
</template>
