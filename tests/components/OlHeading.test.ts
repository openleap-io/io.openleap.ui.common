import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import OlHeading from '../../src/components/typography/OlHeading.vue'

describe('OlHeading', () => {
  it('renders h2 by default', () => {
    const wrapper = mount(OlHeading, { slots: { default: 'Hello' } })
    expect(wrapper.element.tagName).toBe('H2')
    expect(wrapper.text()).toBe('Hello')
  })

  it('renders h1', () => {
    const wrapper = mount(OlHeading, { props: { level: 1 }, slots: { default: 'Title' } })
    expect(wrapper.element.tagName).toBe('H1')
  })

  it('renders h3', () => {
    const wrapper = mount(OlHeading, { props: { level: 3 }, slots: { default: 'Sub' } })
    expect(wrapper.element.tagName).toBe('H3')
  })

  it('renders h6', () => {
    const wrapper = mount(OlHeading, { props: { level: 6 }, slots: { default: 'Tiny' } })
    expect(wrapper.element.tagName).toBe('H6')
  })

  it('applies text-3xl for h1', () => {
    const wrapper = mount(OlHeading, { props: { level: 1 }, slots: { default: 'X' } })
    expect(wrapper.classes().join(' ')).toContain('text-3xl')
  })

  it('applies text-2xl for h2', () => {
    const wrapper = mount(OlHeading, { slots: { default: 'X' } })
    expect(wrapper.classes().join(' ')).toContain('text-2xl')
  })

  it('applies font-semibold and tracking-tight', () => {
    const wrapper = mount(OlHeading, { slots: { default: 'X' } })
    expect(wrapper.classes()).toContain('font-semibold')
    expect(wrapper.classes()).toContain('tracking-tight')
  })

  it('accepts custom class', () => {
    const wrapper = mount(OlHeading, { props: { class: 'mt-4' }, slots: { default: 'X' } })
    expect(wrapper.classes()).toContain('mt-4')
  })
})
