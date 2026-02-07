import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import OlDivider from '../../src/components/layout/OlDivider.vue'

describe('OlDivider', () => {
  it('renders horizontal divider by default', () => {
    const wrapper = mount(OlDivider)
    expect(wrapper.find('[role="separator"]').exists()).toBe(true)
    expect(wrapper.find('[aria-orientation="horizontal"]').exists()).toBe(true)
  })

  it('renders as a single line when horizontal without label', () => {
    const wrapper = mount(OlDivider)
    expect(wrapper.find('[role="separator"]').classes().join(' ')).toContain('h-px')
  })

  it('renders label in the middle when provided', () => {
    const wrapper = mount(OlDivider, {
      props: { label: 'OR' },
    })
    expect(wrapper.text()).toContain('OR')
  })

  it('renders line-text-line pattern with label', () => {
    const wrapper = mount(OlDivider, {
      props: { label: 'OR' },
    })
    const separator = wrapper.find('[role="separator"]')
    expect(separator.classes()).toContain('flex')
    expect(separator.classes()).toContain('items-center')
  })

  it('renders vertical divider', () => {
    const wrapper = mount(OlDivider, {
      props: { orientation: 'vertical' },
    })
    expect(wrapper.find('[aria-orientation="vertical"]').exists()).toBe(true)
  })

  it('applies vertical classes', () => {
    const wrapper = mount(OlDivider, {
      props: { orientation: 'vertical' },
    })
    expect(wrapper.find('[role="separator"]').classes().join(' ')).toContain('w-px')
  })

  it('accepts custom class', () => {
    const wrapper = mount(OlDivider, {
      props: { class: 'my-4' },
    })
    expect(wrapper.find('[role="separator"]').classes()).toContain('my-4')
  })

  it('has separator role', () => {
    const wrapper = mount(OlDivider)
    expect(wrapper.find('[role="separator"]').exists()).toBe(true)
  })
})
