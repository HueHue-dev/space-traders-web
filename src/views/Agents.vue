<script setup lang="ts">
import { onMounted } from 'vue'
import { type QTableProps } from 'quasar'
import { apiManager } from '@/services/api/ApiManagerService.ts'
import { usePagination } from '@/composables/usePagination.ts'
import type { Agent } from '@/models/agent.ts'

const agentApi = apiManager.getAgentApi()

const {
  data: agents,
  loading,
  pagination,
  onRequest,
  initialize,
} = usePagination<Agent>((page, limit) => agentApi.getAgents(page, limit), 'symbol')

onMounted(() => {
  initialize()
})

const columns: QTableProps['columns'] = [
  { name: 'symbol', label: 'Symbol', field: 'symbol', align: 'left', sortable: true },
  {
    name: 'headquarters',
    label: 'Headquarters',
    field: 'headquarters',
    align: 'left',
    sortable: true,
  },
  {
    name: 'credits',
    label: 'Credits',
    field: 'credits',
    align: 'left',
    sortable: true,
  },
  {
    name: 'startingFaction',
    label: 'Starting faction',
    field: 'startingFaction',
    align: 'left',
    sortable: true,
  },
  {
    name: 'shipCount',
    label: 'Ship count',
    field: 'shipCount',
    align: 'left',
    sortable: true,
  },
]
</script>

<template>
  <div class="q-pa-md">
    <q-table
      flat
      bordered
      title="Agents"
      :rows="agents"
      :columns="columns"
      row-key="symbol"
      :loading="loading"
      separator="horizontal"
      no-data-label="Couldn't find any agents"
      :rowsPerPageOptions="[5, 10, 20]"
      @request="onRequest"
      v-model:pagination="pagination"
    />
  </div>
</template>
