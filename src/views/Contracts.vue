<script setup lang="ts">
import { onMounted } from 'vue'
import { type QTableProps } from 'quasar'
import { apiManager } from '@/services/api/ApiManagerService.ts'
import { usePagination } from '@/composables/usePagination.ts'
import type { Contract } from '@/models/contract.ts'

const agentApi = apiManager.getAgentApi()

const { data: contracts, lastUpdated, loading, pagination, onRequest, initialize } = usePagination<Contract>(
  (page, limit) => agentApi.getContracts(page, limit),
  'name'
)

onMounted(() => {
  initialize()
})

const columns: QTableProps['columns'] = [
  {
    name: 'factionSymbol',
    label: 'Faction symbol',
    field: 'factionSymbol',
    align: 'left',
    sortable: true,
  },
  { name: 'type', label: 'Type', field: 'type', align: 'left' },
  {
    name: 'accepted',
    label: 'Is accepted',
    field: 'accepted',
    align: 'left',
    sortable: true,
  },
  {
    name: 'fulfilled',
    label: 'Is fulfilled',
    field: 'fulfilled',
    align: 'left',
    sortable: true,
  },
  {
    name: 'deadlineToAccept',
    label: 'Deadline to accept',
    field: 'deadlineToAccept',
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
      title="Contracts"
      :rows="contracts"
      :columns="columns"
      row-key="id"
      :loading="loading"
      separator="horizontal"
      no-data-label="Couldn't find any contracts"
      :rowsPerPageOptions="[5, 10, 20]"
      @request="onRequest"
      v-model:pagination="pagination"
    >
      <template v-slot:top-right>
        Last updated: {{ lastUpdated }}
      </template>
    </q-table>
  </div>
</template>
