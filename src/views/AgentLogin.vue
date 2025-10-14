<script setup lang="ts">
import { ref } from 'vue'
import router from '@/router'
import { useQuasar } from 'quasar'
import { authService } from '@/services/AuthService.ts'

const $q = useQuasar()

const token = ref('')

const onAgentLogin = () => {
  authService.setAgentToken(token.value)
  $q.notify({
    type: 'positive',
    textColor: 'white',
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

    <q-btn @click="onAgentLogin" :disable="token.length === 0" color="primary" label="Login" />
  </div>
</template>
