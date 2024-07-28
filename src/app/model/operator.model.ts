import { Assignment } from "./Assignment.model";
import { Evaluation } from "./Evaluation.model";
import { FiF } from "./FIF.model";

export interface Operator {
    id:number
    telephone: string;
    image:string;
    pdfFiles: FiF[];
    assignments:Assignment[];
    uap: string;
    etat: string;
    chaine: string;
    nomOperateur: string;
    matriculeOperateur: string;
    evaluation:Evaluation[];
    creationDate:string
    qualification:string

}
