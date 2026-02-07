<script setup lang="ts">
import { computed, ref } from 'vue'
import {
  ComboboxRoot,
  ComboboxInput,
  ComboboxContent,
  ComboboxItem,
  ComboboxEmpty,
  DialogRoot,
  DialogPortal,
  DialogOverlay,
  DialogContent,
} from 'reka-ui'
import { cn } from '@/lib/cn'
import type { CommandGroup, MenuItem } from '@/lib/types'

const props = withDefaults(defineProps<{
  open?: boolean
  groups: CommandGroup[]
  placeholder?: string
  class?: string
}>(), {
  open: false,
  placeholder: 'Type a command or search...',
})

const emit = defineEmits<{
  'update:open': [value: boolean]
  'select': [item: MenuItem]
}>()

const query = ref('')

const filteredGroups = computed(() => {
  const q = query.value.toLowerCase().trim()
  if (!q) return props.groups
  return props.groups
    .map(group => ({
      ...group,
      items: group.items.filter(item =>
        item.label.toLowerCase().includes(q)
      ),
    }))
    .filter(group => group.items.length > 0)
})

function onSelect(item: MenuItem) {
  emit('select', item)
  item.action?.()
  emit('update:open', false)
  query.value = ''
}
</script>

<template>
  <DialogRoot
    :open="open"
    @update:open="emit('update:open', $event)"
  >
    <DialogPortal>
      <DialogOverlay
        class="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
      />
      <DialogContent
        :class="cn(
          'fixed left-1/2 top-[20%] z-50 w-full max-w-[520px] -translate-x-1/2 rounded-lg border border-[var(--ol-border-default)] bg-[var(--ol-bg-primary)] shadow-lg',
          props.class,
        )"
        @keydown.escape="emit('update:open', false)"
      >
        <ComboboxRoot
          :model-value="''"
          :open="true"
          class="flex flex-col"
        >
          <!-- Search input -->
          <div class="flex items-center border-b border-[var(--ol-border)] px-3">
            <svg class="mr-2 size-4 shrink-0 text-[var(--ol-text-muted)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.3-4.3" />
            </svg>
            <ComboboxInput
              :placeholder="placeholder"
              class="flex h-11 w-full bg-transparent py-3 text-sm text-[var(--ol-text-primary)] outline-none placeholder:text-[var(--ol-text-muted)]"
              :model-value="query"
              @update:model-value="query = $event"
            />
          </div>

          <!-- Results -->
          <ComboboxContent
            class="max-h-[300px] overflow-y-auto p-2"
            :dismiss-on-select="false"
          >
            <ComboboxEmpty class="py-6 text-center text-sm text-[var(--ol-text-muted)]">
              No results found.
            </ComboboxEmpty>

            <div
              v-for="group in filteredGroups"
              :key="group.heading"
              class="mb-1"
            >
              <div class="px-2 py-1.5 text-xs font-semibold text-[var(--ol-text-muted)]">
                {{ group.heading }}
              </div>
              <ComboboxItem
                v-for="item in group.items"
                :key="item.id"
                :value="item.label"
                :disabled="item.disabled"
                class="flex cursor-pointer items-center gap-2 rounded-md px-2 py-1.5 text-sm text-[var(--ol-text-primary)] outline-none data-[highlighted]:bg-[var(--ol-bg-tertiary)] data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
                @select.prevent="onSelect(item)"
              >
                <component v-if="item.icon" :is="item.icon" class="size-4 shrink-0 text-[var(--ol-text-muted)]" />
                <span class="flex-1">{{ item.label }}</span>
                <span
                  v-if="item.shortcut"
                  class="ml-auto text-xs text-[var(--ol-text-muted)]"
                >
                  {{ item.shortcut }}
                </span>
              </ComboboxItem>
            </div>
          </ComboboxContent>
        </ComboboxRoot>
      </DialogContent>
    </DialogPortal>
  </DialogRoot>
</template>
