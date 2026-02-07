<script setup lang="ts">
import {
  DropdownMenuRoot,
  DropdownMenuTrigger,
  DropdownMenuPortal,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from 'reka-ui'
import { cn } from '@/lib/cn'
import type { MenuItem } from '@/lib/types'

const props = withDefaults(defineProps<{
  items?: MenuItem[]
  align?: 'start' | 'center' | 'end'
  label?: string
  class?: string
}>(), {
  items: () => [],
  align: 'start',
})

function onSelect(item: MenuItem) {
  if (!item.disabled) {
    item.action?.()
  }
}
</script>

<template>
  <DropdownMenuRoot>
    <DropdownMenuTrigger as-child>
      <slot name="trigger" />
    </DropdownMenuTrigger>

    <DropdownMenuPortal>
      <DropdownMenuContent
        :align="align"
        :side-offset="4"
        :class="cn(
          'z-50 min-w-[180px] overflow-hidden rounded-md border border-[var(--ol-border-default)] bg-[var(--ol-bg-primary)] p-1 shadow-md',
          'data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95',
          'data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95',
          'data-[side=top]:slide-in-from-bottom-2',
          'data-[side=right]:slide-in-from-left-2',
          'data-[side=bottom]:slide-in-from-top-2',
          'data-[side=left]:slide-in-from-right-2',
          props.class,
        )"
      >
        <DropdownMenuLabel v-if="label" class="px-2 py-1.5 text-xs font-semibold text-[var(--ol-text-muted)]">
          {{ label }}
        </DropdownMenuLabel>

        <template v-for="item in items" :key="item.id">
          <DropdownMenuSeparator
            v-if="item.separator"
            class="-mx-1 my-1 h-px bg-[var(--ol-border-default)]"
          />
          <DropdownMenuItem
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
          </DropdownMenuItem>
        </template>
      </DropdownMenuContent>
    </DropdownMenuPortal>
  </DropdownMenuRoot>
</template>
