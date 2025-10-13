export interface Faction {
  symbol: string
  name: string
  description: string
  headquarters: string
  traits: Trait[]
  isRecruiting: boolean
}

export interface Trait {
  symbol: string
  name: string
  description: string
}
