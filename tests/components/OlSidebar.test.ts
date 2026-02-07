import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { nextTick } from 'vue'
import OlSidebar from '../../src/components/navigation/OlSidebar.vue'
import OlSidebarItem from '../../src/components/navigation/OlSidebarItem.vue'
import OlSidebarGroup from '../../src/components/navigation/OlSidebarGroup.vue'

describe('OlSidebar', () => {
  it('renders as aside element', () => {
    const wrapper = mount(OlSidebar)
    expect(wrapper.element.tagName).toBe('ASIDE')
  })

  it('applies default width', () => {
    const wrapper = mount(OlSidebar)
    expect(wrapper.attributes('style')).toContain('width: 240px')
  })

  it('applies collapsed width', () => {
    const wrapper = mount(OlSidebar, {
      props: { collapsed: true },
    })
    expect(wrapper.attributes('style')).toContain('width: 56px')
  })

  it('uses custom width props', () => {
    const wrapper = mount(OlSidebar, {
      props: { width: '300px', collapsedWidth: '80px' },
    })
    expect(wrapper.attributes('style')).toContain('width: 300px')
  })

  it('renders header slot', () => {
    const wrapper = mount(OlSidebar, {
      slots: { header: '<span>Logo</span>' },
    })
    expect(wrapper.text()).toContain('Logo')
  })

  it('renders footer slot', () => {
    const wrapper = mount(OlSidebar, {
      slots: { footer: '<span>v1.0</span>' },
    })
    expect(wrapper.text()).toContain('v1.0')
  })

  it('renders default slot', () => {
    const wrapper = mount(OlSidebar, {
      slots: { default: '<span>Nav items</span>' },
    })
    expect(wrapper.text()).toContain('Nav items')
  })

  it('accepts custom class', () => {
    const wrapper = mount(OlSidebar, {
      props: { class: 'my-sidebar' },
    })
    expect(wrapper.classes()).toContain('my-sidebar')
  })
})

describe('OlSidebarItem', () => {
  it('renders as button by default', () => {
    const wrapper = mount(OlSidebarItem, {
      props: { label: 'Dashboard' },
    })
    expect(wrapper.element.tagName).toBe('BUTTON')
  })

  it('renders as anchor when to is provided', () => {
    const wrapper = mount(OlSidebarItem, {
      props: { label: 'Projects', to: '/projects' },
    })
    expect(wrapper.element.tagName).toBe('A')
    expect(wrapper.attributes('href')).toBe('/projects')
  })

  it('renders label text', () => {
    const wrapper = mount(OlSidebarItem, {
      props: { label: 'Dashboard' },
    })
    expect(wrapper.text()).toContain('Dashboard')
  })

  it('applies active state classes', () => {
    const wrapper = mount(OlSidebarItem, {
      props: { label: 'Active', active: true },
    })
    expect(wrapper.classes().join(' ')).toContain('font-semibold')
  })

  it('renders badge when provided', () => {
    const wrapper = mount(OlSidebarItem, {
      props: { label: 'Tasks', badge: 5 },
    })
    expect(wrapper.text()).toContain('5')
  })

  it('does not render badge when not provided', () => {
    const wrapper = mount(OlSidebarItem, {
      props: { label: 'Tasks' },
    })
    const spans = wrapper.findAll('span')
    // Only the label span, no badge span
    const badgeSpans = spans.filter(s => s.classes().join(' ').includes('ml-auto'))
    expect(badgeSpans).toHaveLength(0)
  })

  it('accepts custom class', () => {
    const wrapper = mount(OlSidebarItem, {
      props: { label: 'Item', class: 'custom-item' },
    })
    expect(wrapper.classes()).toContain('custom-item')
  })
})

describe('OlSidebarGroup', () => {
  it('renders group label', () => {
    const wrapper = mount(OlSidebarGroup, {
      props: { label: 'Main' },
    })
    expect(wrapper.text()).toContain('Main')
  })

  it('renders label as static text when not collapsible', () => {
    const wrapper = mount(OlSidebarGroup, {
      props: { label: 'Main' },
    })
    expect(wrapper.find('button').exists()).toBe(false)
    expect(wrapper.find('span').text()).toContain('Main')
  })

  it('renders label as button when collapsible', () => {
    const wrapper = mount(OlSidebarGroup, {
      props: { label: 'Settings', collapsible: true },
    })
    expect(wrapper.find('button').exists()).toBe(true)
    expect(wrapper.find('button').text()).toContain('Settings')
  })

  it('toggles content visibility when collapsible', async () => {
    const wrapper = mount(OlSidebarGroup, {
      props: { label: 'Settings', collapsible: true },
      slots: { default: '<span class="child-content">Child</span>' },
    })
    // Content visible by default — v-show container has no display:none
    const contentContainer = wrapper.find('.space-y-0\\.5')
    expect(contentContainer.attributes('style')).toBeUndefined()

    await wrapper.find('button').trigger('click')
    await nextTick()
    expect(contentContainer.attributes('style')).toContain('display: none')

    await wrapper.find('button').trigger('click')
    await nextTick()
    expect(contentContainer.attributes('style')).not.toContain('display: none')
  })

  it('renders chevron icon when collapsible', () => {
    const wrapper = mount(OlSidebarGroup, {
      props: { label: 'Settings', collapsible: true },
    })
    expect(wrapper.find('svg').exists()).toBe(true)
  })

  it('renders default slot content', () => {
    const wrapper = mount(OlSidebarGroup, {
      props: { label: 'Main' },
      slots: { default: '<span>Item content</span>' },
    })
    expect(wrapper.text()).toContain('Item content')
  })

  it('accepts custom class', () => {
    const wrapper = mount(OlSidebarGroup, {
      props: { label: 'Main', class: 'my-group' },
    })
    expect(wrapper.classes()).toContain('my-group')
  })
})
