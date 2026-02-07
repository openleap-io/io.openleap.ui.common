import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { defineComponent, ref, readonly, provide, h } from 'vue'
import { useToast } from '../../src/composables/useToast'
import type { ToastContext, ToastItem } from '../../src/components/toast/OlToastProvider.vue'

function createWrapper(provideContext?: ToastContext) {
  const result = ref<ReturnType<typeof useToast> | null>(null)
  const error = ref<Error | null>(null)

  const Child = defineComponent({
    setup() {
      try {
        result.value = useToast()
      } catch (e) {
        error.value = e as Error
      }
      return () => h('div')
    },
  })

  const Parent = defineComponent({
    setup() {
      if (provideContext) {
        provide('ol-toast', provideContext)
      }
      return () => h(Child)
    },
  })

  const wrapper = mount(Parent)
  return { wrapper, result, error }
}

function createMockContext(): ToastContext & { items: ToastItem[] } {
  const items: ToastItem[] = []
  let counter = 0
  const toastsRef = ref<ToastItem[]>([])

  return {
    items,
    add(toast: Omit<ToastItem, 'id'>) {
      const id = `toast-${++counter}`
      const item = { ...toast, id }
      items.push(item)
      toastsRef.value = [...items]
      return id
    },
    remove(id: string) {
      const idx = items.findIndex(t => t.id === id)
      if (idx >= 0) items.splice(idx, 1)
      toastsRef.value = [...items]
    },
    toasts: readonly(toastsRef),
  }
}

describe('useToast', () => {
  it('throws if used outside OlToastProvider', () => {
    const { error } = createWrapper()
    expect(error.value).toBeInstanceOf(Error)
    expect(error.value!.message).toContain('OlToastProvider')
  })

  it('returns toast methods and toasts ref when context is provided', () => {
    const ctx = createMockContext()
    const { result } = createWrapper(ctx)
    expect(result.value).toBeDefined()
    expect(result.value!.toast).toBeDefined()
    expect(result.value!.toast.success).toBeTypeOf('function')
    expect(result.value!.toast.error).toBeTypeOf('function')
    expect(result.value!.toast.warning).toBeTypeOf('function')
    expect(result.value!.toast.info).toBeTypeOf('function')
    expect(result.value!.toasts).toBeDefined()
    expect(result.value!.remove).toBeTypeOf('function')
  })

  it('toast.success adds a success toast', () => {
    const ctx = createMockContext()
    const { result } = createWrapper(ctx)
    result.value!.toast.success('Done!')
    expect(ctx.items).toHaveLength(1)
    expect(ctx.items[0].type).toBe('success')
    expect(ctx.items[0].title).toBe('Done!')
  })

  it('toast.error adds an error toast', () => {
    const ctx = createMockContext()
    const { result } = createWrapper(ctx)
    result.value!.toast.error('Failed', { description: 'Something went wrong' })
    expect(ctx.items).toHaveLength(1)
    expect(ctx.items[0].type).toBe('error')
    expect(ctx.items[0].title).toBe('Failed')
    expect(ctx.items[0].description).toBe('Something went wrong')
  })

  it('toast.warning adds a warning toast', () => {
    const ctx = createMockContext()
    const { result } = createWrapper(ctx)
    result.value!.toast.warning('Watch out')
    expect(ctx.items[0].type).toBe('warning')
  })

  it('toast.info adds an info toast', () => {
    const ctx = createMockContext()
    const { result } = createWrapper(ctx)
    result.value!.toast.info('FYI')
    expect(ctx.items[0].type).toBe('info')
  })

  it('passes duration option through', () => {
    const ctx = createMockContext()
    const { result } = createWrapper(ctx)
    result.value!.toast.success('Quick', { duration: 1000 })
    expect(ctx.items[0].duration).toBe(1000)
  })

  it('remove removes a toast by id', () => {
    const ctx = createMockContext()
    const { result } = createWrapper(ctx)
    const id = result.value!.toast.success('Temp')
    expect(ctx.items).toHaveLength(1)
    result.value!.remove(id)
    expect(ctx.items).toHaveLength(0)
  })
})
