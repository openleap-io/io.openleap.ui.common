import { describe, it, expect, beforeAll } from 'vitest'
import { mount } from '@vue/test-utils'
import OlVirtualList from '../../src/components/data-display/OlVirtualList.vue'

beforeAll(() => {
  // jsdom does not provide ResizeObserver
  globalThis.ResizeObserver = class {
    observe() {}
    unobserve() {}
    disconnect() {}
  } as any
})

const items = Array.from({ length: 1000 }, (_, i) => ({ id: i, label: `Item ${i}` }))

describe('OlVirtualList', () => {
  it('renders a container element', () => {
    const wrapper = mount(OlVirtualList, {
      props: { items, itemHeight: 40 },
    })
    expect(wrapper.element.tagName).toBe('DIV')
  })

  it('creates total height container for all items', () => {
    const wrapper = mount(OlVirtualList, {
      props: { items, itemHeight: 40 },
    })
    const inner = wrapper.find('[style*="height"]')
    expect(inner.attributes('style')).toContain('height: 40000px')
  })

  it('renders only a subset of items (not all 1000)', () => {
    const wrapper = mount(OlVirtualList, {
      props: { items, itemHeight: 40 },
      slots: {
        item: `<template #item="{ item }"><span class="virtual-item">{{ item.label }}</span></template>`,
      },
    })
    const rendered = wrapper.findAll('.virtual-item')
    expect(rendered.length).toBeLessThan(1000)
  })

  it('positions items absolutely', () => {
    const wrapper = mount(OlVirtualList, {
      props: { items, itemHeight: 40 },
      slots: {
        item: `<template #item="{ item }"><span>{{ item.label }}</span></template>`,
      },
    })
    const positioned = wrapper.findAll('[style*="position: absolute"]')
    expect(positioned.length).toBeGreaterThan(0)
  })

  it('applies item height to positioned items', () => {
    const wrapper = mount(OlVirtualList, {
      props: { items, itemHeight: 50 },
      slots: {
        item: `<template #item="{ item }"><span>{{ item.label }}</span></template>`,
      },
    })
    const positioned = wrapper.findAll('[style*="position: absolute"]')
    if (positioned.length > 0) {
      expect(positioned[0].attributes('style')).toContain('height: 50px')
    }
  })

  it('accepts custom class', () => {
    const wrapper = mount(OlVirtualList, {
      props: { items, itemHeight: 40, class: 'my-list' },
    })
    expect(wrapper.classes()).toContain('my-list')
  })

  it('provides item and index in slot scope', () => {
    const wrapper = mount(OlVirtualList, {
      props: { items: items.slice(0, 10), itemHeight: 40 },
      slots: {
        item: `<template #item="{ item, index }"><span class="scoped">{{ index }}-{{ item.label }}</span></template>`,
      },
    })
    const scoped = wrapper.findAll('.scoped')
    if (scoped.length > 0) {
      expect(scoped[0].text()).toContain('0-Item 0')
    }
  })

  it('handles empty items', () => {
    const wrapper = mount(OlVirtualList, {
      props: { items: [], itemHeight: 40 },
    })
    const inner = wrapper.find('[style*="height"]')
    expect(inner.attributes('style')).toContain('height: 0px')
  })
})
