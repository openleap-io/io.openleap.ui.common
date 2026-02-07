import { describe, it, expect, afterEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { nextTick } from 'vue'
import OlAlertDialog from '../../src/components/dialog/OlAlertDialog.vue'

describe('OlAlertDialog', () => {
  let wrapper: ReturnType<typeof mount> | null = null

  afterEach(() => {
    wrapper?.unmount()
    wrapper = null
    document.body.innerHTML = ''
  })

  it('renders without errors', () => {
    wrapper = mount(OlAlertDialog, {
      props: { open: false },
    })
    expect(wrapper.exists()).toBe(true)
  })

  it('shows content when open', async () => {
    wrapper = mount(OlAlertDialog, {
      props: { open: true, title: 'Confirm Action', description: 'Are you sure?' },
      attachTo: document.body,
    })
    await nextTick()
    expect(document.body.textContent).toContain('Confirm Action')
    expect(document.body.textContent).toContain('Are you sure?')
  })

  it('renders confirm and cancel buttons with default labels', async () => {
    wrapper = mount(OlAlertDialog, {
      props: { open: true, title: 'Test' },
      attachTo: document.body,
    })
    await nextTick()
    expect(document.body.textContent).toContain('Confirm')
    expect(document.body.textContent).toContain('Cancel')
  })

  it('renders custom button labels', async () => {
    wrapper = mount(OlAlertDialog, {
      props: { open: true, title: 'Delete', confirmLabel: 'Delete', cancelLabel: 'Keep' },
      attachTo: document.body,
    })
    await nextTick()
    expect(document.body.textContent).toContain('Delete')
    expect(document.body.textContent).toContain('Keep')
  })

  it('does not show content when closed', async () => {
    wrapper = mount(OlAlertDialog, {
      props: { open: false, title: 'Hidden' },
      attachTo: document.body,
    })
    await nextTick()
    expect(document.body.textContent).not.toContain('Hidden')
  })

  it('renders trigger slot', () => {
    wrapper = mount(OlAlertDialog, {
      props: { open: false },
      slots: { trigger: '<button>Delete</button>' },
    })
    expect(wrapper.text()).toContain('Delete')
  })

  it('applies danger variant styles to confirm button', async () => {
    wrapper = mount(OlAlertDialog, {
      props: { open: true, title: 'Delete', variant: 'danger' },
      attachTo: document.body,
    })
    await nextTick()
    const buttons = document.querySelectorAll('[role="alertdialog"] button')
    const confirmBtn = Array.from(buttons).find(b => b.textContent?.includes('Confirm'))
    expect(confirmBtn?.className).toContain('bg-[var(--ol-status-error)]')
  })

  it('applies warning variant styles to confirm button', async () => {
    wrapper = mount(OlAlertDialog, {
      props: { open: true, title: 'Archive', variant: 'warning' },
      attachTo: document.body,
    })
    await nextTick()
    const buttons = document.querySelectorAll('[role="alertdialog"] button')
    const confirmBtn = Array.from(buttons).find(b => b.textContent?.includes('Confirm'))
    expect(confirmBtn?.className).toContain('bg-amber-500')
  })

  it('emits confirm on confirm click', async () => {
    wrapper = mount(OlAlertDialog, {
      props: { open: true, title: 'Confirm' },
      attachTo: document.body,
    })
    await nextTick()
    const buttons = document.querySelectorAll('[role="alertdialog"] button')
    const confirmBtn = Array.from(buttons).find(b => b.textContent?.includes('Confirm')) as HTMLElement
    confirmBtn?.click()
    await nextTick()
    expect(wrapper.emitted('confirm')).toBeTruthy()
    expect(wrapper.emitted('update:open')?.[0]).toEqual([false])
  })

  it('emits cancel on cancel click', async () => {
    wrapper = mount(OlAlertDialog, {
      props: { open: true, title: 'Confirm' },
      attachTo: document.body,
    })
    await nextTick()
    const buttons = document.querySelectorAll('[role="alertdialog"] button')
    const cancelBtn = Array.from(buttons).find(b => b.textContent?.includes('Cancel')) as HTMLElement
    cancelBtn?.click()
    await nextTick()
    expect(wrapper.emitted('cancel')).toBeTruthy()
    expect(wrapper.emitted('update:open')?.[0]).toEqual([false])
  })
})
