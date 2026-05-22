# Quantumania

## Vision & audience

Quantumania is a platform for learning quantum computing through interactive experiments and animations. The tone is inspired by *Quantum Computing For Dummies*: plain language first, minimal math upfront, and concepts reinforced with visuals.

Target audience: complete beginners curious about qubits, superposition, and measurement.

## Tech stack

- **Nuxt 4** — SSR/SSG app framework
- **Vue 3** — UI and interactivity
- **TypeScript** — typed lesson metadata and composables
- **Nuxt UI 4** — layout, navigation, and accessible components
- **Tailwind CSS 4** — styling and theme tokens
- **pnpm** — package manager

## Information architecture

```
/                           Landing page
/learn                      Chapter index
/learn/qubits               Chapter 1 intro
/learn/qubits/bit-vs-qubit  Lesson 1
/learn/qubits/superposition Lesson 2
/learn/qubits/measurement   Lesson 3
/learn/gates                Chapter 2 intro
/learn/gates/what-are-gates Lesson 1
/learn/gates/pauli-gates    Lesson 2
/learn/gates/hadamard-gate  Lesson 3
/learn/entanglement            Chapter 3 intro
/learn/entanglement/two-qubits Lesson 1
/learn/entanglement/bell-state Lesson 2
/learn/entanglement/measuring-entanglement Lesson 3
```

Navigation rules:

- Header always links to `/` (logo) and `/learn`.
- Learn pages use the `learn` layout with chapter sidebar and lesson prev/next.
- Lesson order is defined in `app/data/chapters.ts` (single source of truth).

## Content model

```
Chapter
  └── Lessons[]
        ├── title, description, slug
        ├── prose (short explanatory copy in the page SFC)
        └── primary interactive (one `quantum/*` component per lesson)
```

Phase 1 keeps lesson copy in Vue SFCs for tight coupling with interactives. Defer `@nuxt/content` until later chapters need markdown-heavy text.

## Component conventions

| Directory | Purpose |
|---|---|
| `app/components/learn/` | Layout chrome: sidebar, headers, lesson nav |
| `app/components/quantum/` | Interactive demos and visualizations |
| `app/composables/` | Shared navigation logic (`useChapterNav`) |
| `app/data/` | Typed chapter and lesson metadata |
| `app/utils/` | Pure quantum math helpers (probabilities, measurement) |
| `app/layouts/learn.vue` | Sidebar + main content wrapper for lessons |

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

## Roadmap

### Phase 1 (MVP) — done in this iteration

- Landing page and learn hub
- Chapter 1: Qubits & Superposition (3 lessons with interactives)
- Learn layout with sidebar and prev/next navigation

### Phase 2 — gates & circuits — done in this iteration

- Chapter 2: Quantum gates (circuit intro, Pauli X/Z, Hadamard)
- Simple circuit diagram component
- Gate application with 2D Bloch sphere visualization

### Phase 3 — entanglement — done in this iteration

- Chapter 3: Two qubits, Bell state (H + CNOT), joint measurement correlations

### Phase 4 — algorithms & platform

- Intro algorithms (Deutsch-Jozsa, Grover overview)
- `@nuxt/content` for long-form lessons
- Progress persistence, quizzes

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
  app.vue
  assets/css/main.css
  components/learn/
  components/quantum/
  composables/useChapterNav.ts
  data/chapters.ts
  layouts/learn.vue
  pages/
    index.vue
    learn/
  utils/qubit.ts
```

When adding a new lesson: update `chapters.ts`, create the page under `pages/learn/<chapter>/`, and add a `quantum/*` interactive if needed.
