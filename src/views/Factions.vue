<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { type QTableProps } from 'quasar'
import type { Faction } from '@/models/faction.ts'
import { apiManager } from '@/services/api/ApiManagerService.ts'

const factions = ref<Faction[]>([])
const loading = ref(false)

onMounted(() => {
  const agentApi = apiManager.getAgentApi()
  loading.value = true
  agentApi.getAllFactions().then((response) => {
    factions.value = response
    loading.value = false
  })
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
    />
  </div>
</template>
