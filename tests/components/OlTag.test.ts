import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import OlTag from '../../src/components/badge/OlTag.vue'

describe('OlTag', () => {
  it('renders label text', () => {
    const wrapper = mount(OlTag, {
      props: { label: 'Vue' },
    })
    expect(wrapper.text()).toContain('Vue')
  })

  it('renders as a span', () => {
    const wrapper = mount(OlTag, {
      props: { label: 'Tag' },
    })
    expect(wrapper.element.tagName).toBe('SPAN')
  })

  it('applies pill shape classes', () => {
    const wrapper = mount(OlTag, {
      props: { label: 'Tag' },
    })
    expect(wrapper.classes()).toContain('rounded-full')
  })

  it('does not show remove button by default', () => {
    const wrapper = mount(OlTag, {
      props: { label: 'Tag' },
    })
    expect(wrapper.find('button').exists()).toBe(false)
  })

  it('shows remove button when removable', () => {
    const wrapper = mount(OlTag, {
      props: { label: 'Tag', removable: true },
    })
    expect(wrapper.find('button').exists()).toBe(true)
    expect(wrapper.find('[aria-label="Remove tag"]').exists()).toBe(true)
  })

  it('emits remove on button click', async () => {
    const wrapper = mount(OlTag, {
      props: { label: 'Tag', removable: true },
    })
    await wrapper.find('button').trigger('click')
    expect(wrapper.emitted('remove')).toHaveLength(1)
  })

  it('applies custom color class', () => {
    const wrapper = mount(OlTag, {
      props: { label: 'Tag', color: 'bg-emerald-100 text-emerald-800' },
    })
    expect(wrapper.classes().join(' ')).toContain('bg-emerald-100')
    expect(wrapper.classes().join(' ')).toContain('text-emerald-800')
  })

  it('applies default color when no color prop', () => {
    const wrapper = mount(OlTag, {
      props: { label: 'Tag' },
    })
    expect(wrapper.classes().join(' ')).toContain('bg-[var(--ol-bg-tertiary)]')
  })

  it('accepts custom class', () => {
    const wrapper = mount(OlTag, {
      props: { label: 'Tag', class: 'ml-2' },
    })
    expect(wrapper.classes()).toContain('ml-2')
  })
})
