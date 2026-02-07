import { describe, it, expect, afterEach } from 'vitest'
import { mount } from '@vue/test-utils'
import OlContextMenu from '../../src/components/dropdown/OlContextMenu.vue'
import type { MenuItem } from '../../src/lib/types'

const items: MenuItem[] = [
  { id: '1', label: 'Copy' },
  { id: '2', label: 'Paste' },
  { id: 'sep', label: '', separator: true },
  { id: '3', label: 'Delete', disabled: true },
]

describe('OlContextMenu', () => {
  afterEach(() => {
    document.body.innerHTML = ''
  })

  it('renders default slot content', () => {
    const wrapper = mount(OlContextMenu, {
      props: { items },
      slots: { default: '<div data-testid="area">Right-click here</div>' },
    })
    expect(wrapper.text()).toContain('Right-click here')
  })

  it('renders trigger area', () => {
    const wrapper = mount(OlContextMenu, {
      props: { items },
      slots: { default: '<div data-testid="area">Area</div>' },
    })
    expect(wrapper.find('[data-testid="area"]').exists()).toBe(true)
  })

  it('accepts items prop', () => {
    const wrapper = mount(OlContextMenu, {
      props: { items },
      slots: { default: '<div>Area</div>' },
    })
    expect(wrapper.exists()).toBe(true)
  })

  it('defaults to empty items', () => {
    const wrapper = mount(OlContextMenu, {
      slots: { default: '<div>Area</div>' },
    })
    expect(wrapper.exists()).toBe(true)
  })
})
