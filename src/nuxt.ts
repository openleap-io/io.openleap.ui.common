import { defineNuxtModule, addComponent, addImports, createResolver } from '@nuxt/kit'

export default defineNuxtModule({
  meta: {
    name: '@openleap-io/ui-common-library',
    configKey: 'openleapUi',
    compatibility: { nuxt: '>=3.0.0' },
  },

  defaults: {
    prefix: 'Ol',
  },

  setup(_options: Record<string, unknown>, _nuxt: unknown) {
    const { resolve } = createResolver(import.meta.url)

    // ── Auto-register components ──
    const components = [
      // Button
      { name: 'OlButton',       filePath: resolve('./components/button/OlButton.vue') },
      { name: 'OlIconButton',   filePath: resolve('./components/button/OlIconButton.vue') },
      { name: 'OlButtonGroup',  filePath: resolve('./components/button/OlButtonGroup.vue') },
      // Badge
      { name: 'OlBadge',       filePath: resolve('./components/badge/OlBadge.vue') },
      { name: 'OlStatusBadge', filePath: resolve('./components/badge/OlStatusBadge.vue') },
      // Card
      { name: 'OlCard',        filePath: resolve('./components/card/OlCard.vue') },
      { name: 'OlCardHeader',  filePath: resolve('./components/card/OlCardHeader.vue') },
      { name: 'OlCardContent', filePath: resolve('./components/card/OlCardContent.vue') },
      { name: 'OlCardFooter',  filePath: resolve('./components/card/OlCardFooter.vue') },
      // Input
      { name: 'OlInput',       filePath: resolve('./components/input/OlInput.vue') },
      { name: 'OlTextarea',    filePath: resolve('./components/input/OlTextarea.vue') },
      { name: 'OlSearchInput', filePath: resolve('./components/input/OlSearchInput.vue') },
      // Select
      { name: 'OlSelect',      filePath: resolve('./components/select/OlSelect.vue') },
      // Checkbox
      { name: 'OlCheckbox',    filePath: resolve('./components/checkbox/OlCheckbox.vue') },
      { name: 'OlSwitch',      filePath: resolve('./components/checkbox/OlSwitch.vue') },
      // Dialog
      { name: 'OlDialog',          filePath: resolve('./components/dialog/OlDialog.vue') },
      { name: 'OlAlertDialog',     filePath: resolve('./components/dialog/OlAlertDialog.vue') },
      { name: 'OlSheet',           filePath: resolve('./components/dialog/OlSheet.vue') },
      // Tooltip
      { name: 'OlTooltip',         filePath: resolve('./components/tooltip/OlTooltip.vue') },
      { name: 'OlTooltipProvider', filePath: resolve('./components/tooltip/OlTooltipProvider.vue') },
      // Dropdown
      { name: 'OlDropdown',       filePath: resolve('./components/dropdown/OlDropdown.vue') },
      { name: 'OlContextMenu',    filePath: resolve('./components/dropdown/OlContextMenu.vue') },
      // Toast
      { name: 'OlToast',          filePath: resolve('./components/toast/OlToast.vue') },
      { name: 'OlToastProvider',  filePath: resolve('./components/toast/OlToastProvider.vue') },
      // Tabs
      { name: 'OlTabs',           filePath: resolve('./components/tabs/OlTabs.vue') },
      { name: 'OlTabList',        filePath: resolve('./components/tabs/OlTabList.vue') },
      { name: 'OlTabTrigger',     filePath: resolve('./components/tabs/OlTabTrigger.vue') },
      { name: 'OlTabContent',     filePath: resolve('./components/tabs/OlTabContent.vue') },
      // Data Display
      { name: 'OlAccordion',      filePath: resolve('./components/data-display/OlAccordion.vue') },
      { name: 'OlAccordionItem',  filePath: resolve('./components/data-display/OlAccordionItem.vue') },
      { name: 'OlTree',           filePath: resolve('./components/data-display/OlTree.vue') },
      { name: 'OlTreeItem',       filePath: resolve('./components/data-display/OlTreeItem.vue') },
      { name: 'OlDataTable',      filePath: resolve('./components/data-display/OlDataTable.vue') },
      { name: 'OlVirtualList',    filePath: resolve('./components/data-display/OlVirtualList.vue') },
      // Badge (OlTag)
      { name: 'OlTag',            filePath: resolve('./components/badge/OlTag.vue') },
      // Layout
      { name: 'OlDivider',        filePath: resolve('./components/layout/OlDivider.vue') },
      { name: 'OlScrollArea',     filePath: resolve('./components/layout/OlScrollArea.vue') },
      { name: 'OlSplitPane',      filePath: resolve('./components/layout/OlSplitPane.vue') },
      // Avatar
      { name: 'OlAvatar',        filePath: resolve('./components/avatar/OlAvatar.vue') },
      { name: 'OlAvatarGroup',   filePath: resolve('./components/avatar/OlAvatarGroup.vue') },
      // Navigation
      { name: 'OlBreadcrumb',      filePath: resolve('./components/navigation/OlBreadcrumb.vue') },
      { name: 'OlSidebar',         filePath: resolve('./components/navigation/OlSidebar.vue') },
      { name: 'OlSidebarItem',     filePath: resolve('./components/navigation/OlSidebarItem.vue') },
      { name: 'OlSidebarGroup',    filePath: resolve('./components/navigation/OlSidebarGroup.vue') },
      { name: 'OlCommandPalette',  filePath: resolve('./components/navigation/OlCommandPalette.vue') },
      // Typography
      { name: 'OlHeading',     filePath: resolve('./components/typography/OlHeading.vue') },
      { name: 'OlText',        filePath: resolve('./components/typography/OlText.vue') },
      { name: 'OlCode',        filePath: resolve('./components/typography/OlCode.vue') },
      // Feedback
      { name: 'OlSkeleton',    filePath: resolve('./components/feedback/OlSkeleton.vue') },
      { name: 'OlEmptyState',  filePath: resolve('./components/feedback/OlEmptyState.vue') },
      { name: 'OlSpinner',     filePath: resolve('./components/feedback/OlSpinner.vue') },
      { name: 'OlErrorState',  filePath: resolve('./components/feedback/OlErrorState.vue') },
      { name: 'OlProgress',    filePath: resolve('./components/feedback/OlProgress.vue') },
    ]

    for (const comp of components) {
      addComponent(comp)
    }

    // ── Auto-import composables ──
    addImports([
      { name: 'useToast',            from: '@openleap-io/ui-common-library' },
      { name: 'useTheme',            from: '@openleap-io/ui-common-library' },
      { name: 'useBreakpoints',      from: '@openleap-io/ui-common-library' },
      { name: 'useKeyboardShortcut', from: '@openleap-io/ui-common-library' },
      { name: 'useClipboard',        from: '@openleap-io/ui-common-library' },
      { name: 'useMediaQuery',       from: '@openleap-io/ui-common-library' },
      { name: 'useDisclosure',       from: '@openleap-io/ui-common-library' },
      { name: 'useFocusTrap',        from: '@openleap-io/ui-common-library' },
    ])
  },
})
