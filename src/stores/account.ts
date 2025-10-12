import { ref, computed, type ComputedRef } from 'vue'
import { defineStore } from 'pinia'

export const useAccountStore = defineStore('account', () => {
  const id = ref("")
  const email = ref(null)
  const token = ref("")

  const isAuthenticated: ComputedRef<boolean> = computed(() => token.value !== "")

  return { id, email, token, isAuthenticated }
})
