import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import OlSelect from '../../src/components/select/OlSelect.vue'

const options = [
  { value: 'a', label: 'Option A' },
  { value: 'b', label: 'Option B' },
  { value: 'c', label: 'Option C', disabled: true },
]

describe('OlSelect', () => {
  it('renders the select trigger', () => {
    const wrapper = mount(OlSelect, {
      props: { options },
    })
    expect(wrapper.find('[aria-label="Select option"]').exists()).toBe(true)
  })

  it('shows placeholder when no value selected', () => {
    const wrapper = mount(OlSelect, {
      props: { options, placeholder: 'Choose...' },
    })
    expect(wrapper.text()).toContain('Choose...')
  })

  it('shows error message', () => {
    const wrapper = mount(OlSelect, {
      props: { options, error: 'Selection required' },
    })
    expect(wrapper.text()).toContain('Selection required')
  })

  it('applies error styling to trigger', () => {
    const wrapper = mount(OlSelect, {
      props: { options, error: 'Error' },
    })
    const trigger = wrapper.find('[aria-label="Select option"]')
    expect(trigger.classes().join(' ')).toContain('border-[var(--ol-status-error)]')
  })

  it('disables trigger when disabled', () => {
    const wrapper = mount(OlSelect, {
      props: { options, disabled: true },
    })
    const trigger = wrapper.find('[aria-label="Select option"]')
    expect(trigger.attributes('disabled')).toBeDefined()
  })

  it('renders with default empty options', () => {
    const wrapper = mount(OlSelect)
    expect(wrapper.find('[aria-label="Select option"]').exists()).toBe(true)
  })

  it('renders chevron icon', () => {
    const wrapper = mount(OlSelect, {
      props: { options },
    })
    expect(wrapper.find('svg').exists()).toBe(true)
  })
})
