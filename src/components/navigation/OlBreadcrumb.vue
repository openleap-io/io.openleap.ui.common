<script setup lang="ts">
import { cn } from '@/lib/cn'
import type { BreadcrumbItem } from '@/lib/types'

const props = withDefaults(defineProps<{
  items: BreadcrumbItem[]
  separator?: string
  class?: string
}>(), {
  separator: '/',
})
</script>

<template>
  <nav :class="cn('flex items-center text-sm', props.class)" aria-label="Breadcrumb">
    <ol class="flex items-center gap-1.5">
      <li
        v-for="(item, i) in items"
        :key="i"
        class="flex items-center gap-1.5"
      >
        <span
          v-if="i > 0"
          class="text-[var(--ol-text-muted)]"
          aria-hidden="true"
        >{{ separator }}</span>

        <a
          v-if="item.to && i < items.length - 1"
          :href="item.to"
          class="text-[var(--ol-text-secondary)] transition-colors hover:text-[var(--ol-text-primary)]"
        >
          <component v-if="item.icon" :is="item.icon" class="mr-1 inline-block size-4" />
          {{ item.label }}
        </a>
        <span
          v-else
          :class="[
            i === items.length - 1
              ? 'font-medium text-[var(--ol-text-primary)]'
              : 'text-[var(--ol-text-secondary)]',
          ]"
          :aria-current="i === items.length - 1 ? 'page' : undefined"
        >
          <component v-if="item.icon" :is="item.icon" class="mr-1 inline-block size-4" />
          {{ item.label }}
        </span>
      </li>
    </ol>
  </nav>
</template>
