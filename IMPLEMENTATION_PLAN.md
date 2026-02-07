# @openleap-io/ui — Component Implementation Plan

> For use with Claude Code. Each batch is a self-contained prompt.
> Run `pnpm build && pnpm test` after each batch to verify.

---

## Current State

**Done (12 components):**
- `OlButton`, `OlIconButton` (src/components/button/)
- `OlBadge`, `OlStatusBadge` (src/components/badge/)
- `OlCard`, `OlCardHeader`, `OlCardContent`, `OlCardFooter` (src/components/card/)
- `OlInput` (src/components/input/)
- `OlSkeleton`, `OlEmptyState`, `OlSpinner` (src/components/feedback/)

**Done (infrastructure):**
- Vite library build (vite.config.ts)
- Vitest config (vitest.config.ts)
- Design tokens (src/tokens/base.css, dark.css, elara.css, telos.css)
- Tailwind preset (tailwind.preset.ts)
- Nuxt module (src/nuxt.ts)
- Utility: `cn()` (src/lib/cn.ts), shared types (src/lib/types.ts)
- Storybook setup (.storybook/main.ts, preview.ts)
- CI/CD (.github/workflows/ci.yml, release.yml)
- 8 passing tests (tests/components/OlButton.test.ts)

**Remaining: 40 components, 8 composables, ~106 tests, ~60 stories**

---

## Architecture Rules (For Every Batch)

Follow these rules for every component you create:

### File Structure
- Each component group gets its own directory: `src/components/{group}/`
- Each directory has a barrel `index.ts`
- Stories go in `stories/{ComponentName}.stories.ts`
- Tests go in `tests/components/{ComponentName}.test.ts`

### Component Conventions
- `<script setup lang="ts">` — Composition API only
- Import `cn` from `@/lib/cn` for class merging
- Import types from `@/lib/types`
- Use CVA (`class-variance-authority`) for variant/size props
- All styling via Tailwind utilities + CSS custom properties from tokens (`var(--ol-*)`)
- Props: `variant`, `size`, `disabled`, `loading` where applicable
- Always accept `class?: string` prop and merge with `cn()`
- Boolean props default to `false`
- Emit events with past-tense names: `@select`, `@remove`, `@change`
- Slots: use named slots (`#title`, `#actions`, `#icon`) for composition

### Reka UI Usage
- Import primitives from `reka-ui` (e.g., `DialogRoot`, `DialogTrigger`, `DialogContent`)
- Wrap in Ol-prefixed components with our styling
- Never expose Reka UI types directly — re-export through our own interfaces

### Registrations
After creating components in a batch:
1. Add exports to `src/index.ts`
2. Add `addComponent()` entries to `src/nuxt.ts`
3. Update `package.json` devDependencies if new deps needed

### Tests
- Use `vitest` + `@vue/test-utils`
- Import components from their source path (e.g., `../../src/components/button/OlButton.vue`)
- Test: rendering, props, slots, events, disabled/loading states, accessibility attributes
- Every interactive component: test keyboard accessibility

### Stories
- Use `@storybook/vue3` meta format
- Include: Default, AllVariants (if applicable), interactive states
- Import from `@/components/{group}`

---

## Batch 1: Form Controls

**Components to build:**

### OlTextarea (`src/components/input/OlTextarea.vue`)
- Props: `modelValue`, `placeholder`, `rows` (default 3), `autoResize`, `maxLength`, `error`, `disabled`, `class`
- Events: `update:modelValue`
- Auto-resize: if enabled, grow textarea height with content
- Show character count when `maxLength` is set
- Error styling matches OlInput pattern

### OlSearchInput (`src/components/input/OlSearchInput.vue`)
- Props: `modelValue`, `placeholder` (default "Search..."), `loading`, `debounceMs` (default 300), `class`
- Events: `update:modelValue`, `search` (debounced value)
- Leading Search icon (from lucide-vue-next), trailing clear button when value exists
- Spinner replaces search icon when `loading=true`
- Internal debounce: emit `search` event after `debounceMs` of inactivity

