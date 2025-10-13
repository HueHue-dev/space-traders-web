import type { Faction } from '@/models/faction.ts'
import type { Contract } from '@/models/contract.ts'
import type { Agent } from '@/models/agent.ts'
import { BaseApiService, RequestType } from '@/services/api/BaseApiService.ts'

export class AgentApiService extends BaseApiService {
  constructor(agentToken: string) {
    super(agentToken, 'agent')
  }

  async getFactions<T>(page: number): Promise<Faction[]> {
    return await this.request<Faction[]>('factions', RequestType.GET, this.ONE_HOUR, page)
  }

  async getAllFactions<T>(): Promise<Faction[]> {
    return await this.requestAll<Faction>('factions', RequestType.GET, this.ONE_HOUR)
  }

  async getMyAgent<T>(page: number): Promise<Agent> {
    return await this.request<Agent>('my/agent', RequestType.GET, this.ONE_HOUR)
  }

  async getContracts<T>(page: number): Promise<Contract[]> {
    return await this.request<Contract[]>('my/contracts', RequestType.GET, this.ONE_HOUR)
  }
}
