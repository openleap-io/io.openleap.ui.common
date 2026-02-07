import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { nextTick } from 'vue'
import { createColumnHelper } from '@tanstack/vue-table'
import OlDataTable from '../../src/components/data-display/OlDataTable.vue'

interface Row {
  name: string
  email: string
}

const columnHelper = createColumnHelper<Row>()

const columns = [
  columnHelper.accessor('name', { header: 'Name' }),
  columnHelper.accessor('email', { header: 'Email' }),
]

const data: Row[] = Array.from({ length: 15 }, (_, i) => ({
  name: `User ${i + 1}`,
  email: `user${i + 1}@test.com`,
}))

describe('OlDataTable', () => {
  it('renders table headers', () => {
    const wrapper = mount(OlDataTable, {
      props: { columns, data },
    })
    expect(wrapper.find('th').text()).toContain('Name')
    expect(wrapper.findAll('th')[1].text()).toContain('Email')
  })

  it('renders data rows', () => {
    const wrapper = mount(OlDataTable, {
      props: { columns, data },
    })
    expect(wrapper.text()).toContain('User 1')
    expect(wrapper.text()).toContain('user1@test.com')
  })

  it('shows empty message when no data', () => {
    const wrapper = mount(OlDataTable, {
      props: { columns, data: [], emptyMessage: 'Nothing here.' },
    })
    expect(wrapper.text()).toContain('Nothing here.')
  })

  it('shows default empty message', () => {
    const wrapper = mount(OlDataTable, {
      props: { columns, data: [] },
    })
    expect(wrapper.text()).toContain('No data available.')
  })

  it('shows skeleton rows when loading', () => {
    const wrapper = mount(OlDataTable, {
      props: { columns, data: [], loading: true, pageSize: 3 },
    })
    // Should render 3 skeleton rows × 2 columns = 6 skeleton cells
    const skeletons = wrapper.findAll('.animate-pulse')
    expect(skeletons.length).toBe(6)
  })

  it('renders pagination controls', () => {
    const wrapper = mount(OlDataTable, {
      props: { columns, data, pagination: true, pageSize: 5 },
    })
    expect(wrapper.text()).toContain('Page 1 of 3')
    expect(wrapper.find('button').text()).toContain('Previous')
  })

  it('navigates to next page', async () => {
    const wrapper = mount(OlDataTable, {
      props: { columns, data, pagination: true, pageSize: 5 },
    })
    const nextBtn = wrapper.findAll('button').find(b => b.text() === 'Next')!
    await nextBtn.trigger('click')
    await nextTick()
    expect(wrapper.text()).toContain('Page 2 of 3')
  })

  it('disables previous on first page', () => {
    const wrapper = mount(OlDataTable, {
      props: { columns, data, pagination: true, pageSize: 5 },
    })
    const prevBtn = wrapper.findAll('button').find(b => b.text() === 'Previous')!
    expect(prevBtn.attributes('disabled')).toBeDefined()
  })

  it('emits rowClick on row click', async () => {
    const wrapper = mount(OlDataTable, {
      props: { columns, data },
    })
    const row = wrapper.find('tbody tr')
    await row.trigger('click')
    expect(wrapper.emitted('rowClick')?.[0][0]).toEqual(data[0])
  })

  it('accepts custom class', () => {
    const wrapper = mount(OlDataTable, {
      props: { columns, data, class: 'my-table' },
    })
    expect(wrapper.classes()).toContain('my-table')
  })

  it('renders sort indicators when sorting enabled', () => {
    const wrapper = mount(OlDataTable, {
      props: { columns, data, sorting: true },
    })
    // Should render unsorted indicators (the dual-arrow SVGs)
    expect(wrapper.findAll('th svg').length).toBeGreaterThan(0)
  })
})
