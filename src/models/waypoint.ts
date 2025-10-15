export interface Waypoint {
  symbol: string
  type: WaypointType
  systemSymbol: string
  x: number
  y: number
  orbitals: Array<{ symbol: string }>
  orbits?: string
  faction?: {
    symbol: string
  }
  traits: Array<WaypointTrait>
  modifiers?: Array<WaypointModifier>
  chart?: {
    waypointSymbol?: string
    submittedBy?: string
    submittedOn?: string
  }
  isUnderConstruction: boolean
}

export interface WaypointTrait {
  symbol: string
  name: string
  description: string
}

export interface WaypointModifier {
  symbol: string
  name: string
  description: string
}

export enum WaypointType {
  PLANET = 'PLANET',
  GAS_GIANT = 'GAS_GIANT',
  MOON = 'MOON',
  ORBITAL_STATION = 'ORBITAL_STATION',
  JUMP_GATE = 'JUMP_GATE',
  ASTEROID_FIELD = 'ASTEROID_FIELD',
  ASTEROID = 'ASTEROID',
  ENGINEERED_ASTEROID = 'ENGINEERED_ASTEROID',
  ASTEROID_BASE = 'ASTEROID_BASE',
  NEBULA = 'NEBULA',
  DEBRIS_FIELD = 'DEBRIS_FIELD',
  GRAVITY_WELL = 'GRAVITY_WELL',
  ARTIFICIAL_GRAVITY_WELL = 'ARTIFICIAL_GRAVITY_WELL',
  FUEL_STATION = 'FUEL_STATION',
}

export interface ScannedWaypoint extends Waypoint {
  scannedAt: Date
  scannedBy: string
}