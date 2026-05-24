<script setup lang="ts">
import type { BasisState } from '~/utils/twoQubit'
import type { PlaygroundDropPayload, PlaygroundStep } from '~/utils/playground'
import { qubitFromPointer } from '~/utils/playground'

const props = defineProps<{
  steps: PlaygroundStep[]
  initialBasis: BasisState
  selectedIndex?: number
}>()

const emit = defineEmits<{
  select: [index: number]
  drop: [index: number, payload: PlaygroundDropPayload]
}>()

const dragOverIndex = ref<number | null>(null)
const dragOverWire = ref<{ column: number, qubit: 0 | 1 } | null>(null)
const draggingIndex = ref<number | null>(null)

const qubitLabels = computed(() => [
  `|${props.initialBasis[0]}⟩`,
  `|${props.initialBasis[1]}⟩`
])

function isSelected(index: number) {
  return props.selectedIndex === index
}

function onDragStartCircuit(event: DragEvent, index: number) {
  draggingIndex.value = index
  event.dataTransfer?.setData('application/json', JSON.stringify({
    source: 'circuit',
    index
  } satisfies PlaygroundDropPayload))
  event.dataTransfer!.effectAllowed = 'move'
}

function onDragEnd() {
  draggingIndex.value = null
  dragOverIndex.value = null
  dragOverWire.value = null
}

function parsePayload(event: DragEvent): PlaygroundDropPayload | null {
  const raw = event.dataTransfer?.getData('application/json')

  if (!raw) {
    return null
  }

  try {
    return JSON.parse(raw) as PlaygroundDropPayload
  } catch {
    return null
  }
}

function onDragOverSlot(event: DragEvent, index: number) {
  event.preventDefault()
  dragOverIndex.value = index
  dragOverWire.value = null
  event.dataTransfer!.dropEffect = draggingIndex.value !== null ? 'move' : 'copy'
}

function onDropSlot(event: DragEvent, index: number) {
  event.preventDefault()
  dragOverIndex.value = null
  dragOverWire.value = null
  draggingIndex.value = null

  const payload = parsePayload(event)

  if (!payload) {
    return
  }

  const target = event.currentTarget as HTMLElement
  emit('drop', index, {
    ...payload,
    qubit: qubitFromPointer(event, target),
    mode: 'insert'
  })
}

function onWireOver(columnIndex: number, qubit: 0 | 1, event: DragEvent) {
  event.preventDefault()
  dragOverWire.value = { column: columnIndex, qubit }
  dragOverIndex.value = null
  event.dataTransfer!.dropEffect = draggingIndex.value !== null ? 'move' : 'copy'
}

function onWireDrop(columnIndex: number, qubit: 0 | 1, event: DragEvent) {
  event.preventDefault()
  dragOverWire.value = null
  draggingIndex.value = null

  const payload = parsePayload(event)

  if (!payload) {
    return
  }

  emit('drop', columnIndex, {
    ...payload,
    qubit,
    mode: 'wire'
  })
}

function wireHighlight(columnIndex: number): 0 | 1 | null {
  if (dragOverWire.value?.column === columnIndex) {
    return dragOverWire.value.qubit
  }

  return null
}
</script>

<template>
  <div class="rounded-xl border border-default bg-default/40 overflow-hidden">
    <div class="flex min-h-[112px]">
      <div class="flex w-[3.25rem] shrink-0 flex-col justify-around border-r border-default/60 py-6 pl-3 pr-1">
        <div class="text-[10px] font-mono leading-tight">
          <div class="text-muted">
            q0
          </div>
          <div>{{ qubitLabels[0] }}</div>
        </div>
        <div class="text-[10px] font-mono leading-tight">
          <div class="text-muted">
            q1
          </div>
          <div>{{ qubitLabels[1] }}</div>
        </div>
      </div>

      <div class="relative min-w-0 flex-1 overflow-x-auto py-6 pr-3">
        <div
          class="pointer-events-none absolute inset-x-0 top-[38px] h-px bg-[var(--ui-border-accented)]"
          aria-hidden="true"
        />
        <div
          class="pointer-events-none absolute inset-x-0 top-[68px] h-px bg-[var(--ui-border-accented)]"
          aria-hidden="true"
        />

        <div class="relative flex min-w-max items-center">
          <div
            class="flex h-[72px] w-5 shrink-0 items-center justify-center"
            @dragover="onDragOverSlot($event, 0)"
            @dragleave="dragOverIndex = null"
            @drop="onDropSlot($event, 0)"
          >
            <div
              class="h-14 rounded-full transition-all duration-150"
              :class="dragOverIndex === 0 ? 'w-1 bg-primary' : 'w-px bg-transparent'"
            />
          </div>

          <template
            v-for="(step, index) in steps"
            :key="step.id"
          >
            <div
              class="shrink-0 transition-opacity"
              :class="draggingIndex === index ? 'opacity-35' : ''"
            >
              <PlaygroundGateColumn
                :step="step"
                :selected="isSelected(index)"
                :wire-highlight="wireHighlight(index)"
                @select="emit('select', index)"
                @drag-start="onDragStartCircuit($event, index)"
                @drag-end="onDragEnd"
                @wire-over="(qubit, event) => onWireOver(index, qubit, event)"
                @wire-drop="(qubit, event) => onWireDrop(index, qubit, event)"
              />
            </div>

            <div
              class="flex h-[72px] w-5 shrink-0 items-center justify-center"
              @dragover="onDragOverSlot($event, index + 1)"
              @dragleave="dragOverIndex = null"
              @drop="onDropSlot($event, index + 1)"
            >
              <div
                class="h-14 rounded-full transition-all duration-150"
                :class="dragOverIndex === index + 1 ? 'w-1 bg-primary' : 'w-px bg-transparent'"
              />
            </div>
          </template>

          <div class="ml-2 flex h-[72px] shrink-0 flex-col justify-around pl-1 text-[10px] font-mono text-muted">
            <span>M</span>
            <span>M</span>
          </div>
        </div>
      </div>
    </div>

    <p
      v-if="steps.length === 0"
      class="border-t border-default/60 px-4 py-2.5 text-center text-xs text-muted"
    >
      Drag gates from the catalogue — drop on q0 or q1 to pick the wire
    </p>
  </div>
</template>
