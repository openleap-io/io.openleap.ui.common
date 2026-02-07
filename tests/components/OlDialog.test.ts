import { describe, it, expect, afterEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { nextTick } from 'vue'
import OlDialog from '../../src/components/dialog/OlDialog.vue'

describe('OlDialog', () => {
  let wrapper: ReturnType<typeof mount> | null = null

  afterEach(() => {
    wrapper?.unmount()
    wrapper = null
    // Clean up portal content left in body
    document.body.innerHTML = ''
  })

  it('renders without errors', () => {
    wrapper = mount(OlDialog, {
      props: { open: false },
    })
    expect(wrapper.exists()).toBe(true)
  })

  it('renders trigger slot when provided', () => {
    wrapper = mount(OlDialog, {
      props: { open: false },
      slots: { trigger: '<button>Open</button>' },
    })
    expect(wrapper.text()).toContain('Open')
  })

  it('shows dialog content when open', async () => {
    wrapper = mount(OlDialog, {
      props: { open: true, title: 'Test Dialog' },
      slots: { default: 'Dialog body' },
      attachTo: document.body,
    })
    await nextTick()
    expect(document.body.textContent).toContain('Test Dialog')
    expect(document.body.textContent).toContain('Dialog body')
  })

  it('renders description', async () => {
    wrapper = mount(OlDialog, {
      props: { open: true, title: 'Title', description: 'A description' },
      attachTo: document.body,
    })
    await nextTick()
    expect(document.body.textContent).toContain('A description')
  })

  it('renders footer slot', async () => {
    wrapper = mount(OlDialog, {
      props: { open: true, title: 'Title' },
      slots: { footer: '<button>Save</button>' },
      attachTo: document.body,
    })
    await nextTick()
    expect(document.body.textContent).toContain('Save')
  })

  it('does not render content when closed', async () => {
    wrapper = mount(OlDialog, {
      props: { open: false, title: 'Hidden Dialog' },
      slots: { default: 'Hidden content' },
      attachTo: document.body,
    })
    await nextTick()
    expect(document.body.textContent).not.toContain('Hidden content')
  })

  it('renders close button when open', async () => {
    wrapper = mount(OlDialog, {
      props: { open: true, title: 'Title' },
      attachTo: document.body,
    })
    await nextTick()
    expect(document.querySelector('[aria-label="Close"]')).not.toBeNull()
  })

  it('applies size class', async () => {
    wrapper = mount(OlDialog, {
      props: { open: true, title: 'Title', size: 'lg' },
      attachTo: document.body,
    })
    await nextTick()
    const content = document.querySelector('[role="dialog"]')
    expect(content?.className).toContain('max-w-[640px]')
  })

  it('defaults to md size', async () => {
    wrapper = mount(OlDialog, {
      props: { open: true, title: 'Title' },
      attachTo: document.body,
    })
    await nextTick()
    const content = document.querySelector('[role="dialog"]')
    expect(content?.className).toContain('max-w-[500px]')
  })

  it('has accessible dialog role', async () => {
    wrapper = mount(OlDialog, {
      props: { open: true, title: 'Title' },
      attachTo: document.body,
    })
    await nextTick()
    expect(document.querySelector('[role="dialog"]')).not.toBeNull()
  })
})
