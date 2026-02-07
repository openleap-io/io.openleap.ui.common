<script setup lang="ts">
import { computed, ref } from 'vue'
import {
  useVueTable,
  getCoreRowModel,
  getSortedRowModel,
  getPaginationRowModel,
  FlexRender,
  type ColumnDef,
  type SortingState,
} from '@tanstack/vue-table'
import { cn } from '@/lib/cn'
import OlSkeleton from '../feedback/OlSkeleton.vue'

const props = withDefaults(defineProps<{
  columns: ColumnDef<any, any>[]
  data: any[]
  sorting?: boolean
  pagination?: boolean
  pageSize?: number
  loading?: boolean
  emptyMessage?: string
  class?: string
}>(), {
  sorting: false,
  pagination: false,
  pageSize: 10,
  loading: false,
  emptyMessage: 'No data available.',
})

const emit = defineEmits<{
  rowClick: [row: any]
}>()

const sortingState = ref<SortingState>([])

const table = useVueTable({
  get data() { return props.data },
  get columns() { return props.columns },
  state: {
    get sorting() { return sortingState.value },
  },
  onSortingChange: (updaterOrValue) => {
    sortingState.value =
      typeof updaterOrValue === 'function'
        ? updaterOrValue(sortingState.value)
        : updaterOrValue
  },
  getCoreRowModel: getCoreRowModel(),
  getSortedRowModel: props.sorting ? getSortedRowModel() : undefined,
  getPaginationRowModel: props.pagination ? getPaginationRowModel() : undefined,
  initialState: {
    pagination: { pageSize: props.pageSize },
  },
})

const pageCount = computed(() => table.getPageCount())
const currentPage = computed(() => table.getState().pagination.pageIndex + 1)
</script>

<template>
  <div :class="cn('w-full overflow-auto', props.class)">
    <table class="w-full border-collapse text-sm">
      <thead>
        <tr v-for="headerGroup in table.getHeaderGroups()" :key="headerGroup.id">
          <th
            v-for="header in headerGroup.headers"
            :key="header.id"
            class="border-b border-[var(--ol-border)] px-4 py-3 text-left font-medium text-[var(--ol-text-muted)]"
            :class="{ 'cursor-pointer select-none': sorting && header.column.getCanSort() }"
            @click="sorting && header.column.getToggleSortingHandler()?.($event)"
          >
            <div class="flex items-center gap-1">
              <FlexRender
                :render="header.column.columnDef.header"
                :props="header.getContext()"
              />
              <!-- Sort indicator -->
              <template v-if="sorting && header.column.getCanSort()">
                <svg
                  v-if="header.column.getIsSorted() === 'asc'"
                  class="size-3.5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path d="m18 15-6-6-6 6" />
                </svg>
                <svg
                  v-else-if="header.column.getIsSorted() === 'desc'"
                  class="size-3.5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path d="m6 9 6 6 6-6" />
                </svg>
                <svg
                  v-else
                  class="size-3.5 opacity-30"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path d="m7 15 5 5 5-5" />
                  <path d="m7 9 5-5 5 5" />
                </svg>
              </template>
            </div>
          </th>
        </tr>
      </thead>

      <tbody>
        <!-- Loading skeleton -->
        <template v-if="loading">
          <tr v-for="i in pageSize" :key="`skeleton-${i}`">
            <td
              v-for="col in columns.length"
              :key="`skeleton-col-${col}`"
              class="border-b border-[var(--ol-border)] px-4 py-3"
            >
              <OlSkeleton class="h-4 w-3/4 rounded" />
            </td>
          </tr>
        </template>

        <!-- Empty state -->
        <tr v-else-if="table.getRowModel().rows.length === 0">
          <td
            :colspan="columns.length"
            class="px-4 py-12 text-center text-[var(--ol-text-muted)]"
          >
            {{ emptyMessage }}
          </td>
        </tr>

        <!-- Data rows -->
        <template v-else>
          <tr
            v-for="row in table.getRowModel().rows"
            :key="row.id"
            class="transition-colors hover:bg-[var(--ol-bg-tertiary)]"
            :class="{ 'cursor-pointer': $attrs.onRowClick }"
            @click="emit('rowClick', row.original)"
          >
            <td
              v-for="cell in row.getVisibleCells()"
              :key="cell.id"
              class="border-b border-[var(--ol-border)] px-4 py-3 text-[var(--ol-text-primary)]"
            >
              <FlexRender
                :render="cell.column.columnDef.cell"
                :props="cell.getContext()"
              />
            </td>
          </tr>
        </template>
      </tbody>
    </table>

    <!-- Pagination -->
    <div
      v-if="pagination && !loading && table.getRowModel().rows.length > 0"
      class="flex items-center justify-between border-t border-[var(--ol-border)] px-4 py-3 text-sm text-[var(--ol-text-muted)]"
    >
      <span>Page {{ currentPage }} of {{ pageCount }}</span>
      <div class="flex gap-2">
        <button
          type="button"
          class="rounded-md border border-[var(--ol-border)] px-3 py-1 text-sm transition-colors hover:bg-[var(--ol-bg-tertiary)] disabled:opacity-50"
          :disabled="!table.getCanPreviousPage()"
          @click="table.previousPage()"
        >
          Previous
        </button>
        <button
          type="button"
          class="rounded-md border border-[var(--ol-border)] px-3 py-1 text-sm transition-colors hover:bg-[var(--ol-bg-tertiary)] disabled:opacity-50"
          :disabled="!table.getCanNextPage()"
          @click="table.nextPage()"
        >
          Next
        </button>
      </div>
    </div>
  </div>
</template>
