import { demandDataList } from "./demandeDataList.model"

export interface demandePolyvalence{
    matriculeDemande :string
    etat: string
    id:number
    lastModifiedBy:string
    demandDataList:demandDataList[]
    creationDate:string

}