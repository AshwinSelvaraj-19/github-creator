# README Forge — Architecture Documentation

This document explains the architecture of README Forge, a premium GitHub
README builder. Each major module is described with its purpose and rationale.

## Directory Structure

```
src/
  app/              Application shell (router, providers)
  animations/       Centralized Framer Motion variants
  components/
    layout/         App shell components (navbar, background)
    ui/             Reusable glass component library (13 components)
  config/           Design tokens, app configuration
  constants/        App-wide constants (nav links, steps, suggestions)
  engine/           Schema-driven form engine
    fields/         Individual field renderers
  features/         Feature pages (landing, builder, templates, preview)
  hooks/            React hooks (usePyodide)
  providers/        Context providers (theme, toast)
  renderer/         (Reserved for future markdown renderers)
  services/         Framework-agnostic services (pyodide)
  shared/           Shared utilities (icon registry)
  store/            Zustand store
    slices/         Isolated state slices (7 slices)
  templates/        Template engine
    definitions/    Individual template definitions (10 templates)
  three/            (Reserved for React Three Fiber scenes)
  types/            Centralized TypeScript types
  utils/            Utility functions
```

## Module Documentation

### `config/tokens.ts` — Design Tokens

**Why:** A single source of truth for every visual value (colors, spacing,
radius, blur, shadows, animation durations). Components reference tokens
instead of hardcoding values, so re-theming the entire app is a one-file edit.
Tokens are mirrored into Tailwind v4's `@theme` block in `styles/index.css`.

### `shared/iconRegistry.tsx` — Icon System

**Why:** Importing lucide-react icons directly in every component scatters
dependencies. The registry maps stable string keys to icon components.
Components use `<Icon name="github" />` — declarative, auditable, and
swappable.

### `animations/variants.ts` — Animation Library

**Why:** Inline Framer Motion variants are impossible to keep consistent.
This module exports every variant the app uses, grouped by category (hover,
fade, slide, page, card, modal, button, sidebar, toast, accordion). No
component defines animation objects inline.

### `components/ui/` — Glass Component Library

**Why:** 13 reusable components (GlassPanel, GlassCard, GlassButton,
GlassInput, GlassTextarea, GlassSelect, GlassTabs, GlassModal, GlassSidebar,
GlassToast, GlassTooltip, GlassAccordion, GlassBadge, GlassPreview) that
compose the design system. Each is generic and prop-driven — no business
logic. All glass styling uses the token-based `.glass` / `.glass-strong`
utility classes.

### `store/` — Zustand Store with Slices

**Why:** A monolithic store becomes unmaintainable. The store is split into
7 isolated slices:

- **builder** — form data + generation status (persisted)
- **templates** — selected template + filter state
- **history** — generated README snapshots (persisted, capped at 50)
- **preview** — preview pane mode + fullscreen + current markdown
- **theme** — light/dark mode (persisted)
- **settings** — user preferences (persisted)
- **ai** — placeholder for future AI features

Each slice is in `store/slices/` and composed in `store/index.ts`. Selector
hooks in `store/selectors.ts` provide typed access per slice.

### `templates/` — Template Engine

**Why:** The builder shouldn't use switch statements to render templates.
Each template is a self-contained `TemplateDefinition` in
`templates/definitions/` with its theme, widget config, and metadata. The
`registry.ts` aggregates them; `engine.ts` resolves a template and produces
markdown (via the pyodide service by default, or a custom renderer if
defined). Adding a template is one file + one import line.

### `engine/` — Schema-Driven Form Engine

**Why:** Hardcoding forms in JSX doesn't scale. The form is defined as a
list of `FieldConfig` objects in `builderFormSchema.ts`. The
`FormRenderer` reads the schema and looks up the renderer for each field
type in `fieldRegistry.ts`. Adding a field type requires a component + one
registry line. Adding a form field requires one schema entry — no JSX.

Supported field types: text, textarea, markdown, array, tags, links,
social, checkbox, select, color, icon (extensible).

### `services/pyodide.service.ts` — Pyodide Service

**Why:** The Python runtime is a long-lived singleton. A service keeps its
lifecycle separate from React rendering. The `usePyodide` hook adapts it to
React's lifecycle. The service fetches the original `generator.py` (served
from `public/`) and calls `generate_readme()` — the same function the
legacy app used. The generator logic is 100% preserved.

### `providers/` — Context Providers

- **ThemeProvider** — applies the current theme mode to `<html>`.
- **ToastProvider** — global toast notifications via `useToast()`.

### `hooks/usePyodide.ts` — React Hook

**Why:** Adapts the framework-agnostic pyodide service to React's reactive
lifecycle, exposing `ready`, `loading`, `error`, `init`, and `generate`.

### `constants/app.ts` — App Constants

**Why:** Centralizes nav links, builder steps, social platforms, skill
suggestions, and default values referenced across multiple modules.

## Performance

- **Code splitting:** Every page is `React.lazy` + `Suspense`. Only the
  current route's code is loaded.
- **Memoization:** Store slices are isolated so subscribers only re-render
  when their slice changes.
- **Virtualization-ready:** The form engine and template registry are
  data-driven, so virtual scrolling can be added to large lists without
  restructuring.

## Adding a New Template

1. Create `src/templates/definitions/myTemplate.ts` exporting a
   `TemplateDefinition`.
2. Import it in `src/templates/registry.ts` and add to
   `templateRegistry`.
3. Optionally add its category to `getTemplateCategories()`.

## Adding a New Form Field Type

1. Add the type to `FieldType` in `engine/form.types.ts`.
2. Create a renderer component in `engine/fields/`.
3. Register it in `engine/fieldRegistry.ts`.
4. Use it in a schema via `{ type: 'myType', ... }`.

## Preserved Legacy Logic

The original `generator.py` is untouched and served from `public/`. The
pyodide service loads it at runtime and calls `generate_readme()` with the
same JSON structure the legacy app used.
