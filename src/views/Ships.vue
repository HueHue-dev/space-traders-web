<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { type QTableProps } from 'quasar'
import { apiManager } from '@/services/api/ApiManagerService.ts'
import { usePagination } from '@/composables/usePagination.ts'
import type { Ship } from '@/models/ship.ts'

const agentApi = apiManager.getAgentApi()

const {
  data: ships,
  lastUpdated,
  loading,
  pagination,
  onRequest,
  initialize,
} = usePagination<Ship>((page, limit) => agentApi.getShips(page, limit), 'symbol')

onMounted(() => {
  initialize()
})

const columns: QTableProps['columns'] = [
  {
    name: 'symbol',
    label: 'Ship Symbol',
    field: 'symbol',
    align: 'left',
    sortable: true,
  },
  {
    name: 'name',
    label: 'Name',
    field: (row) => row.registration.name,
    align: 'left',
    sortable: true,
  },
  {
    name: 'role',
    label: 'Role',
    field: (row) => row.registration.role,
    align: 'left',
    sortable: true,
  },
  {
    name: 'status',
    label: 'Status',
    field: (row) => row.nav.status,
    align: 'left',
    sortable: true,
  },
  {
    name: 'location',
    label: 'Location',
    field: (row) => row.nav.waypointSymbol,
    align: 'left',
    sortable: false,
  },
  {
    name: 'flightMode',
    label: 'Flight Mode',
    field: (row) => row.nav.flightMode,
    align: 'left',
    sortable: false,
  },
  {
    name: 'fuel',
    label: 'Fuel',
    field: 'fuel',
    align: 'left',
    sortable: false,
  },
  {
    name: 'cargo',
    label: 'Cargo',
    field: 'cargo',
    align: 'left',
    sortable: false,
  },
  {
    name: 'crew',
    label: 'Crew',
    field: 'crew',
    align: 'left',
    sortable: false,
  },
  {
    name: 'actions',
    label: 'Actions',
    field: '',
    align: 'left',
    sortable: false,
  },
]

const getStatusColor = (status: string) => {
  switch (status) {
    case 'DOCKED':
      return 'green'
    case 'IN_ORBIT':
      return 'blue'
    case 'IN_TRANSIT':
      return 'orange'
    default:
      return 'grey'
  }
}
</script>

<template>
  <div class="q-pa-md">
    <q-table
      flat
      bordered
      title="Ships"
      :rows="ships"
      :columns="columns"
      row-key="symbol"
      :loading="loading"
      separator="horizontal"
      no-data-label="Couldn't find any ships"
      :rowsPerPageOptions="[5, 10, 20]"
      @request="onRequest"
      v-model:pagination="pagination"
    >
      <template v-slot:top-right> Last updated: {{ lastUpdated }} </template>

      <template #body-cell-role="props">
        <q-td :props="props">
          <q-chip
            :label="props.row.registration.role"
            color="primary"
            text-color="white"
            dense
            square
          />
        </q-td>
      </template>

      <template #body-cell-status="props">
        <q-td :props="props">
          <q-chip
            :color="getStatusColor(props.row.nav.status)"
            text-color="white"
            dense
            square
          >
            {{ props.row.nav.status.replace('_', ' ') }}
          </q-chip>
        </q-td>
      </template>

      <template #body-cell-location="props">
        <q-td :props="props">
          <div class="text-caption">{{ props.row.nav.waypointSymbol }}</div>
          <div class="text-caption text-grey">{{ props.row.nav.systemSymbol }}</div>
        </q-td>
      </template>

      <template #body-cell-flightMode="props">
        <q-td :props="props">
          <q-chip
            :label="props.row.nav.flightMode"
            color="secondary"
            text-color="white"
            dense
            square
          />
        </q-td>
      </template>

      <template #body-cell-fuel="props">
        <q-td :props="props">
          <div class="text-caption">
            {{ props.row.fuel.current }} / {{ props.row.fuel.capacity }}
          </div>
          <q-linear-progress
            :value="props.row.fuel.current / props.row.fuel.capacity"
            color="amber"
            size="8px"
            class="q-mt-xs"
          />
        </q-td>
      </template>

      <template #body-cell-cargo="props">
        <q-td :props="props">
          <div class="text-caption">
            {{ props.row.cargo.units }} / {{ props.row.cargo.capacity }}
          </div>
          <q-linear-progress
            :value="props.row.cargo.units / props.row.cargo.capacity"
            color="blue"
            size="8px"
            class="q-mt-xs"
          />
        </q-td>
      </template>

      <template #body-cell-crew="props">
        <q-td :props="props">
          <div class="text-caption">
            {{ props.row.crew.current }} / {{ props.row.crew.capacity }}
          </div>
          <div class="text-caption text-grey">Morale: {{ props.row.crew.morale }}%</div>
        </q-td>
      </template>

      <template v-slot:body-cell-actions="props">
        <q-td :props="props">
          <q-btn
            round
            flat
            color="primary"
            icon="info"
            size="sm"
          >
            <q-tooltip>View Details & More Actions</q-tooltip>
          </q-btn>
          <q-btn
            v-if="props.row.nav.status === 'DOCKED'"
            round
            flat
            color="green"
            icon="flight_takeoff"
            size="sm"
          >
            <q-tooltip>Orbit</q-tooltip>
          </q-btn>
          <q-btn
            v-if="props.row.nav.status === 'IN_ORBIT'"
            round
            flat
            color="orange"
            icon="flight_land"
            size="sm"
          >
            <q-tooltip>Dock</q-tooltip>
          </q-btn>
          <q-btn
            v-if="props.row.nav.status !== 'IN_TRANSIT'"
            round
            flat
            color="blue"
            icon="navigation"
            size="sm"
          >
            <q-tooltip>Navigate</q-tooltip>
          </q-btn>
        </q-td>
      </template>
    </q-table>
  </div>
</template>