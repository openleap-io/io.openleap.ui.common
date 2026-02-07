import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import OlAvatar from '../../src/components/avatar/OlAvatar.vue'
import OlAvatarGroup from '../../src/components/avatar/OlAvatarGroup.vue'
import { defineComponent, h } from 'vue'

describe('OlAvatar', () => {
  it('renders initials when no src', () => {
    const wrapper = mount(OlAvatar, {
      props: { name: 'Alice Johnson' },
    })
    expect(wrapper.text()).toBe('AJ')
  })

  it('renders single initial for single name', () => {
    const wrapper = mount(OlAvatar, {
      props: { name: 'Alice' },
    })
    expect(wrapper.text()).toBe('A')
  })

  it('renders ? when no name', () => {
    const wrapper = mount(OlAvatar)
    expect(wrapper.text()).toBe('?')
  })

  it('renders img when src provided', () => {
    const wrapper = mount(OlAvatar, {
      props: { src: 'https://example.com/avatar.jpg', name: 'Alice' },
    })
    expect(wrapper.find('img').exists()).toBe(true)
    expect(wrapper.find('img').attributes('src')).toBe('https://example.com/avatar.jpg')
  })

  it('shows fallback on image error', async () => {
    const wrapper = mount(OlAvatar, {
      props: { src: 'bad-url.jpg', name: 'Alice' },
    })
    await wrapper.find('img').trigger('error')
    expect(wrapper.find('img').exists()).toBe(false)
    expect(wrapper.text()).toBe('A')
  })

  it('applies size classes for sm', () => {
    const wrapper = mount(OlAvatar, {
      props: { name: 'A', size: 'sm' },
    })
    expect(wrapper.classes().join(' ')).toContain('size-7')
  })

  it('applies size classes for lg', () => {
    const wrapper = mount(OlAvatar, {
      props: { name: 'A', size: 'lg' },
    })
    expect(wrapper.classes().join(' ')).toContain('size-12')
  })

  it('applies background color from name hash', () => {
    const wrapper = mount(OlAvatar, {
      props: { name: 'Alice' },
    })
    const style = wrapper.attributes('style') || ''
    expect(style).toContain('background-color')
  })

  it('accepts custom class', () => {
    const wrapper = mount(OlAvatar, {
      props: { name: 'Alice', class: 'my-custom' },
    })
    expect(wrapper.classes()).toContain('my-custom')
  })
})

describe('OlAvatarGroup', () => {
  function createGroup(count: number, max = 3) {
    return defineComponent({
      setup() {
        return () =>
          h(OlAvatarGroup, { max, size: 'md' }, {
            default: () =>
              Array.from({ length: count }, (_, i) =>
                h(OlAvatar, { name: `User ${i + 1}`, key: i })
              ),
          })
      },
    })
  }

  it('shows all avatars when count <= max', () => {
    const wrapper = mount(createGroup(2, 3))
    expect(wrapper.text()).not.toContain('+')
  })

  it('shows overflow counter when count > max', () => {
    const wrapper = mount(createGroup(5, 3))
    expect(wrapper.text()).toContain('+2')
  })

  it('renders correct number of visible avatars', () => {
    const wrapper = mount(createGroup(5, 3))
    // 3 avatars + 1 overflow counter
    const spans = wrapper.findAll('.rounded-full')
    expect(spans.length).toBeGreaterThanOrEqual(3)
  })

  it('accepts custom class', () => {
    const Comp = defineComponent({
      setup() {
        return () =>
          h(OlAvatarGroup, { max: 2, class: 'gap-custom' }, {
            default: () => [h(OlAvatar, { name: 'A' })],
          })
      },
    })
    const wrapper = mount(Comp)
    expect(wrapper.classes()).toContain('gap-custom')
  })
})
