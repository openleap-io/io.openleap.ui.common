import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import OlErrorState from '../../src/components/feedback/OlErrorState.vue'

describe('OlErrorState', () => {
  it('renders default title', () => {
    const wrapper = mount(OlErrorState)
    expect(wrapper.text()).toContain('Something went wrong')
  })

  it('renders custom title', () => {
    const wrapper = mount(OlErrorState, {
      props: { title: 'Connection Lost' },
    })
    expect(wrapper.text()).toContain('Connection Lost')
  })

  it('renders description when provided', () => {
    const wrapper = mount(OlErrorState, {
      props: { description: 'Please try again later.' },
    })
    expect(wrapper.text()).toContain('Please try again later.')
  })

  it('does not render description when not provided', () => {
    const wrapper = mount(OlErrorState)
    const paragraphs = wrapper.findAll('p')
    expect(paragraphs).toHaveLength(0)
  })

  it('renders alert triangle icon', () => {
    const wrapper = mount(OlErrorState)
    expect(wrapper.find('svg').exists()).toBe(true)
  })

  it('renders default retry button', () => {
    const wrapper = mount(OlErrorState)
    expect(wrapper.find('button').text()).toBe('Try again')
  })

  it('emits retry on button click', async () => {
    const wrapper = mount(OlErrorState)
    await wrapper.find('button').trigger('click')
    expect(wrapper.emitted('retry')).toHaveLength(1)
  })

  it('renders custom action slot', () => {
    const wrapper = mount(OlErrorState, {
      slots: { action: '<a href="/help">Get help</a>' },
    })
    expect(wrapper.text()).toContain('Get help')
    expect(wrapper.find('a').exists()).toBe(true)
  })

  it('accepts custom class', () => {
    const wrapper = mount(OlErrorState, {
      props: { class: 'my-error' },
    })
    expect(wrapper.classes()).toContain('my-error')
  })
})
