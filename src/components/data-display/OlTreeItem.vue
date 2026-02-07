<script setup lang="ts">
import { cn } from '@/lib/cn'
import type { TreeNode } from '@/lib/types'

const props = withDefaults(defineProps<{
  item: TreeNode
  level?: number
  expanded?: boolean
  selected?: boolean
}>(), {
  level: 0,
  expanded: false,
  selected: false,
})

const emit = defineEmits<{
  toggle: [id: string]
  select: [node: TreeNode]
}>()

const hasChildren = !!props.item.children?.length
</script>

<template>
  <div>
    <div
      role="treeitem"
      :tabindex="item.disabled ? -1 : 0"
      :aria-expanded="hasChildren ? expanded : undefined"
      :aria-selected="selected"
      :aria-disabled="item.disabled || undefined"
      :class="cn(
        'flex cursor-pointer items-center gap-1.5 rounded-md px-2 py-1 text-sm transition-colors',
        selected
          ? 'bg-[var(--ol-bg-tertiary)] font-medium text-[var(--ol-text-primary)]'
          : 'text-[var(--ol-text-secondary)] hover:bg-[var(--ol-bg-tertiary)]',
        item.disabled && 'pointer-events-none opacity-50',
      )"
      :style="{ paddingLeft: `${level * 16 + 8}px` }"
      @click="!item.disabled && emit('select', item)"
      @keydown.enter.prevent="!item.disabled && emit('select', item)"
      @keydown.right.prevent="hasChildren && !expanded && emit('toggle', item.id)"
      @keydown.left.prevent="hasChildren && expanded && emit('toggle', item.id)"
    >
      <!-- Chevron for expandable nodes -->
      <button
        v-if="hasChildren"
        type="button"
        tabindex="-1"
        class="flex size-4 shrink-0 items-center justify-center rounded hover:bg-black/5"
        @click.stop="emit('toggle', item.id)"
      >
        <svg
          class="size-3.5 transition-transform duration-150"
          :class="{ 'rotate-90': expanded }"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path d="m9 18 6-6-6-6" />
        </svg>
      </button>
      <span v-else class="size-4 shrink-0" />

      <!-- Item icon -->
      <component v-if="item.icon" :is="item.icon" class="size-4 shrink-0" />

      <!-- Label -->
      <span class="truncate">{{ item.label }}</span>
    </div>

    <!-- Children (recursive) -->
    <div v-if="hasChildren && expanded" role="group">
      <slot />
    </div>
  </div>
</template>
