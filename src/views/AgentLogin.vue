<script setup lang="ts">
import { useApiStore } from '@/stores/api.ts'
import { ref } from 'vue'
import router from '@/router'
import { useQuasar } from 'quasar'
import { useAgentStore } from '@/stores/agent.ts'

const $q = useQuasar()

const agentStore = useAgentStore()
const apiStore = useApiStore()
const token = ref('')

const onAgentLogin = () => {
  agentStore.setToken(token.value)
  apiStore.init(token.value)

  $q.notify({
    color: 'green-4',
    textColor: 'white',
    icon: 'cloud_done',
    message: 'Login successful',
  })

  router.push('/')
}
</script>

<template>
  <div class="q-pa-md">
    <div class="q-pa-md" style="max-width: 800px">
      <q-input
        filled
        type="password"
        v-model="token"
        label="Agent Token"
        lazy-rules
        :rules="[(val) => (val && val.length > 0) || 'Token is required']"
      />
    </div>

    <q-btn
      @click="onAgentLogin"
      :disable="token.length === 0"
      color="primary"
      label="Login"
    />
  </div>
</template>