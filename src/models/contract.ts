export interface Contract {
  id: string
  factionSymbol: string
  type: ContractType
  terms: {
    deadline: string
    payment: {
      onAccepted: number
      onFulfilled: number
    }
    deliver: ContractDeliverGood[]
  }
  accepted: boolean
  fulfilled: boolean
  deadlineToAccept: string
}

export enum ContractType {
  PROCUREMENT = 'PROCUREMENT',
  TRANSPORT = 'TRANSPORT',
  SHUTTLE = 'SHUTTLE',
}

export interface ContractDeliverGood {
  tradeSymbol: string
  destinationSymbol: string
  unitsRequired: number
  unitsFulfilled: number
}
