<script setup lang="ts">
import { onMounted } from 'vue'
import { type QTableProps, useQuasar } from 'quasar'
import { apiManager } from '@/services/api/ApiManagerService.ts'
import { usePagination } from '@/composables/usePagination.ts'
import type { Contract } from '@/models/contract.ts'

const $q = useQuasar()

const agentApi = apiManager.getAgentApi()

const {
  data: contracts,
  lastUpdated,
  loading,
  pagination,
  onRequest,
  initialize,
} = usePagination<Contract>((page, limit) => agentApi.getContracts(page, limit), 'name')

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
    name: 'payment',
    label: 'Payment',
    field: (row) => `${row.terms.payment.onAccepted} / ${row.terms.payment.onFulfilled}`,
    align: 'left',
    sortable: false,
  },
  {
    name: 'deliverables',
    label: 'Deliverables',
    field: 'terms',
    align: 'left',
    sortable: false,
  },
  {
    name: 'deadlineToAccept',
    label: 'Deadline to accept',
    field: 'deadlineToAccept',
    align: 'left',
    sortable: true,
  },
  {
    name: 'deadline',
    label: 'Deadline',
    field: (row) => row.terms.deadline,
    align: 'left',
    sortable: true,
  },
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
    name: 'actions',
    label: 'Actions',
    field: '',
    align: 'left',
    sortable: false,
  },
]

const accept = async (id: string) => {
  try {
    $q.loading.show({ message: 'Accepting contract...' })

    const result = await agentApi.acceptContract(id)

    const index = contracts.value.findIndex(c => c.id === id)
    if (index !== -1) {
      contracts.value[index] = result.data
    }

    await initialize()

    $q.notify({
      type: 'positive',
      message: 'Contract accepted successfully!',
    })
  } catch (error: any) {
    $q.notify({
      type: 'negative',
      message: error.response?.data?.error?.message || 'Failed to accept contract',
    })
  } finally {
    $q.loading.hide()
  }
}
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
      <template v-slot:top-right> Last updated: {{ lastUpdated }} </template>

      <template #body-cell-fulfilled="props">
        <q-td :props="props">
          <q-chip :color="props.row.fulfilled ? 'green' : 'red'" text-color="white" dense square>{{
            props.row.fulfilled
          }}</q-chip>
        </q-td>
      </template>

      <template #body-cell-payment="props">
        <q-td :props="props">
          <div class="text-caption">
            On Accept: {{ props.row.terms.payment.onAccepted.toLocaleString() }}
          </div>
          <div class="text-caption">
            On Fulfill: {{ props.row.terms.payment.onFulfilled.toLocaleString() }}
          </div>
        </q-td>
      </template>

      <template #body-cell-deliverables="props">
        <q-td :props="props">
          <div v-for="item in props.row.terms.deliver" :key="item.tradeSymbol" class="text-caption">
            {{ item.unitsFulfilled }} / {{ item.unitsRequired }} {{ item.tradeSymbol }} →
            {{ item.destinationSymbol }}
          </div>
        </q-td>
      </template>

      <template #body-cell-accepted="props">
        <q-td :props="props">
          <q-chip :color="props.row.accepted ? 'green' : 'red'" text-color="white" dense square>{{
            props.row.accepted
          }}</q-chip>
        </q-td>
      </template>

      <template #body-cell-deadlineToAccept="props">
        <q-td :props="props">
          {{ new Date(props.row.deadlineToAccept).toLocaleString() }}
        </q-td>
      </template>

      <template #body-cell-deadline="props">
        <q-td :props="props">
          {{ new Date(props.row.terms.deadline).toLocaleString() }}
        </q-td>
      </template>

      <template v-slot:body-cell-actions="props">
        <q-td :props="props">
          <q-btn
            v-if="!props.row.accepted"
            round
            flat
            color="green"
            @click="accept(props.row.id)"
            icon="done"
          ></q-btn>
          <q-btn
            v-if="!props.row.accepted"
            round
            flat
            color="yellow"
            @click=""
            icon="question_mark"
          ></q-btn>
          <q-btn v-if="!props.row.accepted" round flat color="red" @click="" icon="remove"></q-btn>
        </q-td>
      </template>
    </q-table>
  </div>
</template>
