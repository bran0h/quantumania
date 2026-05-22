<script setup lang="ts">
defineProps<{
  prevPath: string
  nextPath?: string
  prevLabel?: string
  nextLabel?: string
}>()
</script>

<template>
  <nav class="mt-10 flex flex-col gap-3 border-t border-default pt-8 sm:flex-row sm:items-center sm:justify-between">
    <UButton
      :to="prevPath"
      icon="i-lucide-arrow-left"
      color="neutral"
      variant="outline"
    >
      {{ prevLabel ?? 'Previous' }}
    </UButton>

    <UButton
      v-if="nextPath"
      :to="nextPath"
      trailing-icon="i-lucide-arrow-right"
    >
      {{ nextLabel ?? 'Next lesson' }}
    </UButton>
  </nav>
</template>
