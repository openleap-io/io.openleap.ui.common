# @openleap/ui

Shared Vue 3 component library for **Elara** and **Telos**.

Built on [Reka UI](https://reka-ui.com/) (headless primitives) + [Tailwind CSS 4](https://tailwindcss.com/) + [CVA](https://cva.style/) (variant management).

## Development

```bash
# Install dependencies
pnpm install

# Run Storybook (component playground)
pnpm dev

# Run tests
pnpm test

# Build library
pnpm build

# Type check
pnpm typecheck
```

## Components (Phase U1)

| Component | Description |
|-----------|-------------|
| `OlButton` | Button with 6 variants and 3 sizes |
| `OlIconButton` | Icon-only button with tooltip |
| `OlBadge` | Generic colored badge |
| `OlStatusBadge` | Domain-aware status indicator |
| `OlCard` | Card container (hoverable, clickable) |
| `OlCardHeader` | Card header with title/description/actions slots |
| `OlCardContent` | Card body |
| `OlCardFooter` | Card footer |
| `OlInput` | Text input with icon, error, clearable |
| `OlSkeleton` | Shimmer loading placeholder |
| `OlEmptyState` | No-data state with icon/title/description/action |
| `OlSpinner` | Loading spinner |

## Consuming in a Nuxt 3 App

```bash
pnpm add @openleap/ui
```

```typescript
// nuxt.config.ts
export default defineNuxtConfig({
  modules: ['@openleap/ui/nuxt'],
  css: [
    '@openleap/ui/tokens/base.css',
    '@openleap/ui/tokens/telos.css',   // or elara.css
    '@openleap/ui/tokens/dark.css',
  ],
})
```

All `Ol*` components are auto-imported. No explicit imports needed.

## Local Development with a Consuming App

```bash
# In openleap-ui:
pnpm build:watch

# In telos-frontend (or elara-frontend):
pnpm link ../io.openleap.ui.common
pnpm dev
```

## Releasing

```bash
pnpm changeset        # Create a changeset describing the change
pnpm changeset version # Bump version + update CHANGELOG
pnpm release           # Build + publish to GitHub Packages
```
