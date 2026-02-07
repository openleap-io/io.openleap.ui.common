import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { defineComponent, ref, h, nextTick } from 'vue'
import OlTabs from '../../src/components/tabs/OlTabs.vue'
import OlTabList from '../../src/components/tabs/OlTabList.vue'
import OlTabTrigger from '../../src/components/tabs/OlTabTrigger.vue'
import OlTabContent from '../../src/components/tabs/OlTabContent.vue'

function createTabs(defaultValue = 'tab1') {
  return defineComponent({
    setup() {
      const active = ref(defaultValue)
      return () =>
        h(OlTabs, { modelValue: active.value, 'onUpdate:modelValue': (v: string) => { active.value = v } }, {
          default: () => [
            h(OlTabList, null, {
              default: () => [
                h(OlTabTrigger, { value: 'tab1' }, { default: () => 'Tab One' }),
                h(OlTabTrigger, { value: 'tab2' }, { default: () => 'Tab Two' }),
                h(OlTabTrigger, { value: 'tab3', disabled: true }, { default: () => 'Disabled' }),
              ],
            }),
            h(OlTabContent, { value: 'tab1' }, { default: () => 'Content One' }),
            h(OlTabContent, { value: 'tab2' }, { default: () => 'Content Two' }),
            h(OlTabContent, { value: 'tab3' }, { default: () => 'Content Three' }),
          ],
        })
    },
  })
}

describe('OlTabs', () => {
  it('renders tab triggers', () => {
    const wrapper = mount(createTabs())
    expect(wrapper.text()).toContain('Tab One')
    expect(wrapper.text()).toContain('Tab Two')
  })

  it('shows active tab content', () => {
    const wrapper = mount(createTabs('tab1'))
    expect(wrapper.text()).toContain('Content One')
  })

  it('switches content on trigger click', async () => {
    const wrapper = mount(createTabs('tab1'))
    const triggers = wrapper.findAll('[role="tab"]')
    // Reka UI handles focus + pointerdown for tab activation
    await triggers[1].trigger('focus')
    await triggers[1].trigger('pointerdown')
    await triggers[1].trigger('click')
    await nextTick()
    await nextTick()
    expect(wrapper.text()).toContain('Content Two')
  })

  it('marks active trigger', () => {
    const wrapper = mount(createTabs('tab1'))
    const triggers = wrapper.findAll('[role="tab"]')
    expect(triggers[0].attributes('data-state')).toBe('active')
    expect(triggers[1].attributes('data-state')).toBe('inactive')
  })

  it('renders tablist with role', () => {
    const wrapper = mount(createTabs())
    expect(wrapper.find('[role="tablist"]').exists()).toBe(true)
  })

  it('renders tabpanel with role', () => {
    const wrapper = mount(createTabs('tab1'))
    expect(wrapper.find('[role="tabpanel"]').exists()).toBe(true)
  })

  it('disables tab when disabled prop is set', () => {
    const wrapper = mount(createTabs())
    const triggers = wrapper.findAll('[role="tab"]')
    expect(triggers[2].attributes('disabled')).toBeDefined()
  })

  it('renders correct number of triggers', () => {
    const wrapper = mount(createTabs())
    expect(wrapper.findAll('[role="tab"]')).toHaveLength(3)
  })
})
