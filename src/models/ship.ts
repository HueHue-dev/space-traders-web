export interface Ship {
  symbol: string
  registration: ShipRegistration
  nav: ShipNav
  crew: ShipCrew
  frame: ShipFrame
  reactor: ShipReactor
  engine: ShipEngine
  cooldown: Cooldown
  modules: ShipModule[]
  mounts: ShipMount[]
  cargo: ShipCargo
  fuel: ShipFuel
}

export interface ShipRegistration {
  name: string
  factionSymbol: string
  role: ShipRole
}

export enum ShipRole {
  FABRICATOR = 'FABRICATOR',
  HARVESTER = 'HARVESTER',
  HAULER = 'HAULER',
  INTERCEPTOR = 'INTERCEPTOR',
  EXCAVATOR = 'EXCAVATOR',
  TRANSPORT = 'TRANSPORT',
  REPAIR = 'REPAIR',
  SURVEYOR = 'SURVEYOR',
  COMMAND = 'COMMAND',
  CARRIER = 'CARRIER',
  PATROL = 'PATROL',
  SATELLITE = 'SATELLITE',
  EXPLORER = 'EXPLORER',
  REFINERY = 'REFINERY',
}

export interface ShipNav {
  systemSymbol: string
  waypointSymbol: string
  route: ShipNavRoute
  status: ShipNavStatus
  flightMode: ShipNavFlightMode
}

export interface ShipNavRoute {
  destination: ShipNavRouteWaypoint
  origin: ShipNavRouteWaypoint
  departureTime: string
  arrival: string
}

export interface ShipNavRouteWaypoint {
  symbol: string
  type: string
  systemSymbol: string
  x: number
  y: number
}

export enum ShipNavStatus {
  IN_TRANSIT = 'IN_TRANSIT',
  IN_ORBIT = 'IN_ORBIT',
  DOCKED = 'DOCKED',
}

export enum ShipNavFlightMode {
  DRIFT = 'DRIFT',
  STEALTH = 'STEALTH',
  CRUISE = 'CRUISE',
  BURN = 'BURN',
}

export interface ShipCrew {
  current: number
  required: number
  capacity: number
  rotation: ShipCrewRotation
  morale: number
  wages: number
}

export enum ShipCrewRotation {
  STRICT = 'STRICT',
  RELAXED = 'RELAXED',
}

export interface ShipFrame {
  symbol: string
  name: string
  description: string
  condition: number
  integrity: number
  moduleSlots: number
  mountingPoints: number
  fuelCapacity: number
  requirements: ShipRequirements
}

export interface ShipReactor {
  symbol: string
  name: string
  description: string
  condition: number
  integrity: number
  powerOutput: number
  requirements: ShipRequirements
}

export interface ShipEngine {
  symbol: string
  name: string
  description: string
  condition: number
  integrity: number
  speed: number
  requirements: ShipRequirements
}

export interface ShipRequirements {
  power?: number
  crew?: number
  slots?: number
}

export interface Cooldown {
  shipSymbol: string
  totalSeconds: number
  remainingSeconds: number
  expiration?: string
}

export interface ShipModule {
  symbol: string
  capacity?: number
  range?: number
  name: string
  description: string
  requirements: ShipRequirements
}

export interface ShipMount {
  symbol: string
  name: string
  description?: string
  strength?: number
  deposits?: string[]
  requirements: ShipRequirements
}

export interface ShipCargo {
  capacity: number
  units: number
  inventory: ShipCargoItem[]
}

export interface ShipCargoItem {
  symbol: string
  name: string
  description: string
  units: number
}

export interface ShipFuel {
  current: number
  capacity: number
  consumed?: ShipFuelConsumed
}

export interface ShipFuelConsumed {
  amount: number
  timestamp: string
}