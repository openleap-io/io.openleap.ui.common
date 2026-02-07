# @openleap-io/ui-common-library

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

## Components

| Group | Components |
|-------|------------|
| **Button** | `OlButton`, `OlIconButton`, `OlButtonGroup` |
| **Badge** | `OlBadge`, `OlStatusBadge`, `OlTag` |
| **Card** | `OlCard`, `OlCardHeader`, `OlCardContent`, `OlCardFooter` |
| **Input** | `OlInput`, `OlTextarea`, `OlSearchInput` |
| **Select** | `OlSelect` |
| **Checkbox** | `OlCheckbox`, `OlSwitch` |
| **Dialog** | `OlDialog`, `OlAlertDialog`, `OlSheet` |
| **Tooltip** | `OlTooltip`, `OlTooltipProvider` |
| **Dropdown** | `OlDropdown`, `OlContextMenu` |
| **Toast** | `OlToast`, `OlToastProvider` |
| **Tabs** | `OlTabs`, `OlTabList`, `OlTabTrigger`, `OlTabContent` |
| **Data Display** | `OlAccordion`, `OlAccordionItem`, `OlTree`, `OlTreeItem`, `OlDataTable`, `OlVirtualList` |
| **Layout** | `OlDivider`, `OlScrollArea`, `OlSplitPane` |
| **Avatar** | `OlAvatar`, `OlAvatarGroup` |
| **Navigation** | `OlBreadcrumb`, `OlSidebar`, `OlSidebarItem`, `OlSidebarGroup`, `OlCommandPalette` |
| **Typography** | `OlHeading`, `OlText`, `OlCode` |
| **Feedback** | `OlSkeleton`, `OlEmptyState`, `OlSpinner`, `OlErrorState`, `OlProgress` |

**53 components** across 17 groups.

## Composables

| Composable | Description |
|------------|-------------|
| `useToast` | Show success/error/warning/info toasts (requires `OlToastProvider`) |
| `useTheme` | Toggle light/dark/system theme with localStorage persistence |
| `useBreakpoints` | Reactive mobile/tablet/desktop breakpoint detection |
| `useKeyboardShortcut` | Register keyboard shortcuts (`mod+k`, `shift+p`, etc.) |
| `useClipboard` | Copy text to clipboard with `copied` indicator |
| `useMediaQuery` | Reactive `matchMedia` wrapper |
| `useDisclosure` | Simple open/close/toggle boolean state |
| `useFocusTrap` | Trap Tab focus within a container element |

## Consuming in a Nuxt 3 App

```bash
pnpm add @openleap-io/ui-common-library
```

```typescript
// nuxt.config.ts
export default defineNuxtConfig({
  modules: ['@openleap-io/ui-common-library/nuxt'],
  css: [
    '@openleap-io/ui-common-library/tokens/base.css',
    '@openleap-io/ui-common-library/tokens/telos.css',   // or elara.css
    '@openleap-io/ui-common-library/tokens/dark.css',
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
