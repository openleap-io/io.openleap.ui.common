import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import OlButton from '../../src/components/button/OlButton.vue'

describe('OlButton', () => {
  it('renders slot content', () => {
    const wrapper = mount(OlButton, {
      slots: { default: 'Click me' },
    })
    expect(wrapper.text()).toBe('Click me')
  })

  it('applies default variant classes', () => {
    const wrapper = mount(OlButton, {
      slots: { default: 'Button' },
    })
    expect(wrapper.classes().join(' ')).toContain('inline-flex')
  })

  it('shows spinner when loading', () => {
    const wrapper = mount(OlButton, {
      props: { loading: true },
      slots: { default: 'Save' },
    })
    expect(wrapper.find('[data-testid="spinner"]').exists()).toBe(true)
    expect(wrapper.attributes('disabled')).toBeDefined()
  })

  it('is disabled when disabled prop is true', () => {
    const wrapper = mount(OlButton, {
      props: { disabled: true },
      slots: { default: 'Button' },
    })
    expect(wrapper.attributes('disabled')).toBeDefined()
  })

  it('emits click when clicked', async () => {
    const wrapper = mount(OlButton, {
      slots: { default: 'Click' },
    })
    await wrapper.trigger('click')
    expect(wrapper.emitted('click')).toHaveLength(1)
  })

  it('does not emit click when disabled', async () => {
    const wrapper = mount(OlButton, {
      props: { disabled: true },
      slots: { default: 'Click' },
    })
    await wrapper.trigger('click')
    expect(wrapper.emitted('click')).toBeUndefined()
  })

  it('does not emit click when loading', async () => {
    const wrapper = mount(OlButton, {
      props: { loading: true },
      slots: { default: 'Click' },
    })
    await wrapper.trigger('click')
    expect(wrapper.emitted('click')).toBeUndefined()
  })

  it('renders as button element', () => {
    const wrapper = mount(OlButton, {
      slots: { default: 'Button' },
    })
    expect(wrapper.element.tagName).toBe('BUTTON')
  })
})