### OlSelect (`src/components/select/OlSelect.vue`)
- **Uses Reka UI**: `SelectRoot`, `SelectTrigger`, `SelectContent`, `SelectItem`, `SelectValue`, `SelectViewport`
- Props: `modelValue`, `options` (array of `{value: string, label: string, disabled?: boolean}`), `placeholder`, `disabled`, `error`, `class`
- Events: `update:modelValue`
- Styled trigger matching OlInput height/border pattern
- Popover content with scroll area for long lists

### OlCheckbox (`src/components/checkbox/OlCheckbox.vue`)
- **Uses Reka UI**: `CheckboxRoot`, `CheckboxIndicator`
- Props: `modelValue` (boolean), `label`, `indeterminate`, `disabled`, `class`
- Events: `update:modelValue`
- Check icon from lucide-vue-next, minus icon for indeterminate

### OlSwitch (`src/components/checkbox/OlSwitch.vue`)
- **Uses Reka UI**: `SwitchRoot`, `SwitchThumb`
- Props: `modelValue` (boolean), `label`, `disabled`, `class`
- Events: `update:modelValue`
- Smooth thumb animation via CSS transition

**Files to create:**
```
src/components/input/OlTextarea.vue
src/components/input/OlSearchInput.vue
src/components/select/OlSelect.vue
src/components/select/index.ts
src/components/checkbox/OlCheckbox.vue
src/components/checkbox/OlSwitch.vue
src/components/checkbox/index.ts
stories/OlTextarea.stories.ts
stories/OlSearchInput.stories.ts
stories/OlSelect.stories.ts
stories/OlCheckbox.stories.ts
stories/OlSwitch.stories.ts
tests/components/OlTextarea.test.ts
tests/components/OlSearchInput.test.ts
tests/components/OlSelect.test.ts
tests/components/OlCheckbox.test.ts
tests/components/OlSwitch.test.ts
```

**Files to update:**
- `src/components/input/index.ts` — add OlTextarea, OlSearchInput
- `src/index.ts` — add all new exports
- `src/nuxt.ts` — add all new components

**Verify:** `pnpm build && pnpm test`

---

## Batch 2: Overlays (Dialog, Sheet, Tooltip, AlertDialog)

**Components to build:**

### OlDialog (`src/components/dialog/OlDialog.vue`)
- **Uses Reka UI**: `DialogRoot`, `DialogTrigger`, `DialogPortal`, `DialogOverlay`, `DialogContent`, `DialogTitle`, `DialogDescription`, `DialogClose`
- Props: `open`, `title`, `description`, `size` ('sm' | 'md' | 'lg' | 'xl' | 'full'), `class`
- Events: `update:open`
- Slots: `#trigger` (optional), `#default` (body content), `#footer` (action buttons)
- Overlay: semi-transparent backdrop with blur
- Size controls max-width: sm=400px, md=500px, lg=640px, xl=780px, full=95vw
- Focus trap and Escape-to-close handled by Reka UI
- Animation: fade + scale-in via CSS

### OlAlertDialog (`src/components/dialog/OlAlertDialog.vue`)
- **Uses Reka UI**: `AlertDialogRoot`, `AlertDialogTrigger`, `AlertDialogPortal`, `AlertDialogOverlay`, `AlertDialogContent`, `AlertDialogTitle`, `AlertDialogDescription`, `AlertDialogAction`, `AlertDialogCancel`
- Props: `open`, `title`, `description`, `confirmLabel` (default "Confirm"), `cancelLabel` (default "Cancel"), `variant` ('danger' | 'warning'), `class`
- Events: `update:open`, `confirm`, `cancel`
- Danger variant: red confirm button. Warning variant: amber confirm button.

### OlSheet (`src/components/dialog/OlSheet.vue`)
- **Uses Reka UI**: `DialogRoot`, `DialogPortal`, `DialogOverlay`, `DialogContent`, `DialogTitle`, `DialogClose`
- Props: `open`, `title`, `side` ('left' | 'right'), `size` ('sm' | 'md' | 'lg'), `class`
- Events: `update:open`
- Slots: `#default` (content)
- Slide-in animation from the specified side
- Size controls width: sm=320px, md=400px, lg=540px

