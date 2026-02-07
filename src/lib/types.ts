import type { Component } from 'vue'

/** Standard size scale for all components */
export type Size = 'sm' | 'md' | 'lg'

/** Button/Badge visual variants */
export type Variant = 'default' | 'secondary' | 'outline' | 'ghost' | 'link' | 'destructive'

/** Domain-aware status values used in OlStatusBadge and elsewhere */
export type Status =
  | 'active'
  | 'planned'
  | 'development'
  | 'deprecated'
  | 'retired'
  | 'error'
  | 'warning'
  | 'info'
  | 'draft'

/** Orientation for dividers, button groups, etc. */
export type Orientation = 'horizontal' | 'vertical'

/** Side/position for sheets, tooltips, popovers */
export type Side = 'top' | 'right' | 'bottom' | 'left'

/** Toast notification types */
export type ToastType = 'success' | 'error' | 'warning' | 'info'

/** Icon prop type — accepts a Lucide icon component */
export type IconComponent = Component

/** Generic item for dropdowns, commands, navigation */
export interface MenuItem {
  id: string
  label: string
  icon?: IconComponent
  shortcut?: string
  disabled?: boolean
  separator?: boolean
  action?: () => void
}

/** Sidebar navigation item */
export interface NavItem {
  id: string
  label: string
  icon?: IconComponent
  to?: string
  badge?: string | number
  active?: boolean
  children?: NavItem[]
}

/** Breadcrumb segment */
export interface BreadcrumbItem {
  label: string
  to?: string
  icon?: IconComponent
}

/** Tree node for OlTree */
export interface TreeNode {
  id: string
  label: string
  icon?: IconComponent
  children?: TreeNode[]
  disabled?: boolean
}

/** Command palette group */
export interface CommandGroup {
  heading: string
  items: MenuItem[]
}
