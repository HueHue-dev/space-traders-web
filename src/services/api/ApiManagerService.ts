import { AccountApiService } from '@/services/api/AccountApiService.ts'
import { AgentApiService } from '@/services/api/AgentApiService.ts'
import { authService } from '@/services/AuthService.ts'

class ApiManagerService {
  private static instance: ApiManagerService
  private accountApi: AccountApiService | null = null
  private agentApi: AgentApiService | null = null

  private constructor() {}

  static getInstance(): ApiManagerService {
    if (!ApiManagerService.instance) {
      ApiManagerService.instance = new ApiManagerService()
    }
    return ApiManagerService.instance
  }

  getAccountApi(): AccountApiService {
    if (this.accountApi) {
      return this.accountApi
    }

    const token = authService.getAccountToken()
    if (!token) {
      throw new Error('Account token not found. Please login.')
    }

    this.accountApi = new AccountApiService(token)
    return this.accountApi
  }

  getAgentApi(): AgentApiService {
    if (this.agentApi) {
      return this.agentApi
    }

    const token = authService.getAgentToken()
    if (!token) {
      throw new Error('Agent token not found. Please login.')
    }

    this.agentApi = new AgentApiService(token)
    return this.agentApi
  }

  refreshAccountApi(): AccountApiService {
    this.accountApi = null
    return this.getAccountApi()
  }

  refreshAgentApi(): AgentApiService {
    this.agentApi = null
    return this.getAgentApi()
  }

  clearAll(): void {
    this.accountApi = null
    this.agentApi = null
  }
}

export const apiManager = ApiManagerService.getInstance()
