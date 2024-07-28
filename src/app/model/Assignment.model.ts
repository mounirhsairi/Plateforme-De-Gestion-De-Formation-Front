import { Evaluation } from "./Evaluation.model";
import { Operation } from "./operation.model";

export interface Assignment {
    id: number;
    endDate: string;
    idOperateurs: number;
    idOperation: number;
    operationName: String; // Define the type for operation if available
    nomLigne:String
    idLigne:number;
    evaluation:Evaluation[]
    codeFormation:string
    methodeSuivi:string
    documentIdentification:string
    creationDate:string

  }