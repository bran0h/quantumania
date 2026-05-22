<script setup>
const title = 'Quantumania'
const description = 'Learn quantum computing through interactive experiments and animations. Beginner-friendly lessons inspired by real quantum concepts.'

useHead({
  meta: [
    { name: 'viewport', content: 'width=device-width, initial-scale=1' }
  ],
  link: [
    { rel: 'icon', href: '/favicon.ico' }
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
            to="/learn"
            label="Learn"
            color="neutral"
            variant="ghost"
            size="sm"
          />
        </nav>
      </template>

      <template #right>
        <UColorModeButton />

        <UButton
          to="https://github.com/branislavhozza/quantumania"
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
        <UButton
          to="/learn"
          label="Start learning"
          color="neutral"
          variant="ghost"
          size="sm"
        />
      </template>
    </UFooter>
  </UApp>
</template>
