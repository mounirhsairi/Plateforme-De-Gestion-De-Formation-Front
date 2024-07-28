import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EvaluationServiceService {

  constructor(private httpClient:HttpClient) { }

  getAllEvaluation(){
    return  this.httpClient.get("http://localhost:8082/Evaluation/all")

  }
  updateEvaluationChefDeLigne(idEvaluation:number ,evaluatioAgentFormation:string){
    return this.httpClient.patch("http://localhost:8082/Evaluation/update/ChefDeLigne/"+idEvaluation+"/"+evaluatioAgentFormation ,"")

  }
  updateEvaluationQualite(idEvaluation:number ,evaluatioAgentFormation:string){
    return this.httpClient.patch("http://localhost:8082/Evaluation/update/Qualité/"+idEvaluation+"/"+evaluatioAgentFormation ,"")

  }
  updateEvaluationMaintenance(idEvaluation:number ,evaluatioAgentFormation:string){
    return this.httpClient.patch("http://localhost:8082/Evaluation/update/Maintenance/"+idEvaluation+"/"+evaluatioAgentFormation ,"")

  }
  updateEvaluationAgentFormation(idEvaluation:number ,evaluatioAgentFormation:string){
    return this.httpClient.patch("http://localhost:8082/Evaluation/update/AgentFormation/"+idEvaluation+"/"+evaluatioAgentFormation ,"")

  }
  
  updateEvaluationRR(idEvaluation:number ,evaluatioRR:string){
    return this.httpClient.patch("http://localhost:8082/Evaluation/update/RR/"+idEvaluation+"/"+evaluatioRR ,"")

  }
}
