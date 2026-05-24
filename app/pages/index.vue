<template>
  <div>
    <UPageHero
      title="Learn quantum computing by doing"
      description="Quantumania is an interactive learning platform for beginners. Explore qubits, gates, entanglement, and more through animations and hands-on experiments."
      :links="[{
        label: 'Start learning',
        to: '/learn',
        trailingIcon: 'i-lucide-arrow-right',
        size: 'xl'
      }]"
    />

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
        description: 'Three chapters cover qubits, quantum gates, and entanglement — with algorithms on the roadmap.'
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
        description="Three chapters walk you from classical bits to entanglement — each with short lessons and live demos."
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
