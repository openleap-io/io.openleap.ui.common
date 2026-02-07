import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { nextTick, defineComponent, h, inject } from 'vue'
import OlToast from '../../src/components/toast/OlToast.vue'
import OlToastProvider from '../../src/components/toast/OlToastProvider.vue'
import type { ToastContext } from '../../src/components/toast/OlToastProvider.vue'

describe('OlToast', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
    document.body.innerHTML = ''
  })

  it('renders with title', () => {
    const wrapper = mount(OlToast, {
      props: { title: 'Hello', duration: 0 },
    })
    expect(wrapper.text()).toContain('Hello')
  })

  it('renders with description', () => {
    const wrapper = mount(OlToast, {
      props: { title: 'Title', description: 'Some details', duration: 0 },
    })
    expect(wrapper.text()).toContain('Some details')
  })

  it('renders success icon for success type', () => {
    const wrapper = mount(OlToast, {
      props: { type: 'success', title: 'Done', duration: 0 },
    })
    expect(wrapper.find('svg').exists()).toBe(true)
    expect(wrapper.find('[role="alert"]').classes().join(' ')).toContain('border-l-emerald-500')
  })

  it('renders error icon for error type', () => {
    const wrapper = mount(OlToast, {
      props: { type: 'error', title: 'Failed', duration: 0 },
    })
    expect(wrapper.find('[role="alert"]').classes().join(' ')).toContain('border-l-[var(--ol-status-error)]')
  })

  it('renders warning style', () => {
    const wrapper = mount(OlToast, {
      props: { type: 'warning', title: 'Careful', duration: 0 },
    })
    expect(wrapper.find('[role="alert"]').classes().join(' ')).toContain('border-l-amber-500')
  })

  it('renders info style', () => {
    const wrapper = mount(OlToast, {
      props: { type: 'info', title: 'Note', duration: 0 },
    })
    expect(wrapper.find('[role="alert"]').classes().join(' ')).toContain('border-l-blue-500')
  })

  it('has alert role', () => {
    const wrapper = mount(OlToast, {
      props: { title: 'Test', duration: 0 },
    })
    expect(wrapper.find('[role="alert"]').exists()).toBe(true)
  })

  it('renders close button', () => {
    const wrapper = mount(OlToast, {
      props: { title: 'Test', duration: 0 },
    })
    expect(wrapper.find('[aria-label="Close notification"]').exists()).toBe(true)
  })

  it('emits close on close button click', async () => {
    const wrapper = mount(OlToast, {
      props: { title: 'Test', duration: 0 },
    })
    await wrapper.find('[aria-label="Close notification"]').trigger('click')
    expect(wrapper.emitted('close')).toBeTruthy()
  })

  it('shows progress bar when duration > 0', () => {
    const wrapper = mount(OlToast, {
      props: { title: 'Test', duration: 5000 },
    })
    expect(wrapper.find('.absolute.bottom-0').exists()).toBe(true)
  })

  it('hides progress bar when duration is 0', () => {
    const wrapper = mount(OlToast, {
      props: { title: 'Test', duration: 0 },
    })
    expect(wrapper.find('.absolute.bottom-0').exists()).toBe(false)
  })
})

describe('OlToastProvider', () => {
  afterEach(() => {
    document.body.innerHTML = ''
  })

  it('renders slot content', () => {
    const wrapper = mount(OlToastProvider, {
      slots: { default: '<div>App content</div>' },
      attachTo: document.body,
    })
    expect(wrapper.text()).toContain('App content')
  })

  it('provides toast context to children', async () => {
    let ctx: ToastContext | undefined

    const Child = defineComponent({
      setup() {
        ctx = inject<ToastContext>('ol-toast')
        return () => h('div', 'child')
      },
    })

    mount(OlToastProvider, {
      slots: { default: () => h(Child) },
      attachTo: document.body,
    })

    expect(ctx).toBeDefined()
    expect(ctx!.add).toBeInstanceOf(Function)
    expect(ctx!.remove).toBeInstanceOf(Function)
  })

  it('adds and renders toast via context', async () => {
    let ctx: ToastContext | undefined

    const Child = defineComponent({
      setup() {
        ctx = inject<ToastContext>('ol-toast')
        return () => h('button', { onClick: () => ctx!.add({ type: 'success', title: 'Added!' }) }, 'Add Toast')
      },
    })

    const wrapper = mount(OlToastProvider, {
      slots: { default: () => h(Child) },
      attachTo: document.body,
    })

    await wrapper.find('button').trigger('click')
    await nextTick()
    expect(document.body.textContent).toContain('Added!')
  })

  it('removes toast via context', async () => {
    let ctx: ToastContext | undefined

    const Child = defineComponent({
      setup() {
        ctx = inject<ToastContext>('ol-toast')
        return () => h('div', 'child')
      },
    })

    mount(OlToastProvider, {
      slots: { default: () => h(Child) },
      attachTo: document.body,
    })

    const id = ctx!.add({ type: 'info', title: 'Temporary' })
    await nextTick()
    expect(document.body.textContent).toContain('Temporary')

    ctx!.remove(id)
    await nextTick()
    expect(document.body.textContent).not.toContain('Temporary')
  })
})
