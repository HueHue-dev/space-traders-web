<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { Loading, type QTableProps } from 'quasar'
import { useApiStore } from '@/stores/api.ts'
import type { Faction } from '@/models/faction.ts'

const factions = ref<Faction[]>([])

onMounted(() => {
  const apiStore = useApiStore()
  Loading.show()
  apiStore.apiService?.getAllFactions().then((response) => {
    factions.value = response
    Loading.hide()
  })
})

const columns: QTableProps['columns'] = [
  { name: 'name', label: 'Name', field: 'name', align: 'left', sortable: true },
  { name: 'description', label: 'Description', field: 'description', align: 'left' },
  {
    name: 'headquaters',
    label: 'Headquaters',
    field: 'headquaters',
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
      row-key="symbole"
      separator="horizontal"
    />
  </div>
</template>
