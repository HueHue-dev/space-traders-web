import type { Faction } from '@/models/faction.ts'
import type { Contract } from '@/models/contract.ts'
import type { Agent } from '@/models/agent.ts'
import { type Ship, ShipNavFlightMode, ShipNavStatus } from '@/models/ship.ts'
import {
  BaseApiService,
  type PaginatedResponse,
  type PostResponse,
  type SingleResponse,
} from '@/services/api/BaseApiService.ts'
import { type Waypoint, WaypointType } from '@/models/waypoint.ts'
import type { Account } from '@/models/account.ts'

export interface ScanWaypointsResponse {
  data: {
    cooldown: {
      shipSymbol: string
      totalSeconds: number
      remainingSeconds: number
      expiration?: string
    }
    waypoints: Waypoint[]
  }
}

export interface OrbitShipResponse {
  data: {
    nav: {
    },
    route: {
      destination: {
        symbol: string
        type: WaypointType
        systemSymbol: string
        x: number
        y: number
      },
      origin: {
        symbol: string
        type: WaypointType
        systemSymbol: string
        x: number
        y: number
      },
      departureTime: string
      arrival: string
    },
    status: ShipNavStatus
    flightMode: ShipNavFlightMode
  }
}

export class AgentApiService extends BaseApiService {
  constructor(agentToken: string) {
    super(agentToken, 'agent')
  }

  async getAccount(): Promise<SingleResponse<Account>> {
    return await this.get<Account>('my/account', 0)
  }

  async getFactions(page: number, limit: number = 5): Promise<PaginatedResponse<Faction>> {
    return await this.getPaginated<Faction>('factions', this.ONE_HOUR, page, limit)
  }

  async getMyAgent(page: number, limit: number = 5): Promise<PaginatedResponse<Agent>> {
    return await this.getPaginated<Agent>('my/agent', this.ONE_HOUR, page, limit)
  }

  async getAgents(page: number, limit: number = 5): Promise<PaginatedResponse<Contract>> {
    return await this.getPaginated<Contract>('agents', this.ONE_HOUR, page, limit)
  }

  async getContracts(page: number, limit: number = 5): Promise<PaginatedResponse<Contract>> {
    return await this.getPaginated<Contract>('my/contracts', this.ONE_HOUR, page, limit)
  }

  async acceptContract(contractId: string): Promise<PostResponse<Contract>> {
    return await this.post<Contract>(`my/contracts/${contractId}/accept`, ['my/contracts'])
  }

  async getShips(page: number, limit: number = 5): Promise<PaginatedResponse<Ship>> {
    return await this.getPaginated<Ship>('my/ships', this.ONE_HOUR, page, limit)
  }

  async scanWaypoints(shipSymbol: string): Promise<ScanWaypointsResponse> {
    const response = await this.post<ScanWaypointsResponse>(`my/ships/${shipSymbol}/scan/waypoints`)

    return response.data
  }

  async orbitShip(shipSymbol: string): Promise<OrbitShipResponse> {
    const response = await this.post<OrbitShipResponse>(`my/ships/${shipSymbol}/scan/waypoints`)

    return response.data
  }
}
