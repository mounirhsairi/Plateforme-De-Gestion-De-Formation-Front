import { Evaluation } from "./Evaluation.model";
import { Ligne } from "./ligne.model";

export interface Operation {
    id: number,
    ligne: Ligne[],
    idLigne:number
    operationName: any,
    effectifsformes:number,
    evaluation:Evaluation[]
    }