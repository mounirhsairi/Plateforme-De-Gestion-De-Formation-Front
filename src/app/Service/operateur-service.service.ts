import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Operator } from '../model/operator.model';
@Injectable({
  providedIn: 'root'
})
export class OperateurServiceService {
  operator!: Operator;
  constructor(private httpClient:HttpClient) { }
  
  getOperator(){
    return this.httpClient.get("http://localhost:8082/operateurs/all")
  }
  postOperator(model:Operator ){
    return this.httpClient.post("http://localhost:8082/operateurs/Create/1", model);
  }
  deleteOperator(idOperateur :number){
    return this.httpClient.delete("http://localhost:8082/operateurs/delete/"+idOperateur)
  }
  getOperatorByMatricule(Matricule:any){
    return this.httpClient.get("http://localhost:8082/operateurs/mat/"+Matricule)
  }
  MiseAjourAvecExcel(model:Operator[], idDemande :number){
    return this.httpClient.post("http://localhost:8082/operateurs/Create/"+ idDemande, model);

  }
  MiseAjourEtatAvecExcel(model:Operator[]){
    return this.httpClient.patch("http://localhost:8082/operateurs/update/etat/",model);

  }
  MiseAjourImage(Image :string ,idOperateur:number){
    return this.httpClient.patch("http://localhost:8082/operateurs/update/image/"+idOperateur,Image);

  }
  updateoperation(idOperation:number,idOperateur:number){
    return this.httpClient.patch("http://localhost:8082/operateurs/update/operation/"+idOperateur+"/"+idOperation,"");

  }
  findOperatorById(id:any){
    return this.httpClient.get("http://localhost:8082/operateurs/"+id)

  }
  updatecodeFormation(id:any ,Code:string){
    return this.httpClient.patch("http://localhost:8082/operateurs/update/CodeFormation/"+id ,Code)

  }
  updateMethode(id:any ,Code:string){
    return this.httpClient.patch("http://localhost:8082/operateurs/update/Methode/"+id ,Code)

  }
  updateDocumentIdentification(id:any ,Code:string){
    return this.httpClient.patch("http://localhost:8082/operateurs/update/Document/"+id ,Code)

  }
  updateQualification(qualification :string ,idOperateur:number){
    return this.httpClient.patch("http://localhost:8082/operateurs/update/qualification/"+idOperateur,qualification);

  }
  
  
}
