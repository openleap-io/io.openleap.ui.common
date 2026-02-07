import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import OlTooltip from '../../src/components/tooltip/OlTooltip.vue'
import OlTooltipProvider from '../../src/components/tooltip/OlTooltipProvider.vue'
import { defineComponent, h } from 'vue'

// Helper: wrap OlTooltip in OlTooltipProvider
function mountTooltip(props: Record<string, unknown> = {}, slotContent = 'Hover me') {
  const Wrapper = defineComponent({
    setup() {
      return () =>
        h(OlTooltipProvider, null, {
          default: () =>
            h(OlTooltip, props, {
              default: () => h('button', slotContent),
            }),
        })
    },
  })
  return mount(Wrapper, { attachTo: document.body })
}

describe('OlTooltip', () => {
  it('renders trigger slot', () => {
    const wrapper = mountTooltip({ content: 'Tooltip text' })
    expect(wrapper.text()).toContain('Hover me')
    wrapper.unmount()
  })

  it('renders the trigger button', () => {
    const wrapper = mountTooltip({ content: 'Tip' })
    expect(wrapper.find('button').exists()).toBe(true)
    wrapper.unmount()
  })

  it('does not show tooltip content by default', () => {
    const wrapper = mountTooltip({ content: 'Hidden tip' })
    expect(document.body.textContent).not.toContain('Hidden tip')
    wrapper.unmount()
  })
})

describe('OlTooltipProvider', () => {
  it('renders slot content', () => {
    const wrapper = mount(OlTooltipProvider, {
      slots: { default: '<span>Child content</span>' },
    })
    expect(wrapper.text()).toContain('Child content')
  })

  it('accepts delay props', () => {
    const wrapper = mount(OlTooltipProvider, {
      props: { delayDuration: 500, skipDelayDuration: 100 },
      slots: { default: '<span>Content</span>' },
    })
    expect(wrapper.exists()).toBe(true)
  })
})
