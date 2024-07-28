import { SessionFormation } from "./SessionFormation.model"

export interface ProgramFormation {
    id:number
    nom:string
    sessionFormation:SessionFormation[]
  }