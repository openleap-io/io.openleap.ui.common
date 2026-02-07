import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import OlSwitch from '../../src/components/checkbox/OlSwitch.vue'

describe('OlSwitch', () => {
  it('renders a switch', () => {
    const wrapper = mount(OlSwitch)
    expect(wrapper.find('[role="switch"]').exists()).toBe(true)
  })

  it('renders label text', () => {
    const wrapper = mount(OlSwitch, {
      props: { label: 'Dark mode' },
    })
    expect(wrapper.text()).toContain('Dark mode')
  })

  it('does not render label when not provided', () => {
    const wrapper = mount(OlSwitch)
    // SwitchThumb renders as a span, so check there's no label text
    const spans = wrapper.findAll('span')
    const labelSpan = spans.find(s => s.text().length > 0)
    expect(labelSpan).toBeUndefined()
  })

  it('reflects unchecked state', () => {
    const wrapper = mount(OlSwitch, {
      props: { modelValue: false },
    })
    expect(wrapper.find('[role="switch"]').attributes('data-state')).toBe('unchecked')
  })

  it('reflects checked state', () => {
    const wrapper = mount(OlSwitch, {
      props: { modelValue: true },
    })
    expect(wrapper.find('[role="switch"]').attributes('data-state')).toBe('checked')
  })

  it('emits update:modelValue on click', async () => {
    const wrapper = mount(OlSwitch, {
      props: { modelValue: false },
    })
    await wrapper.find('[role="switch"]').trigger('click')
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([true])
  })

  it('applies disabled state', () => {
    const wrapper = mount(OlSwitch, {
      props: { disabled: true },
    })
    expect(wrapper.find('[role="switch"]').attributes('disabled')).toBeDefined()
  })

  it('applies opacity when disabled', () => {
    const wrapper = mount(OlSwitch, {
      props: { disabled: true, label: 'Disabled' },
    })
    expect(wrapper.find('label').classes().join(' ')).toContain('opacity-50')
  })

  it('renders thumb element', () => {
    const wrapper = mount(OlSwitch)
    expect(wrapper.find('[data-state]').exists()).toBe(true)
  })
})
