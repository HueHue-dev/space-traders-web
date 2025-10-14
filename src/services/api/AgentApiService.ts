import type { Faction } from '@/models/faction.ts'
import type { Contract } from '@/models/contract.ts'
import type { Agent } from '@/models/agent.ts'
import {
  BaseApiService,
  type PaginatedResponse, type PostResponse,
} from '@/services/api/BaseApiService.ts'

export class AgentApiService extends BaseApiService {
  constructor(agentToken: string) {
    super(agentToken, 'agent')
  }

  async getFactions(page: number, limit: number = 5): Promise<PaginatedResponse<Faction>> {
    return await this.get<Faction>('factions', this.ONE_HOUR, page, limit)
  }

  async getMyAgent(page: number, limit: number = 5): Promise<PaginatedResponse<Agent>> {
    return await this.get<Agent>('my/agent', this.ONE_HOUR, page, limit)
  }

  async getAgents(page: number, limit: number = 5): Promise<PaginatedResponse<Contract>> {
    return await this.get<Contract>('agents', this.ONE_HOUR, page, limit)
  }

  async getContracts(page: number, limit: number = 5): Promise<PaginatedResponse<Contract>> {
    return await this.get<Contract>('my/contracts', this.ONE_HOUR, page, limit)
  }

  async acceptContract(contractId: string): Promise<PostResponse<Contract>> {
    return await this.post<Contract>(`my/contracts/${contractId}/accept`, ['my/contracts'])
  }
}
