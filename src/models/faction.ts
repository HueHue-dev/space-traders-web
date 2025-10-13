export interface Faction {
  symbole: string
  name: string
  description: string
  headquaters: string
  traits: Trait[]
  isRecruiting: boolean
}

export interface Trait {
  symbole: string
  name: string
  description: string
}