### OlTooltip (`src/components/tooltip/OlTooltip.vue`)
- **Uses Reka UI**: `TooltipRoot`, `TooltipTrigger`, `TooltipPortal`, `TooltipContent`, `TooltipArrow`, `TooltipProvider`
- Props: `content` (string), `side` ('top' | 'right' | 'bottom' | 'left', default 'top'), `delayMs` (default 300), `class`
- Slots: `#default` (trigger element)
- Arrow pointing toward trigger
- Note: Consumers must wrap app in `<TooltipProvider>` from reka-ui, OR we provide `OlTooltipProvider`

**Files to create:**
```
src/components/dialog/OlDialog.vue
src/components/dialog/OlAlertDialog.vue
src/components/dialog/OlSheet.vue
src/components/dialog/index.ts
src/components/tooltip/OlTooltip.vue
src/components/tooltip/OlTooltipProvider.vue
src/components/tooltip/index.ts
stories/OlDialog.stories.ts
stories/OlAlertDialog.stories.ts
stories/OlSheet.stories.ts
stories/OlTooltip.stories.ts
tests/components/OlDialog.test.ts
tests/components/OlAlertDialog.test.ts
tests/components/OlSheet.test.ts
tests/components/OlTooltip.test.ts
```

**Files to update:** `src/index.ts`, `src/nuxt.ts`

**Verify:** `pnpm build && pnpm test`

---

## Batch 3: Dropdown, Context Menu, Toast System

**Components to build:**

### OlDropdown (`src/components/dropdown/OlDropdown.vue`)
- **Uses Reka UI**: `DropdownMenuRoot`, `DropdownMenuTrigger`, `DropdownMenuPortal`, `DropdownMenuContent`, `DropdownMenuItem`, `DropdownMenuSeparator`, `DropdownMenuLabel`
- Props: `items` (MenuItem[]), `align` ('start' | 'center' | 'end', default 'start'), `class`
- Slots: `#trigger` (required)
- Each item: icon (optional), label, shortcut (optional), disabled, separator
- Keyboard: arrow keys navigate, Enter selects, Escape closes

### OlContextMenu (`src/components/dropdown/OlContextMenu.vue`)
- **Uses Reka UI**: `ContextMenuRoot`, `ContextMenuTrigger`, `ContextMenuPortal`, `ContextMenuContent`, `ContextMenuItem`, `ContextMenuSeparator`
- Props: `items` (MenuItem[]), `class`
- Slots: `#default` (the area that triggers on right-click)
- Same item rendering as OlDropdown

### OlToast (`src/components/toast/OlToast.vue`)
- Props: `type` (ToastType), `title`, `description`, `duration` (ms, default 5000), `class`
- Events: `close`
- Icon per type: success=CheckCircle, error=XCircle, warning=AlertTriangle, info=Info (lucide)
- Close button (X) top-right
- Progress bar showing remaining time
- Swipe-to-dismiss (CSS animation)

### OlToastProvider (`src/components/toast/OlToastProvider.vue`)
- Props: `position` ('top-right' | 'top-left' | 'bottom-right' | 'bottom-left', default 'bottom-right'), `maxVisible` (default 5)
- Uses `provide`/`inject` to create a toast context
- Renders toast stack with enter/exit animations
- Newest toast appears at bottom of stack (or top, depending on position)

**Files to create:**
```
src/components/dropdown/OlDropdown.vue
src/components/dropdown/OlContextMenu.vue
src/components/dropdown/index.ts
src/components/toast/OlToast.vue
src/components/toast/OlToastProvider.vue
src/components/toast/index.ts
stories/OlDropdown.stories.ts
stories/OlContextMenu.stories.ts
stories/OlToast.stories.ts
tests/components/OlDropdown.test.ts
tests/components/OlContextMenu.test.ts
tests/components/OlToast.test.ts
```

**Files to update:** `src/index.ts`, `src/nuxt.ts`

**Verify:** `pnpm build && pnpm test`

---

## Batch 4: Tabs, Accordion, Tag, Divider, ScrollArea

**Components to build:**

### OlTabs (`src/components/tabs/OlTabs.vue`)
- **Uses Reka UI**: `TabsRoot`, `TabsList`, `TabsTrigger`, `TabsContent`
- Compound component pattern — export: `OlTabs`, `OlTabList`, `OlTabTrigger`, `OlTabContent`
- OlTabs props: `modelValue` (active tab value), `class`
- OlTabTrigger props: `value`, `disabled`, `class`
- OlTabContent props: `value`, `class`
- Underline-style active indicator with smooth transition

