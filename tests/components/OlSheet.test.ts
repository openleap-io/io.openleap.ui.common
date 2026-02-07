import { describe, it, expect, afterEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { nextTick } from 'vue'
import OlSheet from '../../src/components/dialog/OlSheet.vue'

describe('OlSheet', () => {
  let wrapper: ReturnType<typeof mount> | null = null

  afterEach(() => {
    wrapper?.unmount()
    wrapper = null
    document.body.innerHTML = ''
  })

  it('renders without errors', () => {
    wrapper = mount(OlSheet, {
      props: { open: false },
    })
    expect(wrapper.exists()).toBe(true)
  })

  it('shows content when open', async () => {
    wrapper = mount(OlSheet, {
      props: { open: true, title: 'Sheet Title' },
      slots: { default: 'Sheet content' },
      attachTo: document.body,
    })
    await nextTick()
    expect(document.body.textContent).toContain('Sheet Title')
    expect(document.body.textContent).toContain('Sheet content')
  })

  it('does not show content when closed', async () => {
    wrapper = mount(OlSheet, {
      props: { open: false, title: 'Hidden Sheet' },
      slots: { default: 'Hidden content' },
      attachTo: document.body,
    })
    await nextTick()
    expect(document.body.textContent).not.toContain('Hidden content')
  })

  it('renders close button', async () => {
    wrapper = mount(OlSheet, {
      props: { open: true, title: 'Title' },
      attachTo: document.body,
    })
    await nextTick()
    expect(document.querySelector('[aria-label="Close"]')).not.toBeNull()
  })

  it('applies right side classes by default', async () => {
    wrapper = mount(OlSheet, {
      props: { open: true, title: 'Title' },
      attachTo: document.body,
    })
    await nextTick()
    const content = document.querySelector('[role="dialog"]')
    expect(content?.className).toContain('right-0')
  })

  it('applies left side classes', async () => {
    wrapper = mount(OlSheet, {
      props: { open: true, title: 'Title', side: 'left' },
      attachTo: document.body,
    })
    await nextTick()
    const content = document.querySelector('[role="dialog"]')
    expect(content?.className).toContain('left-0')
  })

  it('applies size class', async () => {
    wrapper = mount(OlSheet, {
      props: { open: true, title: 'Title', size: 'lg' },
      attachTo: document.body,
    })
    await nextTick()
    const content = document.querySelector('[role="dialog"]')
    expect(content?.className).toContain('w-[540px]')
  })

  it('defaults to md size', async () => {
    wrapper = mount(OlSheet, {
      props: { open: true, title: 'Title' },
      attachTo: document.body,
    })
    await nextTick()
    const content = document.querySelector('[role="dialog"]')
    expect(content?.className).toContain('w-[400px]')
  })

  it('has accessible dialog role', async () => {
    wrapper = mount(OlSheet, {
      props: { open: true, title: 'Title' },
      attachTo: document.body,
    })
    await nextTick()
    expect(document.querySelector('[role="dialog"]')).not.toBeNull()
  })
})
