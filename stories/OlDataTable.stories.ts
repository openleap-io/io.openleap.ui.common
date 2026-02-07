import type { Meta, StoryObj } from '@storybook/vue3'
import { createColumnHelper } from '@tanstack/vue-table'
import { OlDataTable } from '@/components/data-display'

const meta: Meta<typeof OlDataTable> = {
  title: 'Components/DataDisplay/OlDataTable',
  component: OlDataTable,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof OlDataTable>

interface User {
  name: string
  email: string
  role: string
  status: string
}

const columnHelper = createColumnHelper<User>()

const columns = [
  columnHelper.accessor('name', { header: 'Name' }),
  columnHelper.accessor('email', { header: 'Email' }),
  columnHelper.accessor('role', { header: 'Role' }),
  columnHelper.accessor('status', { header: 'Status' }),
]

const data: User[] = Array.from({ length: 25 }, (_, i) => ({
  name: `User ${i + 1}`,
  email: `user${i + 1}@example.com`,
  role: i % 3 === 0 ? 'Admin' : i % 3 === 1 ? 'Editor' : 'Viewer',
  status: i % 2 === 0 ? 'Active' : 'Inactive',
}))

export const Default: Story = {
  render: () => ({
    components: { OlDataTable },
    setup() {
      return { columns, data }
    },
    template: '<OlDataTable :columns="columns" :data="data" />',
  }),
}

export const WithSorting: Story = {
  render: () => ({
    components: { OlDataTable },
    setup() {
      return { columns, data }
    },
    template: '<OlDataTable :columns="columns" :data="data" sorting />',
  }),
}

export const WithPagination: Story = {
  render: () => ({
    components: { OlDataTable },
    setup() {
      return { columns, data }
    },
    template: '<OlDataTable :columns="columns" :data="data" pagination :page-size="5" />',
  }),
}

export const Loading: Story = {
  render: () => ({
    components: { OlDataTable },
    setup() {
      return { columns }
    },
    template: '<OlDataTable :columns="columns" :data="[]" loading :page-size="5" />',
  }),
}

export const Empty: Story = {
  render: () => ({
    components: { OlDataTable },
    setup() {
      return { columns }
    },
    template: '<OlDataTable :columns="columns" :data="[]" empty-message="No users found." />',
  }),
}
