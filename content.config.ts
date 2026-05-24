import { defineCollection, defineContentConfig } from '@nuxt/content'
import { z } from 'zod'

export default defineContentConfig({
  collections: {
    lessons: defineCollection({
      type: 'page',
      source: {
        include: 'learn/**/*.md',
        prefix: '/learn'
      },
      schema: z.object({
        title: z.string().optional(),
        description: z.string().optional()
      })
    })
  }
})
