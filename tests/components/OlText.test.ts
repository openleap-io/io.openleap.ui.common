import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import OlText from '../../src/components/typography/OlText.vue'

describe('OlText', () => {
  it('renders as p by default', () => {
    const wrapper = mount(OlText, { slots: { default: 'Hello' } })
    expect(wrapper.element.tagName).toBe('P')
    expect(wrapper.text()).toBe('Hello')
  })

  it('renders as span', () => {
    const wrapper = mount(OlText, { props: { as: 'span' }, slots: { default: 'Inline' } })
    expect(wrapper.element.tagName).toBe('SPAN')
  })

  it('renders as div', () => {
    const wrapper = mount(OlText, { props: { as: 'div' }, slots: { default: 'Block' } })
    expect(wrapper.element.tagName).toBe('DIV')
  })

  it('applies size classes', () => {
    const wrapper = mount(OlText, { props: { size: 'xs' }, slots: { default: 'X' } })
    expect(wrapper.classes().join(' ')).toContain('text-xs')
  })

  it('applies base size by default', () => {
    const wrapper = mount(OlText, { slots: { default: 'X' } })
    expect(wrapper.classes().join(' ')).toContain('text-base')
  })

  it('applies weight classes', () => {
    const wrapper = mount(OlText, { props: { weight: 'semibold' }, slots: { default: 'X' } })
    expect(wrapper.classes()).toContain('font-semibold')
  })

  it('applies normal weight by default', () => {
    const wrapper = mount(OlText, { slots: { default: 'X' } })
    expect(wrapper.classes()).toContain('font-normal')
  })

  it('applies primary color by default', () => {
    const wrapper = mount(OlText, { slots: { default: 'X' } })
    expect(wrapper.classes().join(' ')).toContain('text-[var(--ol-text-primary)]')
  })

  it('applies muted color', () => {
    const wrapper = mount(OlText, { props: { color: 'muted' }, slots: { default: 'X' } })
    expect(wrapper.classes().join(' ')).toContain('text-[var(--ol-text-muted)]')
  })

  it('applies secondary color', () => {
    const wrapper = mount(OlText, { props: { color: 'secondary' }, slots: { default: 'X' } })
    expect(wrapper.classes().join(' ')).toContain('text-[var(--ol-text-secondary)]')
  })

  it('accepts custom class', () => {
    const wrapper = mount(OlText, { props: { class: 'mt-2' }, slots: { default: 'X' } })
    expect(wrapper.classes()).toContain('mt-2')
  })
})
