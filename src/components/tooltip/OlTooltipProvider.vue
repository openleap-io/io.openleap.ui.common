<script setup lang="ts">
import { TooltipProvider } from 'reka-ui'

withDefaults(defineProps<{
  delayDuration?: number
  skipDelayDuration?: number
}>(), {
  delayDuration: 300,
  skipDelayDuration: 300,
})
</script>

<template>
  <TooltipProvider :delay-duration="delayDuration" :skip-delay-duration="skipDelayDuration">
    <slot />
  </TooltipProvider>
</template>
