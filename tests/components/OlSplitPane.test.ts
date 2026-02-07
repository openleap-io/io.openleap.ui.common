import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { h } from 'vue'
import OlSplitPane from '../../src/components/layout/OlSplitPane.vue'
import { Pane } from 'splitpanes'

describe('OlSplitPane', () => {
  it('renders the splitpanes container', () => {
    const wrapper = mount(OlSplitPane)
    expect(wrapper.find('.splitpanes').exists()).toBe(true)
  })

  it('applies custom class', () => {
    const wrapper = mount(OlSplitPane, {
      props: { class: 'my-split' },
    })
    expect(wrapper.classes()).toContain('my-split')
  })

  it('applies our custom styling class', () => {
    const wrapper = mount(OlSplitPane)
    expect(wrapper.classes()).toContain('splitpanes-ol')
  })

  // splitpanes library: "vertical" class = vertical splitter = horizontal layout
  it('defaults to horizontal direction (vertical splitter)', () => {
    const wrapper = mount(OlSplitPane)
    expect(wrapper.find('.splitpanes--vertical').exists()).toBe(true)
  })

  // splitpanes library: "horizontal" class = horizontal splitter = vertical layout
  it('renders vertical direction (horizontal splitter)', () => {
    const wrapper = mount(OlSplitPane, {
      props: { direction: 'vertical' },
    })
    expect(wrapper.find('.splitpanes--horizontal').exists()).toBe(true)
  })

  it('renders Pane slot content', () => {
    const wrapper = mount(OlSplitPane, {
      slots: {
        default: () => [
          h(Pane, null, { default: () => h('div', 'Left') }),
          h(Pane, null, { default: () => h('div', 'Right') }),
        ],
      },
    })
    expect(wrapper.text()).toContain('Left')
    expect(wrapper.text()).toContain('Right')
    expect(wrapper.findAll('.splitpanes__pane')).toHaveLength(2)
  })
})
