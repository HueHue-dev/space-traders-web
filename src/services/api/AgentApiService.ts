import type { Faction } from '@/models/faction.ts'
import type { Contract } from '@/models/contract.ts'
import type { Agent } from '@/models/agent.ts'
import {
  BaseApiService,
  type PaginatedResponse,
  RequestType,
} from '@/services/api/BaseApiService.ts'

export class AgentApiService extends BaseApiService {
  constructor(agentToken: string) {
    super(agentToken, 'agent')
  }

  async getFactions(page: number, limit: number = 5): Promise<PaginatedResponse<Faction>> {
    return await this.request<Faction>('factions', RequestType.GET, this.ONE_HOUR, page, limit)
  }

  async getAllFactions(): Promise<Faction[]> {
    return await this.requestAll<Faction>('factions', RequestType.GET, this.ONE_HOUR)
  }

  async getMyAgent(page: number, limit: number = 5): Promise<PaginatedResponse<Agent>> {
    return await this.request<Agent>('my/agent', RequestType.GET, this.ONE_HOUR, page, limit)
  }

  async getAgents(page: number, limit: number = 5): Promise<PaginatedResponse<Contract>> {
    return await this.request<Contract>('agents', RequestType.GET, this.ONE_HOUR, page, limit)
  }

  async getContracts(page: number, limit: number = 5): Promise<PaginatedResponse<Contract>> {
    return await this.request<Contract>('my/contracts', RequestType.GET, this.ONE_HOUR, page, limit)
  }
}
