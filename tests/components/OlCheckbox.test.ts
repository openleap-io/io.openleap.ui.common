import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import OlCheckbox from '../../src/components/checkbox/OlCheckbox.vue'

describe('OlCheckbox', () => {
  it('renders a checkbox', () => {
    const wrapper = mount(OlCheckbox)
    expect(wrapper.find('[role="checkbox"]').exists()).toBe(true)
  })

  it('renders label text', () => {
    const wrapper = mount(OlCheckbox, {
      props: { label: 'Accept terms' },
    })
    expect(wrapper.text()).toContain('Accept terms')
  })

  it('does not render label when not provided', () => {
    const wrapper = mount(OlCheckbox)
    expect(wrapper.find('span').exists()).toBe(false)
  })

  it('reflects checked state', () => {
    const wrapper = mount(OlCheckbox, {
      props: { modelValue: true },
    })
    expect(wrapper.find('[role="checkbox"]').attributes('data-state')).toBe('checked')
  })

  it('reflects unchecked state', () => {
    const wrapper = mount(OlCheckbox, {
      props: { modelValue: false },
    })
    expect(wrapper.find('[role="checkbox"]').attributes('data-state')).toBe('unchecked')
  })

  it('reflects indeterminate state', () => {
    const wrapper = mount(OlCheckbox, {
      props: { indeterminate: true },
    })
    expect(wrapper.find('[role="checkbox"]').attributes('data-state')).toBe('indeterminate')
  })

  it('emits update:modelValue on click', async () => {
    const wrapper = mount(OlCheckbox, {
      props: { modelValue: false },
    })
    await wrapper.find('[role="checkbox"]').trigger('click')
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([true])
  })

  it('applies disabled state', () => {
    const wrapper = mount(OlCheckbox, {
      props: { disabled: true },
    })
    expect(wrapper.find('[role="checkbox"]').attributes('disabled')).toBeDefined()
  })

  it('applies opacity when disabled', () => {
    const wrapper = mount(OlCheckbox, {
      props: { disabled: true, label: 'Disabled' },
    })
    expect(wrapper.find('label').classes().join(' ')).toContain('opacity-50')
  })
})