### OlAccordion (`src/components/data-display/OlAccordion.vue`)
- **Uses Reka UI**: `AccordionRoot`, `AccordionItem`, `AccordionHeader`, `AccordionTrigger`, `AccordionContent`
- Props: `type` ('single' | 'multiple', default 'single'), `defaultValue`, `class`
- Slots: use nested `OlAccordionItem` children
- ChevronDown icon rotates on expand

### OlTag (`src/components/badge/OlTag.vue`)
- Props: `label`, `color` (optional Tailwind color class), `removable` (default false), `class`
- Events: `remove`
- X button appears when removable, with hover highlight
- Rounded pill shape, slightly smaller than OlBadge

### OlDivider (`src/components/layout/OlDivider.vue`)
- Props: `orientation` ('horizontal' | 'vertical', default 'horizontal'), `label` (optional text in the middle), `class`
- Horizontal: full-width 1px line. Vertical: full-height 1px line.
- If label provided: line—text—line pattern with centered text

### OlScrollArea (`src/components/layout/OlScrollArea.vue`)
- **Uses Reka UI**: `ScrollAreaRoot`, `ScrollAreaViewport`, `ScrollAreaScrollbar`, `ScrollAreaThumb`
- Props: `orientation` ('vertical' | 'horizontal' | 'both', default 'vertical'), `class`
- Custom styled scrollbar (thin, rounded, semi-transparent)

**Files to create:**
```
src/components/tabs/OlTabs.vue
src/components/tabs/OlTabList.vue
src/components/tabs/OlTabTrigger.vue
src/components/tabs/OlTabContent.vue
src/components/tabs/index.ts
src/components/data-display/OlAccordion.vue
src/components/data-display/index.ts
src/components/layout/OlDivider.vue
src/components/layout/OlScrollArea.vue
src/components/layout/index.ts
stories/OlTabs.stories.ts
stories/OlAccordion.stories.ts
stories/OlTag.stories.ts
stories/OlDivider.stories.ts
stories/OlScrollArea.stories.ts
tests/components/OlTabs.test.ts
tests/components/OlAccordion.test.ts
tests/components/OlTag.test.ts
tests/components/OlDivider.test.ts
```

**Files to update:**
- `src/components/badge/index.ts` — add OlTag
- `src/index.ts`, `src/nuxt.ts`

**Verify:** `pnpm build && pnpm test`

---

## Batch 5: Avatar, Breadcrumb, Sidebar Navigation

**Components to build:**

### OlAvatar (`src/components/avatar/OlAvatar.vue`)
- Props: `src` (image URL, optional), `name` (for fallback initials), `size` ('sm' | 'md' | 'lg'), `class`
- Fallback: if no `src` or image fails to load, show first two initials of `name` on colored background
- Background color derived from name string (hash → hue rotation)

### OlAvatarGroup (`src/components/avatar/OlAvatarGroup.vue`)
- Props: `max` (number, default 3), `size` ('sm' | 'md' | 'lg'), `class`
- Slots: accepts OlAvatar children
- Shows first `max` avatars overlapping, then "+N" counter badge for the rest

### OlBreadcrumb (`src/components/navigation/OlBreadcrumb.vue`)
- Props: `items` (BreadcrumbItem[]), `separator` (string, default '/'), `class`
- Each item: label, optional icon, optional `to` (makes it a link/NuxtLink)
- Last item is plain text (current page), all others are clickable
- Use `<a>` tags (not NuxtLink) since the library is framework-agnostic. Consumers can wrap with NuxtLink in their apps.

### OlSidebar (`src/components/navigation/OlSidebar.vue`)
- Props: `collapsed` (boolean, default false), `width` (string, default '240px'), `collapsedWidth` (string, default '56px'), `class`
- Events: `update:collapsed`
- Slots: `#header`, `#default` (navigation items), `#footer`
- Smooth width transition on collapse/expand
- When collapsed: show only icons, tooltips on hover

