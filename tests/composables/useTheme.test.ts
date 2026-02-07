import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { defineComponent, h, nextTick } from 'vue'
import { useTheme } from '../../src/composables/useTheme'

let mockDarkMode = false

function createWrapper() {
  let result: ReturnType<typeof useTheme>

  const Comp = defineComponent({
    setup() {
      result = useTheme()
      return () => h('div')
    },
  })

  const wrapper = mount(Comp)
  return { wrapper, get result() { return result } }
}

describe('useTheme', () => {
  let originalMatchMedia: typeof window.matchMedia

  beforeEach(() => {
    originalMatchMedia = window.matchMedia
    mockDarkMode = false
    window.matchMedia = vi.fn((query: string) => ({
      matches: query === '(prefers-color-scheme: dark)' ? mockDarkMode : false,
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })) as unknown as typeof window.matchMedia

    localStorage.clear()
    document.documentElement.classList.remove('dark')
    // Reset the module-level theme ref by setting it back to system
    const { result } = createWrapper()
    result.setTheme('system')
  })

  afterEach(() => {
    window.matchMedia = originalMatchMedia
  })

  it('returns theme, isDark, setTheme, toggleTheme', () => {
    const { result } = createWrapper()
    expect(result.theme).toBeDefined()
    expect(result.isDark).toBeDefined()
    expect(result.setTheme).toBeTypeOf('function')
    expect(result.toggleTheme).toBeTypeOf('function')
  })

  it('defaults to system theme', () => {
    const { result } = createWrapper()
    expect(result.theme.value).toBe('system')
  })

  it('setTheme("dark") sets theme to dark and persists to localStorage', async () => {
    const { result } = createWrapper()
    result.setTheme('dark')
    await nextTick()
    expect(result.theme.value).toBe('dark')
    expect(result.isDark.value).toBe(true)
    expect(localStorage.getItem('ol-theme')).toBe('dark')
  })

  it('setTheme("light") sets theme to light', async () => {
    const { result } = createWrapper()
    result.setTheme('light')
    await nextTick()
    expect(result.theme.value).toBe('light')
    expect(result.isDark.value).toBe(false)
  })

  it('toggleTheme toggles from light to dark', async () => {
    const { result } = createWrapper()
    result.setTheme('light')
    await nextTick()
    result.toggleTheme()
    await nextTick()
    expect(result.theme.value).toBe('dark')
  })

  it('toggleTheme toggles from dark to light', async () => {
    const { result } = createWrapper()
    result.setTheme('dark')
    await nextTick()
    result.toggleTheme()
    await nextTick()
    expect(result.theme.value).toBe('light')
  })

  it('adds "dark" class to documentElement when dark', async () => {
    const { result } = createWrapper()
    result.setTheme('dark')
    await nextTick()
    expect(document.documentElement.classList.contains('dark')).toBe(true)
  })

  it('removes "dark" class from documentElement when light', async () => {
    document.documentElement.classList.add('dark')
    const { result } = createWrapper()
    result.setTheme('light')
    await nextTick()
    expect(document.documentElement.classList.contains('dark')).toBe(false)
  })

  it('reads stored theme from localStorage on mount', async () => {
    localStorage.setItem('ol-theme', 'dark')
    const { result } = createWrapper()
    await nextTick()
    expect(result.theme.value).toBe('dark')
  })
})
