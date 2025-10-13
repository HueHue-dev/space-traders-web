<script setup lang="ts">
import { onMounted } from 'vue'
import { type QTableProps } from 'quasar'
import type { Faction } from '@/models/faction.ts'
import { apiManager } from '@/services/api/ApiManagerService.ts'
import { usePagination } from '@/composables/usePagination.ts'

const agentApi = apiManager.getAgentApi()

const { data: factions, loading, pagination, onRequest, initialize } = usePagination<Faction>(
  (page, limit) => agentApi.getFactions(page, limit),
  'name'
)

onMounted(() => {
  initialize()
})

const columns: QTableProps['columns'] = [
  { name: 'name', label: 'Name', field: 'name', align: 'left', sortable: true },
  { name: 'description', label: 'Description', field: 'description', align: 'left' },
  {
    name: 'headquarters',
    label: 'Headquarters',
    field: 'headquarters',
    align: 'left',
    sortable: true,
  },
  {
    name: 'isRecruting',
    label: 'Is recruting',
    field: 'isRecruiting',
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
      title="Factions"
      :rows="factions"
      :columns="columns"
      row-key="symbol"
      :loading="loading"
      separator="horizontal"
      no-data-label="Couldn't find any factions"
      :rowsPerPageOptions="[5, 10, 20]"
      @request="onRequest"
      v-model:pagination="pagination"
    />
  </div>
</template>
