<script setup lang="ts">
import { useApiStore } from '@/stores/api.ts'
import { useAccountStore } from '@/stores/account.ts'
import { ref } from 'vue'
import router from '@/router'
import { Loading, useQuasar } from 'quasar'
import type { Faction } from '@/models/faction.ts'

const $q = useQuasar()

const accountStore = useAccountStore()
const apiStore = useApiStore()

const step = ref(1)

const token = ref('')
const selectedFaction = ref('')

const factions = ref<Faction[]>([])

const onSubmit = () => {
  $q.notify({
    color: 'green-4',
    textColor: 'white',
    icon: 'cloud_done',
    message: 'Login successful',
  })

  router.push('/')
}

const onTokenSet = () => {
  accountStore.setToken(token.value)
  apiStore.init(token.value)

  Loading.show()
  apiStore.apiService?.getAllFactions().then((response) => {
    factions.value = response;
    Loading.hide()
  })
  step.value = 2
}
</script>

<template>
  <div class="q-pa-md">
    <q-btn
      label="Reset"
      push
      color="white"
      text-color="primary"
      @click="step = 1"
      class="q-mb-md"
    />

    <q-stepper v-model="step" header-nav ref="stepper" color="primary" animated>
      <q-step :name="1" title="Token" icon="settings" :done="step > 1" :header-nav="step > 1">
        <div class="q-pa-md" style="max-width: 800px">
          <q-input
            filled
            type="password"
            v-model="token"
            label="Token"
            lazy-rules
            :rules="[(val) => (val && val.length > 0) || 'Token is required']"
          />
        </div>
        <q-stepper-navigation>
          <q-btn
            @click="onTokenSet"
            :disable="token.length === 0"
            color="primary"
            label="Continue"
          />
        </q-stepper-navigation>
      </q-step>

      <q-step :name="2" title="Register a Agent" icon="add_comment" :header-nav="step > 2">
        <div class="q-gutter-md">
          <q-card class="my-card" flat bordered v-for="faction in factions">
            <q-card-section horizontal>
              <q-card-section class="q-pt-xs">
                <div class="text-overline">Overline</div>
                <div class="text-h5 q-mt-sm q-mb-xs">{{ faction.name }}</div>
                <div class="text-caption text-grey">
                  {{ faction.description }}
                </div>
              </q-card-section>
            </q-card-section>

            <q-separator />

            <q-card-actions>
              <q-btn flat color="primary" @click="selectedFaction = faction.symbole">
                Select
              </q-btn>
            </q-card-actions>
          </q-card>
        </div>

        <q-stepper-navigation>
          <q-btn color="primary" label="Finish" @click="onSubmit" />
          <q-btn flat @click="step = 1" color="primary" label="Back" class="q-ml-sm" />
        </q-stepper-navigation>
      </q-step>
    </q-stepper>
  </div>
</template>