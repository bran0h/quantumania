<script setup>
const title = 'Quantumania'
const description = 'Learn quantum computing through interactive experiments and animations. Beginner-friendly lessons inspired by real quantum concepts.'

const navItems = [
  { to: '/learn', label: 'Learn' },
  { to: '/playground', label: 'Playground' },
  { to: '/learn/glossary', label: 'Glossary' }
]

useHead({
  meta: [
    { name: 'viewport', content: 'width=device-width, initial-scale=1' }
  ],
  link: [
    { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
    { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32.png' },
    { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon-16.png' },
    { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' }
  ],
  htmlAttrs: {
    lang: 'en'
  }
})

useSeoMeta({
  title,
  description,
  ogTitle: title,
  ogDescription: description,
  twitterCard: 'summary_large_image'
})
</script>

<template>
  <UApp>
    <UHeader>
      <template #left>
        <NuxtLink to="/">
          <AppLogo class="w-auto h-6 shrink-0" />
        </NuxtLink>

        <nav class="hidden sm:flex items-center gap-1 ml-4">
          <UButton
            v-for="item in navItems"
            :key="item.to"
            :to="item.to"
            :label="item.label"
            color="neutral"
            variant="ghost"
            size="sm"
          />
        </nav>
      </template>

      <template #body>
        <nav class="flex flex-col gap-1 px-4 pb-4 sm:hidden">
          <UButton
            v-for="item in navItems"
            :key="item.to"
            :to="item.to"
            :label="item.label"
            color="neutral"
            variant="ghost"
            block
          />
        </nav>
      </template>

      <template #right>
        <UColorModeButton />

        <UButton
          to="https://github.com/bran0h/quantumania"
          target="_blank"
          icon="i-simple-icons-github"
          aria-label="GitHub"
          color="neutral"
          variant="ghost"
        />
      </template>
    </UHeader>

    <UMain>
      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>
    </UMain>

    <USeparator icon="i-lucide-atom" />

    <UFooter>
      <template #left>
        <p class="text-sm text-muted">
          Quantumania · Learn quantum computing · © {{ new Date().getFullYear() }}
        </p>
      </template>

      <template #right>
        Made with 💖 by
        <a
          href="https://hozza.dev"
          target="_blank"
          class="text-primary"
        >bran0h</a>
      </template>
    </UFooter>
  </UApp>
</template>
