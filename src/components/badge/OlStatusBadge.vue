<script setup lang="ts">
import { computed } from 'vue'
import { cn } from '@/lib/cn'
import type { Status } from '@/lib/types'

const props = withDefaults(defineProps<{
  status: Status
  class?: string
}>(), {})

const statusConfig: Record<Status, { label: string; dotColor: string; bgColor: string; textColor: string }> = {
  active:      { label: 'Active',      dotColor: 'bg-green-500',  bgColor: 'bg-green-50',  textColor: 'text-green-700' },
  planned:     { label: 'Planned',     dotColor: 'bg-gray-400',   bgColor: 'bg-gray-100',  textColor: 'text-gray-600' },
  development: { label: 'Development', dotColor: 'bg-blue-500',   bgColor: 'bg-blue-50',   textColor: 'text-blue-700' },
  deprecated:  { label: 'Deprecated',  dotColor: 'bg-amber-500',  bgColor: 'bg-amber-50',  textColor: 'text-amber-700' },
  retired:     { label: 'Retired',     dotColor: 'bg-gray-400',   bgColor: 'bg-gray-100',  textColor: 'text-gray-500' },
  error:       { label: 'Error',       dotColor: 'bg-red-500',    bgColor: 'bg-red-50',    textColor: 'text-red-700' },
  warning:     { label: 'Warning',     dotColor: 'bg-amber-500',  bgColor: 'bg-amber-50',  textColor: 'text-amber-700' },
  info:        { label: 'Info',        dotColor: 'bg-blue-500',   bgColor: 'bg-blue-50',   textColor: 'text-blue-700' },
  draft:       { label: 'Draft',       dotColor: 'bg-gray-400',   bgColor: 'bg-gray-100',  textColor: 'text-gray-600' },
}

const config = computed(() => statusConfig[props.status] ?? statusConfig.info)
</script>

<template>
  <span :class="cn('inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium', config.bgColor, config.textColor, props.class)">
    <span :class="cn('size-1.5 rounded-full', config.dotColor)" aria-hidden="true" />
    <slot>{{ config.label }}</slot>
  </span>
</template>
