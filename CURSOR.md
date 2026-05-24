# Quantumania

## Vision & audience

Quantumania is a platform for learning quantum computing through interactive experiments and animations. The tone is inspired by _Quantum Computing For Dummies_: plain language first, minimal math upfront, and concepts reinforced with visuals.

Target audience: complete beginners curious about qubits, superposition, and measurement.

## Tech stack

- **Nuxt 4** — SSR/SSG app framework
- **Vue 3** — UI and interactivity
- **TypeScript** — typed lesson metadata and composables
- **Nuxt UI 4** — layout, navigation, and accessible components
- **Tailwind CSS 4** — styling and theme tokens
- **@nuxt/content** — markdown lesson prose
- **pnpm** — package manager

Navigation rules:

- Header always links to `/` (logo) and `/learn`.
- Learn pages use the `learn` layout with chapter sidebar and lesson prev/next.
- Lesson order is defined in `app/data/chapters.ts` (single source of truth for nav).
- Last lesson in each chapter links to `/learn/<chapter>/quiz`.
- Passing the quiz unlocks the "Complete" badge on `/learn`.

## Content model

Lessons are **markdown-first**. No per-lesson Vue page is required.

```
content/learn/<chapter>/index.md       → /learn/<chapter>
content/learn/<chapter>/<lesson>.md   → /learn/<chapter>/<lesson>
```

Each markdown file has frontmatter (`title`, `description`) and embeds interactives via **MDC**:

```md
---
title: Bit vs Qubit
description: ...
---

Lesson prose here...

::bit-vs-qubit
::
```

Interactive components live directly in `app/components/content/` (no wrapper layer). Use kebab-case MDC tags matching the component name, e.g. `::superposition`, `::bell-state`.

Routing is handled by two dynamic pages only:

- `app/pages/learn/[chapter]/[[lesson]].vue` — chapter intros + all lessons
- `app/pages/learn/[chapter]/quiz.vue` — chapter quiz (shared template)

`app/data/chapters.ts` still defines nav order and lesson slugs. When adding a lesson: create the markdown file, add an entry to `chapters.ts`, and register an MDC component if needed.

## Component conventions

| Directory                 | Purpose                                                                   |
| ------------------------- | ------------------------------------------------------------------------- |
| `app/components/learn/`   | Layout chrome: sidebar, headers, lesson nav                               |
| `app/components/content/` | MDC interactives for markdown (`::bit-vs-qubit`, `::superposition`, etc.) |
| `app/composables/`        | Navigation (`useChapterNav`) and progress (`useLessonProgress`)           |
| `app/data/`               | Chapter metadata (`chapters.ts`) and quizzes (`quizzes.ts`)               |
| `app/utils/`              | Pure quantum math helpers (probabilities, measurement)                    |
| `app/layouts/learn.vue`   | Sidebar + main content wrapper for lessons                                |

Rules:

- Name interactive components by concept (`BitVsQubit`, not `Lesson1Widget`).
- Wrap canvas, WebGL, or browser-only APIs in `<ClientOnly>`.
- Prefer SVG + CSS transitions over heavy 3D libraries in early chapters.

## Animation guidelines

1. **Concept demos** — CSS/Vue `<Transition>` for state changes.
2. **2D diagrams** — SVG for qubit states, probability bars, simple Bloch projections.
3. **3D Bloch sphere** — out of scope for Phase 1; revisit when gates chapter needs it.
4. Keep animations purposeful: every motion should illustrate a quantum idea, not decorate.

## Branding

Extend the default violet primary with quantum state accents in `app/assets/css/main.css`:

- `--color-qubit-zero` — \|0⟩ state (blue)
- `--color-qubit-one` — \|1⟩ state (orange)
- `--color-superposition` — superposition / \|+⟩ (purple)

Use Nuxt UI semantic colors (`primary`, `neutral`) for chrome; use quantum accents inside lesson interactives.

## Dev workflow

```bash
pnpm install
pnpm dev          # http://localhost:3000
pnpm lint
pnpm typecheck
pnpm build
pnpm preview
```

### File layout (key paths)

```
app/
  composables/useChapterNav.ts
  composables/useLessonProgress.ts
  data/chapters.ts
  data/quizzes.ts
  ...
content/
  learn/<chapter>/<lesson>.md
content.config.ts
```

When adding a new lesson:

1. Add `{ slug, title, description }` to `app/data/chapters.ts`
2. Create `content/learn/<chapter>/<slug>.md` with frontmatter, prose, and `::your-component` MDC block
3. Add `app/components/content/YourComponent.vue` if a new interactive is needed (use `not-prose my-8` on the root)
4. Add quiz questions to `app/data/quizzes.ts` if needed
