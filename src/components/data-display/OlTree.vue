<script setup lang="ts">
import { computed } from 'vue'
import { cn } from '@/lib/cn'
import type { TreeNode } from '@/lib/types'
import OlTreeItem from './OlTreeItem.vue'

const props = withDefaults(defineProps<{
  items: TreeNode[]
  expandedKeys?: string[]
  selectedKey?: string
  selectable?: boolean
  class?: string
}>(), {
  expandedKeys: () => [],
  selectable: true,
})

const emit = defineEmits<{
  'update:expandedKeys': [keys: string[]]
  'update:selectedKey': [key: string]
  'select': [node: TreeNode]
}>()

const expandedSet = computed(() => new Set(props.expandedKeys))

function toggleExpand(id: string) {
  const keys = new Set(props.expandedKeys)
  if (keys.has(id)) {
    keys.delete(id)
  } else {
    keys.add(id)
  }
  emit('update:expandedKeys', [...keys])
}

function selectNode(node: TreeNode) {
  if (!props.selectable || node.disabled) return
  emit('update:selectedKey', node.id)
  emit('select', node)
}

function renderItems(nodes: TreeNode[], level: number): any[] {
  return nodes
}
</script>

<template>
  <div
    role="tree"
    :class="cn('text-sm', props.class)"
  >
    <template v-for="item in items" :key="item.id">
      <OlTreeItem
        :item="item"
        :level="0"
        :expanded="expandedSet.has(item.id)"
        :selected="selectedKey === item.id"
        @toggle="toggleExpand"
        @select="selectNode"
      >
        <!-- Level 1 children -->
        <template v-if="item.children?.length">
          <template v-for="child in item.children" :key="child.id">
            <OlTreeItem
              :item="child"
              :level="1"
              :expanded="expandedSet.has(child.id)"
              :selected="selectedKey === child.id"
              @toggle="toggleExpand"
              @select="selectNode"
            >
              <!-- Level 2 children -->
              <template v-if="child.children?.length">
                <template v-for="grandchild in child.children" :key="grandchild.id">
                  <OlTreeItem
                    :item="grandchild"
                    :level="2"
                    :expanded="expandedSet.has(grandchild.id)"
                    :selected="selectedKey === grandchild.id"
                    @toggle="toggleExpand"
                    @select="selectNode"
                  >
                    <!-- Level 3 children -->
                    <template v-if="grandchild.children?.length">
                      <OlTreeItem
                        v-for="gc in grandchild.children"
                        :key="gc.id"
                        :item="gc"
                        :level="3"
                        :expanded="expandedSet.has(gc.id)"
                        :selected="selectedKey === gc.id"
                        @toggle="toggleExpand"
                        @select="selectNode"
                      />
                    </template>
                  </OlTreeItem>
                </template>
              </template>
            </OlTreeItem>
          </template>
        </template>
      </OlTreeItem>
    </template>
  </div>
</template>
