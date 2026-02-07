<script setup lang="ts">
import {
  ContextMenuRoot,
  ContextMenuTrigger,
  ContextMenuPortal,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
} from 'reka-ui'
import { cn } from '@/lib/cn'
import type { MenuItem } from '@/lib/types'

const props = withDefaults(defineProps<{
  items?: MenuItem[]
  class?: string
}>(), {
  items: () => [],
})

function onSelect(item: MenuItem) {
  if (!item.disabled) {
    item.action?.()
  }
}
</script>

<template>
  <ContextMenuRoot>
    <ContextMenuTrigger as-child>
      <slot />
    </ContextMenuTrigger>

    <ContextMenuPortal>
      <ContextMenuContent
        :class="cn(
          'z-50 min-w-[180px] overflow-hidden rounded-md border border-[var(--ol-border-default)] bg-[var(--ol-bg-primary)] p-1 shadow-md',
          'data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95',
          props.class,
        )"
      >
        <template v-for="item in items" :key="item.id">
          <ContextMenuSeparator
            v-if="item.separator"
            class="-mx-1 my-1 h-px bg-[var(--ol-border-default)]"
          />
          <ContextMenuItem
            v-else
            :disabled="item.disabled"
            :class="cn(
              'relative flex cursor-pointer select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors',
              'data-[highlighted]:bg-[var(--ol-bg-secondary)] data-[highlighted]:text-[var(--ol-text-primary)]',
              'data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
            )"
            @select="onSelect(item)"
          >
            <component v-if="item.icon" :is="item.icon" class="size-4 text-[var(--ol-text-muted)]" />
            <span class="flex-1">{{ item.label }}</span>
            <span v-if="item.shortcut" class="ml-auto text-xs tracking-widest text-[var(--ol-text-muted)]">
              {{ item.shortcut }}
            </span>
          </ContextMenuItem>
        </template>
      </ContextMenuContent>
    </ContextMenuPortal>
  </ContextMenuRoot>
</template>
