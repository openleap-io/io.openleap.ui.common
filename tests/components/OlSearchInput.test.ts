import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { mount } from '@vue/test-utils'
import OlSearchInput from '../../src/components/input/OlSearchInput.vue'

describe('OlSearchInput', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('renders an input element', () => {
    const wrapper = mount(OlSearchInput)
    expect(wrapper.find('input').exists()).toBe(true)
  })

  it('renders with default placeholder', () => {
    const wrapper = mount(OlSearchInput)
    expect(wrapper.find('input').attributes('placeholder')).toBe('Search...')
  })

  it('renders with custom placeholder', () => {
    const wrapper = mount(OlSearchInput, {
      props: { placeholder: 'Find items...' },
    })
    expect(wrapper.find('input').attributes('placeholder')).toBe('Find items...')
  })

  it('shows search icon by default', () => {
    const wrapper = mount(OlSearchInput)
    expect(wrapper.find('[data-testid="search-icon"]').exists()).toBe(true)
    expect(wrapper.find('[data-testid="search-spinner"]').exists()).toBe(false)
  })

  it('shows spinner when loading', () => {
    const wrapper = mount(OlSearchInput, {
      props: { loading: true },
    })
    expect(wrapper.find('[data-testid="search-spinner"]').exists()).toBe(true)
    expect(wrapper.find('[data-testid="search-icon"]').exists()).toBe(false)
  })

  it('emits update:modelValue on input', async () => {
    const wrapper = mount(OlSearchInput, {
      props: { modelValue: '' },
    })
    await wrapper.find('input').setValue('test')
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['test'])
  })

  it('emits search event after debounce', async () => {
    const wrapper = mount(OlSearchInput, {
      props: { modelValue: '', debounceMs: 300 },
    })
    await wrapper.find('input').setValue('query')
    expect(wrapper.emitted('search')).toBeUndefined()

    vi.advanceTimersByTime(300)
    expect(wrapper.emitted('search')?.[0]).toEqual(['query'])
  })

  it('does not emit search before debounce expires', async () => {
    const wrapper = mount(OlSearchInput, {
      props: { modelValue: '', debounceMs: 500 },
    })
    await wrapper.find('input').setValue('query')
    vi.advanceTimersByTime(200)
    expect(wrapper.emitted('search')).toBeUndefined()
  })

  it('shows clear button when value exists', () => {
    const wrapper = mount(OlSearchInput, {
      props: { modelValue: 'test' },
    })
    expect(wrapper.find('[data-testid="clear-button"]').exists()).toBe(true)
  })

  it('hides clear button when value is empty', () => {
    const wrapper = mount(OlSearchInput, {
      props: { modelValue: '' },
    })
    expect(wrapper.find('[data-testid="clear-button"]').exists()).toBe(false)
  })

  it('emits empty value and search on clear', async () => {
    const wrapper = mount(OlSearchInput, {
      props: { modelValue: 'test' },
    })
    await wrapper.find('[data-testid="clear-button"]').trigger('click')
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([''])
    expect(wrapper.emitted('search')?.[0]).toEqual([''])
  })
})
