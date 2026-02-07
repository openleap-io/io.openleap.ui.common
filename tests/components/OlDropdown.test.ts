import { describe, it, expect, afterEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { nextTick } from 'vue'
import OlDropdown from '../../src/components/dropdown/OlDropdown.vue'
import type { MenuItem } from '../../src/lib/types'

const items: MenuItem[] = [
  { id: '1', label: 'Edit', shortcut: '⌘E' },
  { id: '2', label: 'Copy' },
  { id: 'sep', label: '', separator: true },
  { id: '3', label: 'Delete', disabled: true },
]

describe('OlDropdown', () => {
  afterEach(() => {
    document.body.innerHTML = ''
  })

  it('renders trigger slot', () => {
    const wrapper = mount(OlDropdown, {
      props: { items },
      slots: { trigger: '<button>Open Menu</button>' },
    })
    expect(wrapper.text()).toContain('Open Menu')
  })

  it('renders trigger button', () => {
    const wrapper = mount(OlDropdown, {
      props: { items },
      slots: { trigger: '<button data-testid="trigger">Menu</button>' },
    })
    expect(wrapper.find('[data-testid="trigger"]').exists()).toBe(true)
  })

  it('opens menu on trigger click', async () => {
    const wrapper = mount(OlDropdown, {
      props: { items },
      slots: { trigger: '<button>Menu</button>' },
      attachTo: document.body,
    })
    await wrapper.find('button').trigger('click')
    await nextTick()
    const menuContent = document.querySelector('[role="menu"]')
    expect(menuContent).not.toBeNull()
  })

  it('renders menu items when open', async () => {
    const wrapper = mount(OlDropdown, {
      props: { items },
      slots: { trigger: '<button>Menu</button>' },
      attachTo: document.body,
    })
    await wrapper.find('button').trigger('click')
    await nextTick()
    expect(document.body.textContent).toContain('Edit')
    expect(document.body.textContent).toContain('Copy')
    expect(document.body.textContent).toContain('Delete')
  })

  it('renders shortcut text', async () => {
    const wrapper = mount(OlDropdown, {
      props: { items },
      slots: { trigger: '<button>Menu</button>' },
      attachTo: document.body,
    })
    await wrapper.find('button').trigger('click')
    await nextTick()
    expect(document.body.textContent).toContain('⌘E')
  })

  it('renders separator', async () => {
    const wrapper = mount(OlDropdown, {
      props: { items },
      slots: { trigger: '<button>Menu</button>' },
      attachTo: document.body,
    })
    await wrapper.find('button').trigger('click')
    await nextTick()
    const separator = document.querySelector('[role="separator"]')
    expect(separator).not.toBeNull()
  })

  it('renders label when provided', async () => {
    const wrapper = mount(OlDropdown, {
      props: { items, label: 'Actions' },
      slots: { trigger: '<button>Menu</button>' },
      attachTo: document.body,
    })
    await wrapper.find('button').trigger('click')
    await nextTick()
    expect(document.body.textContent).toContain('Actions')
  })

  it('marks disabled items', async () => {
    const wrapper = mount(OlDropdown, {
      props: { items },
      slots: { trigger: '<button>Menu</button>' },
      attachTo: document.body,
    })
    await wrapper.find('button').trigger('click')
    await nextTick()
    const menuItems = document.querySelectorAll('[role="menuitem"]')
    const deleteItem = Array.from(menuItems).find(el => el.textContent?.includes('Delete'))
    expect(deleteItem?.getAttribute('data-disabled')).toBeDefined()
  })
})
