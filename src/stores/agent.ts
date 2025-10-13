import { ref, computed, type ComputedRef, type Ref } from 'vue'
import { defineStore } from 'pinia'
import type { Agent } from '@/models/agent.ts'

export const useAgentStore = defineStore('agent', () => {
  const token: Ref<string, string> = ref("")

  const isAuthenticated: ComputedRef<boolean> = computed(() => token.value !== "")

  const setToken = (t: string) => {
    token.value = t;
  }

  return { token, setToken, isAuthenticated }
})