### OlSidebarItem (`src/components/navigation/OlSidebarItem.vue`)
- Props: `icon` (IconComponent), `label`, `to` (optional), `active` (boolean), `badge` (string | number, optional), `class`
- Renders as `<a>` if `to` is provided, otherwise `<button>`
- Active state: highlighted background, bold text
- When sidebar collapsed: show only icon centered, tooltip with label

### OlSidebarGroup (`src/components/navigation/OlSidebarGroup.vue`)
- Props: `label`, `collapsible` (default false), `class`
- Slots: `#default` (OlSidebarItem children)
- Group label as muted uppercase text
- If collapsible: chevron toggle, animated collapse

**Files to create:**
```
src/components/avatar/OlAvatar.vue
src/components/avatar/OlAvatarGroup.vue
src/components/avatar/index.ts
src/components/navigation/OlBreadcrumb.vue
src/components/navigation/OlSidebar.vue
src/components/navigation/OlSidebarItem.vue
src/components/navigation/OlSidebarGroup.vue
src/components/navigation/index.ts
stories/OlAvatar.stories.ts
stories/OlBreadcrumb.stories.ts
stories/OlSidebar.stories.ts
tests/components/OlAvatar.test.ts
tests/components/OlBreadcrumb.test.ts
tests/components/OlSidebar.test.ts
```

**Files to update:** `src/index.ts`, `src/nuxt.ts`

**Verify:** `pnpm build && pnpm test`

---

## Batch 6: Data Display — Tree, DataTable, VirtualList

These are the most complex components. Build them carefully.

**Components to build:**

### OlTree (`src/components/data-display/OlTree.vue`)
- Props: `items` (TreeNode[]), `expandedKeys` (string[]), `selectedKey` (string, optional), `selectable` (boolean, default true), `class`
- Events: `update:expandedKeys`, `update:selectedKey`, `select` (node)
- TreeNode type: `{ id: string, label: string, icon?: IconComponent, children?: TreeNode[], disabled?: boolean }`
- Recursive rendering via `OlTreeItem`
- Keyboard: ArrowDown/Up to navigate, ArrowRight to expand, ArrowLeft to collapse, Enter to select
- Indentation: 16px per level

### OlTreeItem (`src/components/data-display/OlTreeItem.vue`)
- Props: `item` (TreeNode), `level` (number), `expanded` (boolean), `selected` (boolean)
- Events: `toggle`, `select`
- Chevron icon (collapsed/expanded), item icon, label
- Hover highlight, selected highlight

### OlDataTable (`src/components/data-display/OlDataTable.vue`)
- **External dep:** Add `@tanstack/vue-table` to devDependencies and peerDependencies
- Props: `columns` (ColumnDef[]), `data` (any[]), `sorting` (boolean, default false), `pagination` (boolean, default false), `pageSize` (number, default 10), `loading` (boolean), `emptyMessage` (string), `class`
- Events: `rowClick` (row)
- Uses TanStack Table for core logic (sorting state, pagination state)
- Header cells: click to sort (if sorting enabled), sort direction indicator
- Pagination footer: "Page 1 of 5", Previous/Next buttons
- Loading state: show OlSkeleton rows
- Empty state: show OlEmptyState

### OlVirtualList (`src/components/data-display/OlVirtualList.vue`)
- Simple virtual scroll implementation (no external dep needed for basic version)
- Props: `items` (any[]), `itemHeight` (number), `overscan` (number, default 5), `class`
- Slots: `#item` (scoped slot with `{ item, index }`)
- Only renders visible items + overscan buffer
- Uses `position: absolute` + `transform: translateY()` for positioning

**Add to package.json peerDependencies:**
```json
"@tanstack/vue-table": "^8.0.0"
```
**Add to package.json devDependencies:**
```json
"@tanstack/vue-table": "^8.20.0"
```

**Files to create:**
```
src/components/data-display/OlTree.vue
src/components/data-display/OlTreeItem.vue
src/components/data-display/OlDataTable.vue
src/components/data-display/OlVirtualList.vue
stories/OlTree.stories.ts
stories/OlDataTable.stories.ts
stories/OlVirtualList.stories.ts
tests/components/OlTree.test.ts
tests/components/OlDataTable.test.ts
tests/components/OlVirtualList.test.ts
```

