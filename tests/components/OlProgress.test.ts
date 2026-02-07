import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import OlProgress from '../../src/components/feedback/OlProgress.vue'

describe('OlProgress', () => {
  it('renders progressbar role', () => {
    const wrapper = mount(OlProgress, {
      props: { value: 50 },
    })
    expect(wrapper.find('[role="progressbar"]').exists()).toBe(true)
  })

  it('sets aria-valuenow', () => {
    const wrapper = mount(OlProgress, {
      props: { value: 75 },
    })
    expect(wrapper.find('[role="progressbar"]').attributes('aria-valuenow')).toBe('75')
  })

  it('clamps value to 0-100', () => {
    const wrapper = mount(OlProgress, {
      props: { value: 150 },
    })
    expect(wrapper.find('[role="progressbar"]').attributes('aria-valuenow')).toBe('100')
  })

  it('applies fill width based on value', () => {
    const wrapper = mount(OlProgress, {
      props: { value: 60 },
    })
    const fill = wrapper.find('[role="progressbar"] > div')
    expect(fill.attributes('style')).toContain('width: 60%')
  })

  it('shows label when showLabel is true', () => {
    const wrapper = mount(OlProgress, {
      props: { value: 42, showLabel: true },
    })
    expect(wrapper.text()).toContain('42%')
  })

  it('does not show label by default', () => {
    const wrapper = mount(OlProgress, {
      props: { value: 42 },
    })
    expect(wrapper.text()).not.toContain('42%')
  })

  it('renders indeterminate when no value', () => {
    const wrapper = mount(OlProgress)
    const bar = wrapper.find('[role="progressbar"]')
    // No aria-valuenow in indeterminate mode
    expect(bar.attributes('aria-valuenow')).toBeUndefined()
  })

  it('accepts custom class', () => {
    const wrapper = mount(OlProgress, {
      props: { value: 50, class: 'my-progress' },
    })
    expect(wrapper.classes()).toContain('my-progress')
  })

  it('renders with success variant', () => {
    const wrapper = mount(OlProgress, {
      props: { value: 50, variant: 'success' },
    })
    const fill = wrapper.find('[role="progressbar"] > div')
    expect(fill.classes().join(' ')).toContain('bg-[var(--ol-status-success)]')
  })

  it('renders with error variant', () => {
    const wrapper = mount(OlProgress, {
      props: { value: 50, variant: 'error' },
    })
    const fill = wrapper.find('[role="progressbar"] > div')
    expect(fill.classes().join(' ')).toContain('bg-[var(--ol-status-error)]')
  })
})
