import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { ApiService } from '@/api/ApiService.ts'
import { useAccountStore } from '@/stores/account.ts'

export const useApiStore = defineStore('api', () => {
  const apiService = ref<ApiService | null>(null)
  const accountStore = useAccountStore();

  const service = computed(() => {
    if (!apiService.value && accountStore.token) {
      apiService.value = new ApiService(accountStore.token)
    }
    return apiService.value;
  })

  function init(token: string) {
    apiService.value = new ApiService(token);
  }

  return { apiService, init }
})