**Files to update:**
- `src/components/data-display/index.ts` — add new exports
- `src/index.ts`, `src/nuxt.ts`
- `package.json` — add @tanstack/vue-table
- `vite.config.ts` — add `@tanstack/vue-table` to rollupOptions.external

**Verify:** `pnpm install && pnpm build && pnpm test`

---

## Batch 7: CommandPalette, SplitPane, ErrorState, Progress

**Components to build:**

### OlCommandPalette (`src/components/navigation/OlCommandPalette.vue`)
- **Uses Reka UI**: `ComboboxRoot`, `ComboboxInput`, `ComboboxContent`, `ComboboxItem`, `ComboboxEmpty`, `DialogRoot`, `DialogContent`, `DialogOverlay`
- Props: `open`, `groups` (CommandGroup[]), `placeholder` (default "Type a command or search..."), `class`
- Events: `update:open`, `select` (MenuItem)
- CommandGroup type already defined in `src/lib/types.ts`
- Fuzzy filter: filter items by typed text across all groups
- Keyboard: Cmd+K to open (handled by consumer), arrow keys to navigate, Enter to select, Escape to close
- Visual: full-width search input at top, grouped results below with headings, keyboard shortcut hints right-aligned

### OlSplitPane (`src/components/layout/OlSplitPane.vue`)
- **External dep:** Add `splitpanes` to dependencies
- Props: `direction` ('horizontal' | 'vertical', default 'horizontal'), `class`
- Slots: named pane slots via `#pane-0`, `#pane-1`, `#pane-2` etc.
- Wrapper around `splitpanes` library with our styling
- Resizer handle: thin gray line that highlights on hover
- Persists sizes to localStorage (optional)

### OlErrorState (`src/components/feedback/OlErrorState.vue`)
- Props: `title` (default "Something went wrong"), `description`, `class`
- Events: `retry`
- Slots: `#action` (override default retry button)
- AlertTriangle icon (lucide), title, description, "Try again" button

### OlProgress (`src/components/feedback/OlProgress.vue`)
- Props: `value` (0-100), `variant` ('default' | 'success' | 'warning' | 'error'), `showLabel` (boolean, default false), `class`
- Animated fill bar with color per variant
- Label shows percentage text when `showLabel=true`
- Indeterminate mode: if `value` is undefined, show animated shimmer

**Add to package.json dependencies:**
```json
"splitpanes": "^3.1.5"
```

**Files to create:**
```
src/components/navigation/OlCommandPalette.vue
src/components/layout/OlSplitPane.vue
src/components/feedback/OlErrorState.vue
src/components/feedback/OlProgress.vue
stories/OlCommandPalette.stories.ts
stories/OlSplitPane.stories.ts
stories/OlErrorState.stories.ts
stories/OlProgress.stories.ts
tests/components/OlCommandPalette.test.ts
tests/components/OlSplitPane.test.ts
tests/components/OlErrorState.test.ts
tests/components/OlProgress.test.ts
```

**Files to update:**
- `src/components/feedback/index.ts` — add OlErrorState, OlProgress
- `src/components/layout/index.ts` — add OlSplitPane
- `src/index.ts`, `src/nuxt.ts`
- `package.json` — add splitpanes
- `vite.config.ts` — add `splitpanes` to rollupOptions.external

**Verify:** `pnpm install && pnpm build && pnpm test`

---

## Batch 8: Typography + ButtonGroup

**Components to build:**

### OlHeading (`src/components/typography/OlHeading.vue`)
- Props: `level` (1 | 2 | 3 | 4 | 5 | 6, default 2), `class`
- Renders the correct `<h1>`..`<h6>` element
- Default size mapping: h1=text-3xl, h2=text-2xl, h3=text-xl, h4=text-lg, h5=text-base, h6=text-sm
- All: font-semibold, text-[var(--ol-text-primary)], tracking-tight

### OlText (`src/components/typography/OlText.vue`)
- Props: `size` ('xs' | 'sm' | 'base' | 'lg', default 'base'), `weight` ('normal' | 'medium' | 'semibold', default 'normal'), `color` ('primary' | 'secondary' | 'muted', default 'primary'), `as` ('p' | 'span' | 'div', default 'p'), `class`
- Color maps to text-[var(--ol-text-{color})]

