import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import OlButtonGroup from '../../src/components/button/OlButtonGroup.vue'

describe('OlButtonGroup', () => {
  it('renders with group role', () => {
    const wrapper = mount(OlButtonGroup)
    expect(wrapper.attributes('role')).toBe('group')
  })

  it('renders default slot', () => {
    const wrapper = mount(OlButtonGroup, {
      slots: { default: '<button>A</button><button>B</button>' },
    })
    expect(wrapper.text()).toContain('A')
    expect(wrapper.text()).toContain('B')
  })

  it('applies horizontal classes by default', () => {
    const wrapper = mount(OlButtonGroup)
    expect(wrapper.classes()).toContain('inline-flex')
    // Should not have flex-col for horizontal
    expect(wrapper.classes()).not.toContain('flex-col')
  })

  it('applies vertical classes', () => {
    const wrapper = mount(OlButtonGroup, {
      props: { orientation: 'vertical' },
    })
    expect(wrapper.classes()).toContain('flex-col')
  })

  it('accepts custom class', () => {
    const wrapper = mount(OlButtonGroup, {
      props: { class: 'my-group' },
    })
    expect(wrapper.classes()).toContain('my-group')
  })

  it('renders multiple children', () => {
    const wrapper = mount(OlButtonGroup, {
      slots: { default: '<button>1</button><button>2</button><button>3</button>' },
    })
    expect(wrapper.findAll('button')).toHaveLength(3)
  })
})
