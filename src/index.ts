// =============================================================================
// @openleap/ui — Public API
// =============================================================================

// ── Components: Button ──
export { OlButton, OlIconButton, OlButtonGroup } from './components/button'

// ── Components: Badge ──
export { OlBadge, OlStatusBadge, OlTag } from './components/badge'

// ── Components: Card ──
export { OlCard, OlCardHeader, OlCardContent, OlCardFooter } from './components/card'

// ── Components: Input ──
export { OlInput, OlTextarea, OlSearchInput } from './components/input'

// ── Components: Select ──
export { OlSelect } from './components/select'
export type { SelectOption } from './components/select'

// ── Components: Checkbox ──
export { OlCheckbox, OlSwitch } from './components/checkbox'

// ── Components: Dialog ──
export { OlDialog, OlAlertDialog, OlSheet } from './components/dialog'

// ── Components: Tooltip ──
export { OlTooltip, OlTooltipProvider } from './components/tooltip'

// ── Components: Dropdown ──
export { OlDropdown, OlContextMenu } from './components/dropdown'

// ── Components: Toast ──
export { OlToast, OlToastProvider } from './components/toast'
export type { ToastItem, ToastContext } from './components/toast'

// ── Components: Tabs ──
export { OlTabs, OlTabList, OlTabTrigger, OlTabContent } from './components/tabs'

// ── Components: Data Display ──
export { OlAccordion, OlAccordionItem, OlTree, OlTreeItem, OlDataTable, OlVirtualList } from './components/data-display'

// ── Components: Layout ──
export { OlDivider, OlScrollArea, OlSplitPane } from './components/layout'

// ── Components: Avatar ──
export { OlAvatar, OlAvatarGroup } from './components/avatar'

// ── Components: Navigation ──
export { OlBreadcrumb, OlSidebar, OlSidebarItem, OlSidebarGroup, OlCommandPalette } from './components/navigation'

// ── Components: Typography ──
export { OlHeading, OlText, OlCode } from './components/typography'

// ── Components: Feedback ──
export { OlSkeleton, OlEmptyState, OlSpinner, OlErrorState, OlProgress } from './components/feedback'

// ── Composables ──
export { useToast } from './composables'
export { useTheme } from './composables'
export type { Theme } from './composables'
export { useBreakpoints } from './composables'
export type { Breakpoint } from './composables'
export { useKeyboardShortcut } from './composables'
export { useClipboard } from './composables'
export { useMediaQuery } from './composables'
export { useDisclosure } from './composables'
export { useFocusTrap } from './composables'

// ── Utilities ──
export { cn } from './lib/cn'

// ── Types ──
export type {
  Size,
  Variant,
  Status,
  Orientation,
  Side,
  ToastType,
  IconComponent,
  MenuItem,
  NavItem,
  BreadcrumbItem,
  TreeNode,
  CommandGroup,
} from './lib/types'
