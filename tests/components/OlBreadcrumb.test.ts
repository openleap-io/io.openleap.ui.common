import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import OlBreadcrumb from '../../src/components/navigation/OlBreadcrumb.vue'

describe('OlBreadcrumb', () => {
  const items = [
    { label: 'Home', to: '/' },
    { label: 'Products', to: '/products' },
    { label: 'Widget Pro' },
  ]

  it('renders all items', () => {
    const wrapper = mount(OlBreadcrumb, { props: { items } })
    expect(wrapper.text()).toContain('Home')
    expect(wrapper.text()).toContain('Products')
    expect(wrapper.text()).toContain('Widget Pro')
  })

  it('renders links for non-last items with to', () => {
    const wrapper = mount(OlBreadcrumb, { props: { items } })
    const links = wrapper.findAll('a')
    expect(links).toHaveLength(2)
    expect(links[0].attributes('href')).toBe('/')
    expect(links[1].attributes('href')).toBe('/products')
  })

  it('renders last item as plain text', () => {
    const wrapper = mount(OlBreadcrumb, { props: { items } })
    const lastLi = wrapper.findAll('li').at(-1)!
    expect(lastLi.find('a').exists()).toBe(false)
    expect(lastLi.text()).toContain('Widget Pro')
  })

  it('marks last item with aria-current="page"', () => {
    const wrapper = mount(OlBreadcrumb, { props: { items } })
    expect(wrapper.find('[aria-current="page"]').exists()).toBe(true)
    expect(wrapper.find('[aria-current="page"]').text()).toContain('Widget Pro')
  })

  it('renders separators between items', () => {
    const wrapper = mount(OlBreadcrumb, { props: { items } })
    const separators = wrapper.findAll('[aria-hidden="true"]')
    expect(separators).toHaveLength(2)
    expect(separators[0].text()).toBe('/')
  })

  it('uses custom separator', () => {
    const wrapper = mount(OlBreadcrumb, { props: { items, separator: '>' } })
    const separators = wrapper.findAll('[aria-hidden="true"]')
    expect(separators[0].text()).toBe('>')
  })

  it('has nav with aria-label', () => {
    const wrapper = mount(OlBreadcrumb, { props: { items } })
    expect(wrapper.find('nav').attributes('aria-label')).toBe('Breadcrumb')
  })

  it('renders single item without separators', () => {
    const wrapper = mount(OlBreadcrumb, {
      props: { items: [{ label: 'Home' }] },
    })
    expect(wrapper.findAll('[aria-hidden="true"]')).toHaveLength(0)
    expect(wrapper.text()).toContain('Home')
  })

  it('accepts custom class', () => {
    const wrapper = mount(OlBreadcrumb, {
      props: { items, class: 'my-nav' },
    })
    expect(wrapper.find('nav').classes()).toContain('my-nav')
  })
})
