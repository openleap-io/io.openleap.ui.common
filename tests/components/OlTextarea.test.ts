import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import OlTextarea from '../../src/components/input/OlTextarea.vue'

describe('OlTextarea', () => {
  it('renders a textarea element', () => {
    const wrapper = mount(OlTextarea)
    expect(wrapper.find('textarea').exists()).toBe(true)
  })

  it('renders with placeholder', () => {
    const wrapper = mount(OlTextarea, {
      props: { placeholder: 'Enter text...' },
    })
    expect(wrapper.find('textarea').attributes('placeholder')).toBe('Enter text...')
  })

  it('renders with custom rows', () => {
    const wrapper = mount(OlTextarea, {
      props: { rows: 5 },
    })
    expect(wrapper.find('textarea').attributes('rows')).toBe('5')
  })

  it('emits update:modelValue on input', async () => {
    const wrapper = mount(OlTextarea, {
      props: { modelValue: '' },
    })
    await wrapper.find('textarea').setValue('hello')
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['hello'])
  })

  it('shows character count when maxLength is set', () => {
    const wrapper = mount(OlTextarea, {
      props: { modelValue: 'hello', maxLength: 100 },
    })
    expect(wrapper.text()).toContain('5/100')
  })

  it('sets maxlength attribute on textarea', () => {
    const wrapper = mount(OlTextarea, {
      props: { maxLength: 50 },
    })
    expect(wrapper.find('textarea').attributes('maxlength')).toBe('50')
  })

  it('shows error message', () => {
    const wrapper = mount(OlTextarea, {
      props: { error: 'Required field' },
    })
    expect(wrapper.text()).toContain('Required field')
  })

  it('applies error border styling', () => {
    const wrapper = mount(OlTextarea, {
      props: { error: 'Error' },
    })
    const textarea = wrapper.find('textarea')
    expect(textarea.classes().join(' ')).toContain('border-[var(--ol-status-error)]')
  })

  it('is disabled when disabled prop is true', () => {
    const wrapper = mount(OlTextarea, {
      props: { disabled: true },
    })
    expect(wrapper.find('textarea').attributes('disabled')).toBeDefined()
  })

  it('applies resize-none when autoResize is true', () => {
    const wrapper = mount(OlTextarea, {
      props: { autoResize: true },
    })
    expect(wrapper.find('textarea').classes()).toContain('resize-none')
  })

  it('does not show character count without maxLength', () => {
    const wrapper = mount(OlTextarea, {
      props: { modelValue: 'hello' },
    })
    expect(wrapper.text()).not.toContain('/')
  })
})
