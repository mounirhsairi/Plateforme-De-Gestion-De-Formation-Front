import { ListProgramme } from "./ListProgramme.model"

export interface SessionFormation {
    id:number
    dateDebut:Date 
    dateFin: string
    duree: number
    etat: string
    partie: string
    programme: ListProgramme[]
    theme: string
    type: string
    doc:string
    resp:string
}