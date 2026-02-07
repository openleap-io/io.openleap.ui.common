import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { defineComponent, h } from 'vue'
import { useBreakpoints } from '../../src/composables/useBreakpoints'

// Mock matchMedia
const listeners = new Map<string, Set<(e: { matches: boolean }) => void>>()
const queryStates = new Map<string, boolean>()

function mockMatchMedia(query: string): MediaQueryList {
  if (!listeners.has(query)) {
    listeners.set(query, new Set())
  }
  return {
    matches: queryStates.get(query) ?? false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn((_event: string, cb: (e: { matches: boolean }) => void) => {
      listeners.get(query)!.add(cb)
    }),
    removeEventListener: vi.fn((_event: string, cb: (e: { matches: boolean }) => void) => {
      listeners.get(query)!.delete(cb)
    }),
    dispatchEvent: vi.fn(),
  } as unknown as MediaQueryList
}

function setBreakpoint(bp: 'mobile' | 'tablet' | 'desktop') {
  queryStates.clear()
  if (bp === 'mobile') {
    queryStates.set('(max-width: 767px)', true)
  } else if (bp === 'tablet') {
    queryStates.set('(min-width: 768px) and (max-width: 1024px)', true)
  } else {
    queryStates.set('(min-width: 1025px)', true)
  }
}

function createWrapper() {
  let result: ReturnType<typeof useBreakpoints>

  const Comp = defineComponent({
    setup() {
      result = useBreakpoints()
      return () => h('div')
    },
  })

  const wrapper = mount(Comp)
  return { wrapper, get result() { return result } }
}

describe('useBreakpoints', () => {
  let originalMatchMedia: typeof window.matchMedia

  beforeEach(() => {
    originalMatchMedia = window.matchMedia
    window.matchMedia = vi.fn(mockMatchMedia) as unknown as typeof window.matchMedia
    listeners.clear()
    queryStates.clear()
  })

  afterEach(() => {
    window.matchMedia = originalMatchMedia
  })

  it('returns isMobile, isTablet, isDesktop, current', () => {
    const { result } = createWrapper()
    expect(result.isMobile).toBeDefined()
    expect(result.isTablet).toBeDefined()
    expect(result.isDesktop).toBeDefined()
    expect(result.current).toBeDefined()
  })

  it('defaults to desktop when no media query matches', () => {
    const { result } = createWrapper()
    expect(result.current.value).toBe('desktop')
  })

  it('detects mobile breakpoint', () => {
    setBreakpoint('mobile')
    const { result } = createWrapper()
    expect(result.isMobile.value).toBe(true)
    expect(result.current.value).toBe('mobile')
  })

  it('detects tablet breakpoint', () => {
    setBreakpoint('tablet')
    const { result } = createWrapper()
    expect(result.isTablet.value).toBe(true)
    expect(result.current.value).toBe('tablet')
  })

  it('detects desktop breakpoint', () => {
    setBreakpoint('desktop')
    const { result } = createWrapper()
    expect(result.isDesktop.value).toBe(true)
    expect(result.current.value).toBe('desktop')
  })
})