### OlCode (`src/components/typography/OlCode.vue`)
- Props: `inline` (boolean, default true), `copyable` (boolean, default false), `class`
- Inline: `<code>` with rounded bg, mono font, smaller text
- Block (inline=false): `<pre><code>` with padding, rounded, overflow-x-auto
- If copyable: copy button (top-right for block, hidden for inline)

### OlButtonGroup (`src/components/button/OlButtonGroup.vue`)
- Props: `orientation` ('horizontal' | 'vertical', default 'horizontal'), `class`
- Slots: `#default` (OlButton children)
- Joins buttons visually: removes inter-button border-radius, adds divider between
- Horizontal: first has rounded-l, last has rounded-r, middle has rounded-none
- Vertical: first has rounded-t, last has rounded-b

**Files to create:**
```
src/components/typography/OlHeading.vue
src/components/typography/OlText.vue
src/components/typography/OlCode.vue
src/components/typography/index.ts
src/components/button/OlButtonGroup.vue
stories/OlTypography.stories.ts
stories/OlButtonGroup.stories.ts
tests/components/OlHeading.test.ts
tests/components/OlText.test.ts
tests/components/OlCode.test.ts
tests/components/OlButtonGroup.test.ts
```

**Files to update:**
- `src/components/button/index.ts` — add OlButtonGroup
- `src/index.ts`, `src/nuxt.ts`

**Verify:** `pnpm build && pnpm test`

---

## Batch 9: Composables

**Composables to build:**

All composables go in `src/composables/`. Each must be SSR-safe (guard browser APIs with `onMounted`).

### useToast (`src/composables/useToast.ts`)
- Returns: `{ toast, toasts, remove }`
- `toast.success(title, options?)`, `toast.error(...)`, `toast.warning(...)`, `toast.info(...)`
- Options: `{ description?, duration? }`
- Uses `provide`/`inject` to communicate with `OlToastProvider`
- Each toast gets a unique ID, auto-removed after duration

### useTheme (`src/composables/useTheme.ts`)
- Returns: `{ theme, isDark, toggleTheme, setTheme }`
- `theme`: reactive ref — `'light' | 'dark' | 'system'`
- `isDark`: computed — resolves 'system' via `matchMedia`
- Reads/writes `localStorage('ol-theme')`
- Toggles `class="dark"` on `document.documentElement`
- SSR-safe: default to 'system', apply on mount

### useBreakpoints (`src/composables/useBreakpoints.ts`)
- Returns: `{ isMobile, isTablet, isDesktop, current }`
- Breakpoints: mobile < 768px, tablet 768–1024px, desktop > 1024px
- Uses `matchMedia` listeners, reactive
- SSR-safe: default to 'desktop'

### useKeyboardShortcut (`src/composables/useKeyboardShortcut.ts`)
- Signature: `useKeyboardShortcut(shortcut: string, handler: () => void, options?: { enabled?: Ref<boolean> })`
- Shortcut format: `'mod+k'` (mod = Cmd on Mac, Ctrl elsewhere), `'mod+shift+p'`, `'escape'`
- Registers `keydown` listener on mount, removes on unmount
- Ignores when focus is in input/textarea/contenteditable (unless overridden)

### useClipboard (`src/composables/useClipboard.ts`)
- Returns: `{ copy, copied }`
- `copy(text: string)`: writes to clipboard, sets `copied` to true for 2 seconds
- SSR-safe: no-op if `navigator.clipboard` unavailable

### useMediaQuery (`src/composables/useMediaQuery.ts`)
- Signature: `useMediaQuery(query: string): Ref<boolean>`
- Wraps `window.matchMedia`, returns reactive boolean
- SSR-safe: default false

### useDisclosure (`src/composables/useDisclosure.ts`)
- Returns: `{ isOpen, open, close, toggle }`
- Simple reactive boolean state manager
- No browser APIs needed — works in SSR

### useFocusTrap (`src/composables/useFocusTrap.ts`)
- Signature: `useFocusTrap(containerRef: Ref<HTMLElement | null>)`
- Traps Tab/Shift+Tab focus within the container
- Activates on mount when container exists, deactivates on unmount
- Note: Reka UI Dialog/Sheet already handle focus trap internally, so this is for custom use cases

