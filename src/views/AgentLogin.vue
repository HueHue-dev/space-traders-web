<script setup lang="ts">
import { ref } from 'vue'
import router from '@/router'
import { useQuasar } from 'quasar'
import { authService } from '@/services/AuthService.ts'
import { apiManager } from '@/services/api/ApiManagerService.ts'
import type { SingleResponse } from '@/services/api/BaseApiService.ts'
import type { Account } from '@/models/account.ts'

const $q = useQuasar()

const token = ref('')

const onAgentLogin = () => {
  authService.setAgentToken(token.value)
  const agentApi = apiManager.getAgentApi()
  agentApi.getAccount().then((response: SingleResponse<Account>) => {
    $q.notify({
      type: 'positive',
      message: 'Login successful',
      position: 'top',
    })

    router.push('/')
  }).catch((error) => {
    $q.notify({
      type: 'negative',
      message: error.message,
      position: 'top',
    })

    router.push('/agent/login')
  })
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

    <q-btn @click="onAgentLogin" :disable="token.length === 0" color="primary" label="Login" />
  </div>
</template>
