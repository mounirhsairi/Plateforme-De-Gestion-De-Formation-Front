import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OperationServiceService {

  constructor(private httpClient:HttpClient) { }


  FilterOperatorByLigne(idLigne:Number){
    return this.httpClient.get("http://localhost:8082/operateurs/ligne/"+idLigne)
  }
  getOperations(){
    return this.httpClient.get("http://localhost:8082/operations/all")
  }
  getOperationByLigne(idLigne:number){
    return this.httpClient.get("http://localhost:8082/operations/lignes/"+idLigne)
  }
  createOperation(model:any,idLigne:number){
    return this.httpClient.post("http://localhost:8082/operations/Create/"+idLigne,model)

  }
  DeleteOperation(id:any){
    return this.httpClient.delete("http://localhost:8082/operations/delete/"+id)
  }
}