**Files to create:**
```
src/composables/useToast.ts
src/composables/useTheme.ts
src/composables/useBreakpoints.ts
src/composables/useKeyboardShortcut.ts
src/composables/useClipboard.ts
src/composables/useMediaQuery.ts
src/composables/useDisclosure.ts
src/composables/useFocusTrap.ts
src/composables/index.ts
tests/composables/useToast.test.ts
tests/composables/useTheme.test.ts
tests/composables/useBreakpoints.test.ts
tests/composables/useKeyboardShortcut.test.ts
tests/composables/useClipboard.test.ts
tests/composables/useDisclosure.test.ts
```

**Files to update:**
- `src/index.ts` — add all composable exports
- `src/nuxt.ts` — uncomment and populate addImports with all composable names

**Verify:** `pnpm build && pnpm test`

---

## Batch 10: Final Integration & Polish

This is not about building new components — it's about verifying everything works together.

**Tasks:**

### 1. Full export audit
- Read `src/index.ts` and verify every component and composable is exported
- Read `src/nuxt.ts` and verify every component is registered for auto-import, every composable is in addImports
- Count: should be 52 components + 8 composables

### 2. Update package.json
- Verify all peerDependencies are listed: `vue`, `reka-ui`, `lucide-vue-next`, `tailwindcss`, `@tanstack/vue-table`
- Verify all runtime dependencies: `class-variance-authority`, `clsx`, `tailwind-merge`, `splitpanes`
- Verify vite.config.ts externals match all peer deps

### 3. Type check
- Run `pnpm typecheck` and fix all errors
- Ensure all components have proper prop types

### 4. Build verification
- Run `pnpm build`
- Verify `dist/index.mjs` contains all exports
- Verify `dist/nuxt.mjs` registers all components
- Verify `dist/tokens/` contains all 4 CSS files

### 5. Test coverage check
- Run `pnpm test`
- Verify all tests pass
- Print test count — target: ~114 tests

### 6. Missing story audit
- Verify every component group has at least one story
- Run `pnpm dev` (Storybook) and manually check all stories render

### 7. README update
- Update component table in README.md with all 52 components
- Update composable list

### 8. Changeset + version bump
- Run `pnpm changeset` — create changeset "feat: complete component library v1.0"
- Run `pnpm changeset version` — bump to 1.0.0
- Commit and push

---

## Summary

| Batch | Components | Tests | Key Dependencies |
|-------|-----------|-------|-----------------|
| **Done** | 12 | 8 | — |
| **1: Form Controls** | +5 (17) | +15 (23) | reka-ui (Select, Checkbox, Switch) |
| **2: Overlays** | +5 (22) | +12 (35) | reka-ui (Dialog, AlertDialog, Sheet, Tooltip) |
| **3: Dropdown + Toast** | +4 (26) | +9 (44) | reka-ui (DropdownMenu, ContextMenu) |
| **4: Tabs + Layout** | +7 (33) | +12 (56) | reka-ui (Tabs, Accordion, ScrollArea) |
| **5: Avatar + Nav** | +6 (39) | +9 (65) | — |
| **6: Data Display** | +4 (43) | +12 (77) | @tanstack/vue-table |
| **7: CommandPalette + SplitPane** | +4 (47) | +12 (89) | splitpanes, reka-ui (Combobox) |
| **8: Typography + ButtonGroup** | +5 (52) | +10 (99) | — |
| **9: Composables** | +8 composables | +15 (114) | — |
| **10: Polish** | — | — | — |
| **Total** | **52 components + 8 composables** | **~114 tests** | |

**Prompt template for Claude Code:**

```
Read the implementation plan at IMPLEMENTATION_PLAN.md, then execute Batch N.

Follow the architecture rules in the plan. After creating all files:
1. Update src/index.ts with new exports
2. Update src/nuxt.ts with new component registrations
3. Run: pnpm build && pnpm test
4. Fix any errors

Reference existing components (e.g., src/components/button/OlButton.vue) for
style conventions, cn() usage, and CVA patterns.
```
