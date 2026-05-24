<script setup lang="ts">
import { classicalSearchQueries, groverQueryCount } from '~/utils/algorithms'

const searchSpace = ref(4)

const classical = computed(() => classicalSearchQueries(searchSpace.value))
const grover = computed(() => groverQueryCount(searchSpace.value))

const spaceOptions = [
  { label: '4 items', value: 4 },
  { label: '16 items', value: 16 },
  { label: '64 items', value: 64 },
  { label: '256 items', value: 256 }
]

const djClassicalQueries = 2
const djQuantumQueries = 1
</script>

<template>
  <div class="not-prose my-8 space-y-6">
    <UCard>
      <div class="space-y-4">
        <p class="text-sm text-muted">
          Quantum algorithms are not magic speedups for every task — they exploit interference and
          superposition for specific problems where structure can be exploited.
        </p>

        <div class="grid gap-4 sm:grid-cols-2">
          <div class="rounded-xl border border-default bg-elevated/50 p-4">
            <p class="text-xs font-medium text-muted mb-2">
              Deutsch–Jozsa (1-bit function)
            </p>
            <p class="text-sm mb-3">
              Is <span class="font-mono">f</span> constant or balanced?
            </p>

            <div class="space-y-2 text-sm">
              <div class="flex items-center justify-between gap-3">
                <span class="text-muted">Classical (worst case)</span>
                <UBadge
                  color="neutral"
                  variant="subtle"
                >
                  {{ djClassicalQueries }} queries
                </UBadge>
              </div>
              <div class="flex items-center justify-between gap-3">
                <span class="text-muted">Quantum (Deutsch–Jozsa)</span>
                <UBadge color="primary">
                  {{ djQuantumQueries }} query
                </UBadge>
              </div>
            </div>
          </div>

          <div class="rounded-xl border border-default bg-elevated/50 p-4">
            <p class="text-xs font-medium text-muted mb-2">
              Unstructured search
            </p>
            <p class="text-sm mb-3">
              Find one marked item in a list.
            </p>

            <div class="flex flex-wrap gap-2 mb-3">
              <UButton
                v-for="option in spaceOptions"
                :key="option.value"
                :label="option.label"
                size="xs"
                :color="searchSpace === option.value ? 'primary' : 'neutral'"
                :variant="searchSpace === option.value ? 'solid' : 'outline'"
                @click="searchSpace = option.value"
              />
            </div>

            <div class="space-y-2 text-sm">
              <div class="flex items-center justify-between gap-3">
                <span class="text-muted">Classical (worst case)</span>
                <UBadge
                  color="neutral"
                  variant="subtle"
                >
                  {{ classical.worst }} queries
                </UBadge>
              </div>
              <div class="flex items-center justify-between gap-3">
                <span class="text-muted">Grover (≈)</span>
                <UBadge color="primary">
                  {{ grover }} queries
                </UBadge>
              </div>
            </div>
          </div>
        </div>

        <UAlert
          icon="i-lucide-lightbulb"
          color="primary"
          variant="subtle"
          title="Quadratic speedup for search"
          description="Grover's algorithm needs about √(N) queries instead of N in the worst case — a quadratic improvement, not exponential. Still, for large databases that difference is enormous."
        />
      </div>
    </UCard>
  </div>
</template>
