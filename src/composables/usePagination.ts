import type { PaginatedResponse } from '@/services/api/BaseApiService.ts'
import { type Ref, ref } from 'vue'

export interface PaginationState {
  sortBy: string
  descending: boolean
  page: number
  rowsPerPage: number
  rowsNumber: number
}

export function usePagination<T>(
  fetchFunction: (page: number, limit: number) => Promise<PaginatedResponse<T>>,
  initialSortBy: string = 'name'
) {
  const data = ref<T[]>([]) as Ref<T[]>
  const loading = ref(false)

  const pagination = ref<PaginationState>({
    sortBy: initialSortBy,
    descending: false,
    page: 1,
    rowsPerPage: 5,
    rowsNumber: 0,
  })

  const loadData = async (page: number, rowsPerPage: number) => {
    loading.value = true
    try {
      const response = await fetchFunction(page, rowsPerPage)
      data.value = response.data
      pagination.value.rowsNumber = response.meta.total

      return response
    } catch (error) {
      console.error('Failed to load data:', error)
      throw error
    } finally {
      loading.value = false
    }
  }

  const onRequest = async (props: any) => {
    const { page, rowsPerPage, sortBy, descending } = props.pagination

    try {
      await loadData(page, rowsPerPage)
      pagination.value.page = page
      pagination.value.rowsPerPage = rowsPerPage
      pagination.value.sortBy = sortBy
      pagination.value.descending = descending
    } catch (error) {
      console.error('Request failed:', error)
    }
  }

  const initialize = async () => {
    await loadData(pagination.value.page, pagination.value.rowsPerPage)
  }

  return {
    data,
    loading,
    pagination,
    onRequest,
    initialize,
  }
}