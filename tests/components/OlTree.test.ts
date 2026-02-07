import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { defineComponent, ref, h, nextTick } from 'vue'
import OlTree from '../../src/components/data-display/OlTree.vue'
import type { TreeNode } from '../../src/lib/types'

const treeItems: TreeNode[] = [
  {
    id: 'root1',
    label: 'Root 1',
    children: [
      { id: 'child1', label: 'Child 1' },
      { id: 'child2', label: 'Child 2', disabled: true },
    ],
  },
  { id: 'root2', label: 'Root 2' },
  {
    id: 'root3',
    label: 'Root 3',
    children: [
      {
        id: 'child3',
        label: 'Child 3',
        children: [{ id: 'grandchild1', label: 'Grandchild 1' }],
      },
    ],
  },
]

function createTree(opts: {
  expandedKeys?: string[]
  selectedKey?: string
  selectable?: boolean
} = {}) {
  return defineComponent({
    setup() {
      const expanded = ref(opts.expandedKeys || [])
      const selected = ref(opts.selectedKey || '')
      return () =>
        h(OlTree, {
          items: treeItems,
          expandedKeys: expanded.value,
          selectedKey: selected.value,
          selectable: opts.selectable ?? true,
          'onUpdate:expandedKeys': (v: string[]) => { expanded.value = v },
          'onUpdate:selectedKey': (v: string) => { selected.value = v },
        })
    },
  })
}

describe('OlTree', () => {
  it('renders root items', () => {
    const wrapper = mount(createTree())
    expect(wrapper.text()).toContain('Root 1')
    expect(wrapper.text()).toContain('Root 2')
    expect(wrapper.text()).toContain('Root 3')
  })

  it('has tree role', () => {
    const wrapper = mount(createTree())
    expect(wrapper.find('[role="tree"]').exists()).toBe(true)
  })

  it('renders treeitem roles', () => {
    const wrapper = mount(createTree())
    const items = wrapper.findAll('[role="treeitem"]')
    expect(items.length).toBe(3) // only root-level visible
  })

  it('does not show children when collapsed', () => {
    const wrapper = mount(createTree())
    expect(wrapper.text()).not.toContain('Child 1')
  })

  it('shows children when expanded', () => {
    const wrapper = mount(createTree({ expandedKeys: ['root1'] }))
    expect(wrapper.text()).toContain('Child 1')
    expect(wrapper.text()).toContain('Child 2')
  })

  it('toggles expansion on chevron click', async () => {
    const wrapper = mount(createTree())
    // Find chevron button in first root item (has children)
    const chevron = wrapper.find('[role="treeitem"] button')
    await chevron.trigger('click')
    await nextTick()
    expect(wrapper.text()).toContain('Child 1')
  })

  it('selects item on click', async () => {
    const wrapper = mount(createTree({ expandedKeys: ['root1'] }))
    const items = wrapper.findAll('[role="treeitem"]')
    // Click on Child 1
    await items[1].trigger('click')
    await nextTick()
    expect(items[1].attributes('aria-selected')).toBe('true')
  })

  it('marks disabled items', () => {
    const wrapper = mount(createTree({ expandedKeys: ['root1'] }))
    const items = wrapper.findAll('[role="treeitem"]')
    // Child 2 is disabled (index 2 among visible items)
    const disabledItem = items.find(i => i.text().includes('Child 2'))
    expect(disabledItem?.attributes('aria-disabled')).toBe('true')
  })

  it('renders nested children when parent expanded', () => {
    const wrapper = mount(createTree({ expandedKeys: ['root3', 'child3'] }))
    expect(wrapper.text()).toContain('Child 3')
    expect(wrapper.text()).toContain('Grandchild 1')
  })

  it('shows aria-expanded on items with children', () => {
    const wrapper = mount(createTree())
    const root1 = wrapper.findAll('[role="treeitem"]')[0]
    expect(root1.attributes('aria-expanded')).toBe('false')
  })

  it('shows aria-expanded=true on expanded items', () => {
    const wrapper = mount(createTree({ expandedKeys: ['root1'] }))
    const root1 = wrapper.findAll('[role="treeitem"]')[0]
    expect(root1.attributes('aria-expanded')).toBe('true')
  })
})
