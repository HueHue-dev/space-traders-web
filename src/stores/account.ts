import { ref, computed, type ComputedRef, type Ref } from 'vue'
import { defineStore } from 'pinia'

export const useAccountStore = defineStore('account', () => {
  const id: Ref<string, string> = ref("")
  const email: Ref<string, string> = ref("")
  const token: Ref<string, string> = ref("")

  const isAuthenticated: ComputedRef<boolean> = computed(() => token.value !== "" && email.value !== null)

  function setToken(t: string) {
    token.value = t;
  }

  function setEmail(e: string) {
    email.value = e;
  }

  return { email, token, setEmail, setToken, isAuthenticated }
})
