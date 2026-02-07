import { describe, it, expect, afterEach, beforeAll } from 'vitest'
import { mount, VueWrapper } from '@vue/test-utils'
import { nextTick } from 'vue'
import OlCommandPalette from '../../src/components/navigation/OlCommandPalette.vue'
import type { CommandGroup } from '../../src/lib/types'

beforeAll(() => {
  // jsdom doesn't implement scrollIntoView (needed by Reka UI Listbox)
  Element.prototype.scrollIntoView = () => {}
})

const groups: CommandGroup[] = [
  {
    heading: 'Actions',
    items: [
      { id: 'new', label: 'New File', shortcut: 'Ctrl+N' },
      { id: 'open', label: 'Open File', shortcut: 'Ctrl+O' },
    ],
  },
  {
    heading: 'Navigation',
    items: [
      { id: 'dash', label: 'Go to Dashboard' },
      { id: 'settings', label: 'Go to Settings' },
    ],
  },
]

let wrapper: VueWrapper | null = null

async function waitForPortal() {
  await nextTick()
  await nextTick()
  await nextTick()
}

afterEach(() => {
  wrapper?.unmount()
  document.body.innerHTML = ''
})

describe('OlCommandPalette', () => {
  it('renders dialog content when open', async () => {
    wrapper = mount(OlCommandPalette, {
      props: { open: true, groups },
      attachTo: document.body,
    })
    await waitForPortal()
    expect(document.body.textContent).toContain('Actions')
    expect(document.body.textContent).toContain('Navigation')
  })

  it('renders group headings', async () => {
    wrapper = mount(OlCommandPalette, {
      props: { open: true, groups },
      attachTo: document.body,
    })
    await waitForPortal()
    expect(document.body.textContent).toContain('Actions')
    expect(document.body.textContent).toContain('Navigation')
  })

  it('renders command items', async () => {
    wrapper = mount(OlCommandPalette, {
      props: { open: true, groups },
      attachTo: document.body,
    })
    await waitForPortal()
    expect(document.body.textContent).toContain('New File')
    expect(document.body.textContent).toContain('Open File')
    expect(document.body.textContent).toContain('Go to Dashboard')
  })

  it('renders keyboard shortcuts', async () => {
    wrapper = mount(OlCommandPalette, {
      props: { open: true, groups },
      attachTo: document.body,
    })
    await waitForPortal()
    expect(document.body.textContent).toContain('Ctrl+N')
    expect(document.body.textContent).toContain('Ctrl+O')
  })

  it('renders search input with placeholder', async () => {
    wrapper = mount(OlCommandPalette, {
      props: { open: true, groups },
      attachTo: document.body,
    })
    await waitForPortal()
    const input = document.querySelector('input')
    expect(input).toBeTruthy()
    expect(input?.getAttribute('placeholder')).toBe('Type a command or search...')
  })

  it('renders custom placeholder', async () => {
    wrapper = mount(OlCommandPalette, {
      props: { open: true, groups, placeholder: 'Search...' },
      attachTo: document.body,
    })
    await waitForPortal()
    const input = document.querySelector('input')
    expect(input?.getAttribute('placeholder')).toBe('Search...')
  })

  it('does not render when closed', async () => {
    wrapper = mount(OlCommandPalette, {
      props: { open: false, groups },
      attachTo: document.body,
    })
    await waitForPortal()
    expect(document.body.textContent).not.toContain('Actions')
  })

  it('renders search icon', async () => {
    wrapper = mount(OlCommandPalette, {
      props: { open: true, groups },
      attachTo: document.body,
    })
    await waitForPortal()
    expect(document.querySelector('svg')).toBeTruthy()
  })
})
