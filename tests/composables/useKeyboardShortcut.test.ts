import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { defineComponent, h, ref } from 'vue'
import { useKeyboardShortcut } from '../../src/composables/useKeyboardShortcut'

function createWrapper(shortcut: string, handler: () => void, options?: { enabled?: ReturnType<typeof ref<boolean>> }) {
  const Comp = defineComponent({
    setup() {
      useKeyboardShortcut(shortcut, handler, options)
      return () => h('div')
    },
  })

  return mount(Comp)
}

function fireKeydown(key: string, opts: Partial<KeyboardEventInit> = {}) {
  window.dispatchEvent(new KeyboardEvent('keydown', { key, bubbles: true, ...opts }))
}

describe('useKeyboardShortcut', () => {
  it('calls handler on matching key press', () => {
    const handler = vi.fn()
    createWrapper('k', handler)
    fireKeydown('k')
    expect(handler).toHaveBeenCalledOnce()
  })

  it('does not call handler on non-matching key', () => {
    const handler = vi.fn()
    createWrapper('k', handler)
    fireKeydown('j')
    expect(handler).not.toHaveBeenCalled()
  })

  it('handles mod+k shortcut (Ctrl on non-Mac)', () => {
    const handler = vi.fn()
    createWrapper('mod+k', handler)
    // Without Ctrl — should not fire
    fireKeydown('k')
    expect(handler).not.toHaveBeenCalled()
    // With Ctrl — should fire
    fireKeydown('k', { ctrlKey: true })
    expect(handler).toHaveBeenCalledOnce()
  })

  it('handles shift modifier', () => {
    const handler = vi.fn()
    createWrapper('shift+p', handler)
    fireKeydown('p')
    expect(handler).not.toHaveBeenCalled()
    fireKeydown('p', { shiftKey: true })
    expect(handler).toHaveBeenCalledOnce()
  })

  it('handles alt modifier', () => {
    const handler = vi.fn()
    createWrapper('alt+x', handler)
    fireKeydown('x')
    expect(handler).not.toHaveBeenCalled()
    fireKeydown('x', { altKey: true })
    expect(handler).toHaveBeenCalledOnce()
  })

  it('respects enabled option', () => {
    const handler = vi.fn()
    const enabled = ref(false)
    createWrapper('k', handler, { enabled })
    fireKeydown('k')
    expect(handler).not.toHaveBeenCalled()
    enabled.value = true
    fireKeydown('k')
    expect(handler).toHaveBeenCalledOnce()
  })

  it('ignores key presses in input elements', () => {
    const handler = vi.fn()
    createWrapper('k', handler)

    const input = document.createElement('input')
    document.body.appendChild(input)
    input.focus()

    // Dispatch from input — handler should not fire
    input.dispatchEvent(new KeyboardEvent('keydown', { key: 'k', bubbles: true }))
    expect(handler).not.toHaveBeenCalled()

    document.body.removeChild(input)
  })

  it('ignores key presses in textarea elements', () => {
    const handler = vi.fn()
    createWrapper('k', handler)

    const textarea = document.createElement('textarea')
    document.body.appendChild(textarea)
    textarea.focus()

    textarea.dispatchEvent(new KeyboardEvent('keydown', { key: 'k', bubbles: true }))
    expect(handler).not.toHaveBeenCalled()

    document.body.removeChild(textarea)
  })

  it('removes listener on unmount', () => {
    const handler = vi.fn()
    const wrapper = createWrapper('k', handler)
    wrapper.unmount()
    fireKeydown('k')
    expect(handler).not.toHaveBeenCalled()
  })

  it('handles escape key', () => {
    const handler = vi.fn()
    createWrapper('escape', handler)
    fireKeydown('Escape')
    expect(handler).toHaveBeenCalledOnce()
  })
})
