<script setup lang="ts">
import { chapterPath, chapters } from '~/data/chapters'
</script>

<template>
  <div>
    <UPageHero
      orientation="horizontal"
      title="Learn quantum computing by doing"
      description="Quantumania is an interactive learning platform for beginners. Explore qubits, gates, entanglement, and algorithms through animations and hands-on experiments."
      :links="[{
        label: 'Start learning',
        to: '/learn/qubits/bit-vs-qubit',
        trailingIcon: 'i-lucide-arrow-right',
        size: 'xl'
      }, {
        label: 'Browse chapters',
        to: '/learn',
        icon: 'i-lucide-library',
        size: 'xl',
        color: 'neutral',
        variant: 'outline'
      }]"
    >
      <HeroQuantumAnimation />
    </UPageHero>

    <UPageSection
      id="chapters"
      title="Four guided chapters"
      description="Each chapter has three short lessons, an interactive demo, and a quiz to check your understanding."
    >
      <div class="grid gap-4 sm:grid-cols-2">
        <UCard
          v-for="(chapter, index) in chapters"
          :key="chapter.slug"
          :ui="{ body: 'space-y-3' }"
        >
          <div class="flex items-center gap-2">
            <span class="flex size-8 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
              {{ index + 1 }}
            </span>
            <h3 class="font-semibold">
              {{ chapter.title }}
            </h3>
          </div>
          <p class="text-sm text-muted">
            {{ chapter.description }}
          </p>
          <UButton
            :to="chapterPath(chapter.slug)"
            label="Open chapter"
            trailing-icon="i-lucide-arrow-right"
            size="sm"
            variant="soft"
          />
        </UCard>
      </div>
    </UPageSection>

    <UPageSection
      id="features"
      title="Quantum concepts, made tangible"
      description="Inspired by approachable introductions to quantum computing — with visuals and interactives instead of walls of equations."
      :features="[{
        icon: 'i-lucide-atom',
        title: 'Interactive lessons',
        description: 'Each lesson pairs clear explanations with a hands-on demo so you can see superposition and measurement in action.'
      }, {
        icon: 'i-lucide-sparkles',
        title: 'Animated visualizations',
        description: 'Probability bars, state diagrams, and Bloch projections help build intuition before diving into the math.'
      }, {
        icon: 'i-lucide-book-open',
        title: 'Beginner-first pacing',
        description: 'Four chapters cover qubits, gates, entanglement, and introductory algorithms — with more on the roadmap.'
      }, {
        icon: 'i-lucide-layers',
        title: 'Structured chapters',
        description: 'Follow a guided path with sidebar navigation, breadcrumbs, and next/previous lesson links.'
      }, {
        icon: 'i-lucide-moon',
        title: 'Dark mode ready',
        description: 'Study comfortably day or night with Nuxt UI\'s built-in light and dark themes.'
      }, {
        icon: 'i-lucide-zap',
        title: 'Fast and accessible',
        description: 'Built with Nuxt 4 and Nuxt UI for performance, keyboard navigation, and responsive layouts.'
      }]"
    />

    <UPageSection>
      <UPageCTA
        title="Ready to explore quantum computing?"
        description="Four chapters walk you from classical bits to entanglement and quantum algorithms — each with short lessons and live demos."
        variant="subtle"
        :links="[{
          label: 'Begin Chapter 1',
          to: '/learn/qubits/bit-vs-qubit',
          trailingIcon: 'i-lucide-arrow-right',
          color: 'primary'
        }, {
          label: 'Browse chapters',
          to: '/learn',
          icon: 'i-lucide-library',
          color: 'neutral',
          variant: 'outline'
        }]"
      />
    </UPageSection>
  </div>
</template>
