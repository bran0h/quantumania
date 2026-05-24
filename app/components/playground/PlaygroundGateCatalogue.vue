<script setup lang="ts">
import type { BasisState } from '~/utils/twoQubit'
import type { DjOracleType } from '~/utils/algorithms'
import type { PlaygroundStepDef } from '~/utils/playground'
import { stepLabel } from '~/utils/playground'

defineProps<{
  djOracle: DjOracleType
  groverMarked: BasisState
}>()

const emit = defineEmits<{
  'add': [def: PlaygroundStepDef]
  'update:djOracle': [value: DjOracleType]
  'update:groverMarked': [value: BasisState]
}>()

function dragPalette(event: DragEvent, def: PlaygroundStepDef) {
  event.dataTransfer?.setData('application/json', JSON.stringify({
    source: 'palette',
    def
  }))
  event.dataTransfer!.effectAllowed = 'copy'
}

const singleQubitItems = (['H', 'X', 'Z'] as const).map(gate => ({
  id: gate,
  label: gate,
  def: { kind: gate, qubit: 0 as const }
}))

const twoQubitItems = [
  { id: 'cnot', label: 'CNOT', hint: '0→1', def: { kind: 'CNOT' as const, control: 0 as const, target: 1 as const } },
  { id: 'diffuser', label: 'D', hint: 'diffuser', def: { kind: 'DIFFUSER' as const } }
]
</script>

<template>
  <UCard>
    <template #header>
      <div class="space-y-0.5">
        <h3 class="font-semibold text-sm">
          Gate catalogue
        </h3>
        <p class="text-xs text-muted font-normal">
          New gates start on q0 — drag onto q1 to switch wires
        </p>
      </div>
    </template>

    <div class="space-y-4">
      <div>
        <p class="text-xs text-muted mb-2">
          Single-qubit
        </p>
        <div class="flex flex-wrap gap-2">
          <button
            v-for="item in singleQubitItems"
            :key="item.id"
            type="button"
            draggable="true"
            class="flex size-10 items-center justify-center rounded-md border border-default bg-elevated text-sm font-bold font-mono transition-colors hover:border-primary hover:bg-primary/5 cursor-grab active:cursor-grabbing"
            :title="stepLabel(item.def)"
            @dragstart="dragPalette($event, item.def)"
            @click="emit('add', item.def)"
          >
            {{ item.label }}
          </button>
        </div>
      </div>

      <div>
        <p class="text-xs text-muted mb-2">
          Two-qubit
        </p>
        <div class="flex flex-wrap gap-2">
          <button
            v-for="item in twoQubitItems"
            :key="item.id"
            type="button"
            draggable="true"
            class="flex h-10 min-w-10 flex-col items-center justify-center rounded-md border border-dashed border-default bg-elevated px-2 text-center transition-colors hover:border-primary hover:bg-primary/5 cursor-grab active:cursor-grabbing"
            :title="stepLabel(item.def)"
            @dragstart="dragPalette($event, item.def)"
            @click="emit('add', item.def)"
          >
            <span class="text-sm font-bold font-mono leading-none">{{ item.label }}</span>
            <span
              v-if="item.hint"
              class="text-[9px] font-mono text-muted"
            >{{ item.hint }}</span>
          </button>
        </div>
      </div>

      <div>
        <p class="text-xs text-muted mb-2">
          Oracles
        </p>
        <div class="space-y-3">
          <div>
            <p class="text-[10px] text-muted mb-1.5 uppercase tracking-wide">
              Deutsch–Jozsa
            </p>
            <div class="flex flex-wrap gap-1.5 mb-2">
              <UButton
                v-for="oracle in (['constant-0', 'constant-1', 'balanced'] as DjOracleType[])"
                :key="oracle"
                :label="oracle === 'balanced' ? 'Bal' : oracle === 'constant-0' ? 'f=0' : 'f=1'"
                size="xs"
                :color="djOracle === oracle ? 'primary' : 'neutral'"
                :variant="djOracle === oracle ? 'solid' : 'outline'"
                @click="emit('update:djOracle', oracle)"
              />
            </div>
            <button
              type="button"
              draggable="true"
              class="flex h-10 w-full items-center justify-center gap-2 rounded-md border border-dashed border-default bg-elevated text-sm font-mono transition-colors hover:border-primary hover:bg-primary/5 cursor-grab active:cursor-grabbing"
              @dragstart="dragPalette($event, { kind: 'DJ_ORACLE', oracle: djOracle })"
              @click="emit('add', { kind: 'DJ_ORACLE', oracle: djOracle })"
            >
              <span class="font-bold">O</span>
              <span class="text-xs text-muted">DJ oracle</span>
            </button>
          </div>

          <div>
            <p class="text-[10px] text-muted mb-1.5 uppercase tracking-wide">
              Grover mark
            </p>
            <div class="flex flex-wrap gap-1.5 mb-2">
              <UButton
                v-for="basis in (['00', '01', '10', '11'] as BasisState[])"
                :key="basis"
                :label="`|${basis}⟩`"
                size="xs"
                :color="groverMarked === basis ? 'primary' : 'neutral'"
                :variant="groverMarked === basis ? 'solid' : 'outline'"
                @click="emit('update:groverMarked', basis)"
              />
            </div>
            <button
              type="button"
              draggable="true"
              class="flex h-10 w-full items-center justify-center gap-2 rounded-md border border-dashed border-default bg-elevated text-sm font-mono transition-colors hover:border-primary hover:bg-primary/5 cursor-grab active:cursor-grabbing"
              @dragstart="dragPalette($event, { kind: 'GROVER_ORACLE', marked: groverMarked })"
              @click="emit('add', { kind: 'GROVER_ORACLE', marked: groverMarked })"
            >
              <span class="font-bold">O</span>
              <span class="text-xs text-muted">mark |{{ groverMarked }}⟩</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </UCard>
</template>
