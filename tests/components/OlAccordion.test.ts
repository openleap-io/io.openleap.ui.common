import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { defineComponent, h } from 'vue'
import OlAccordion from '../../src/components/data-display/OlAccordion.vue'
import OlAccordionItem from '../../src/components/data-display/OlAccordionItem.vue'

function createAccordion(props: Record<string, unknown> = {}) {
  return defineComponent({
    setup() {
      return () =>
        h(OlAccordion, { type: 'single', collapsible: true, ...props }, {
          default: () => [
            h(OlAccordionItem, { value: 'item-1' }, {
              trigger: () => 'Question 1',
              default: () => 'Answer 1',
            }),
            h(OlAccordionItem, { value: 'item-2' }, {
              trigger: () => 'Question 2',
              default: () => 'Answer 2',
            }),
          ],
        })
    },
  })
}

describe('OlAccordion', () => {
  it('renders accordion items', () => {
    const wrapper = mount(createAccordion())
    expect(wrapper.text()).toContain('Question 1')
    expect(wrapper.text()).toContain('Question 2')
  })

  it('renders trigger buttons', () => {
    const wrapper = mount(createAccordion())
    const triggers = wrapper.findAll('button')
    expect(triggers.length).toBeGreaterThanOrEqual(2)
  })

  it('expands item on trigger click', async () => {
    const wrapper = mount(createAccordion())
    const triggers = wrapper.findAll('button')
    await triggers[0].trigger('click')
    expect(wrapper.text()).toContain('Answer 1')
  })

  it('renders with default value expanded', () => {
    const wrapper = mount(createAccordion({ defaultValue: 'item-1' }))
    expect(wrapper.text()).toContain('Answer 1')
  })

  it('renders chevron icons', () => {
    const wrapper = mount(createAccordion())
    expect(wrapper.findAll('svg').length).toBeGreaterThanOrEqual(2)
  })

  it('renders multiple accordion items', () => {
    const wrapper = mount(createAccordion())
    // Each OlAccordionItem has a border-b class
    const borderedDivs = wrapper.findAll('.border-b')
    expect(borderedDivs.length).toBe(2)
  })
})
