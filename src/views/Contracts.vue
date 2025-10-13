<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { Loading, type QTableProps } from 'quasar'
import type { Contract } from '@/models/contract.ts'
import { apiManager } from '@/services/api/ApiManagerService.ts'

const contracts = ref<Contract[]>([])

onMounted(() => {
  const agentApi = apiManager.getAgentApi()
  Loading.show()
  agentApi.getContracts(1).then((response) => {
    contracts.value = response
    Loading.hide()
  })
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
      separator="horizontal"
      no-data-label="Couldn't find any contracts"
      :rowsPerPageOptions="[5, 10, 20]"
    />
  </div>
</template>
