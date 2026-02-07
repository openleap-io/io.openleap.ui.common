import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import OlCode from '../../src/components/typography/OlCode.vue'

describe('OlCode', () => {
  it('renders inline code by default', () => {
    const wrapper = mount(OlCode, { slots: { default: 'cn()' } })
    expect(wrapper.element.tagName).toBe('CODE')
    expect(wrapper.text()).toBe('cn()')
  })

  it('applies inline styling classes', () => {
    const wrapper = mount(OlCode, { slots: { default: 'x' } })
    expect(wrapper.classes()).toContain('rounded')
    expect(wrapper.classes().join(' ')).toContain('font-mono')
  })

  it('renders block code when inline=false', () => {
    const wrapper = mount(OlCode, {
      props: { inline: false },
      slots: { default: 'const x = 1' },
    })
    expect(wrapper.find('pre').exists()).toBe(true)
    expect(wrapper.find('code').exists()).toBe(true)
    expect(wrapper.text()).toContain('const x = 1')
  })

  it('does not show copy button by default', () => {
    const wrapper = mount(OlCode, {
      props: { inline: false },
      slots: { default: 'code' },
    })
    expect(wrapper.find('button').exists()).toBe(false)
  })

  it('shows copy button when copyable on block mode', () => {
    const wrapper = mount(OlCode, {
      props: { inline: false, copyable: true },
      slots: { default: 'code' },
    })
    expect(wrapper.find('button').exists()).toBe(true)
    expect(wrapper.find('[aria-label="Copy code"]').exists()).toBe(true)
  })

  it('renders copy icon SVG', () => {
    const wrapper = mount(OlCode, {
      props: { inline: false, copyable: true },
      slots: { default: 'code' },
    })
    expect(wrapper.find('button svg').exists()).toBe(true)
  })

  it('applies block styling classes', () => {
    const wrapper = mount(OlCode, {
      props: { inline: false },
      slots: { default: 'x' },
    })
    expect(wrapper.find('pre').classes().join(' ')).toContain('overflow-x-auto')
    expect(wrapper.find('pre').classes().join(' ')).toContain('font-mono')
  })

  it('accepts custom class on inline', () => {
    const wrapper = mount(OlCode, {
      props: { class: 'my-code' },
      slots: { default: 'x' },
    })
    expect(wrapper.classes()).toContain('my-code')
  })

  it('accepts custom class on block', () => {
    const wrapper = mount(OlCode, {
      props: { inline: false, class: 'my-block' },
      slots: { default: 'x' },
    })
    expect(wrapper.find('pre').classes()).toContain('my-block')
  })
})
