<script setup lang="ts">
import {
  TooltipRoot,
  TooltipTrigger,
  TooltipPortal,
  TooltipContent,
  TooltipArrow,
} from 'reka-ui'
import { cn } from '@/lib/cn'
import type { Side } from '@/lib/types'

const props = withDefaults(defineProps<{
  content?: string
  side?: Side
  delayMs?: number
  class?: string
}>(), {
  side: 'top',
  delayMs: 300,
})
</script>

<template>
  <TooltipRoot :delay-duration="delayMs">
    <TooltipTrigger as-child>
      <slot />
    </TooltipTrigger>

    <TooltipPortal>
      <TooltipContent
        :side="side"
        :side-offset="4"
        :class="cn(
          'z-50 overflow-hidden rounded-md bg-[var(--ol-bg-inverse)] px-3 py-1.5 text-xs text-[var(--ol-text-inverse)] shadow-md',
          'data-[state=delayed-open]:animate-in data-[state=delayed-open]:fade-in-0 data-[state=delayed-open]:zoom-in-95',
          'data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95',
          'data-[side=top]:slide-in-from-bottom-2',
          'data-[side=right]:slide-in-from-left-2',
          'data-[side=bottom]:slide-in-from-top-2',
          'data-[side=left]:slide-in-from-right-2',
          props.class,
        )"
      >
        {{ content }}
        <TooltipArrow class="fill-[var(--ol-bg-inverse)]" />
      </TooltipContent>
    </TooltipPortal>
  </TooltipRoot>
</template>
