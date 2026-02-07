import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { defineComponent, h } from 'vue'
import { useClipboard } from '../../src/composables/useClipboard'

function createWrapper() {
  let result: ReturnType<typeof useClipboard>

  const Comp = defineComponent({
    setup() {
      result = useClipboard()
      return () => h('div')
    },
  })

  const wrapper = mount(Comp)
  return { wrapper, get result() { return result } }
}

describe('useClipboard', () => {
  let originalClipboard: Clipboard

  beforeEach(() => {
    originalClipboard = navigator.clipboard
    vi.useFakeTimers()
  })

  afterEach(() => {
    Object.defineProperty(navigator, 'clipboard', {
      value: originalClipboard,
      writable: true,
      configurable: true,
    })
    vi.useRealTimers()
  })

  it('returns copy function and copied ref', () => {
    const { result } = createWrapper()
    expect(result.copy).toBeTypeOf('function')
    expect(result.copied).toBeDefined()
    expect(result.copied.value).toBe(false)
  })

  it('copies text and sets copied to true', async () => {
    const writeText = vi.fn().mockResolvedValue(undefined)
    Object.defineProperty(navigator, 'clipboard', {
      value: { writeText },
      writable: true,
      configurable: true,
    })

    const { result } = createWrapper()
    await result.copy('Hello')
    expect(writeText).toHaveBeenCalledWith('Hello')
    expect(result.copied.value).toBe(true)
  })

  it('resets copied to false after 2 seconds', async () => {
    const writeText = vi.fn().mockResolvedValue(undefined)
    Object.defineProperty(navigator, 'clipboard', {
      value: { writeText },
      writable: true,
      configurable: true,
    })

    const { result } = createWrapper()
    await result.copy('Hello')
    expect(result.copied.value).toBe(true)

    vi.advanceTimersByTime(2000)
    expect(result.copied.value).toBe(false)
  })

  it('does not throw when clipboard API is unavailable', async () => {
    Object.defineProperty(navigator, 'clipboard', {
      value: undefined,
      writable: true,
      configurable: true,
    })

    const { result } = createWrapper()
    await expect(result.copy('test')).resolves.not.toThrow()
    expect(result.copied.value).toBe(false)
  })
})
