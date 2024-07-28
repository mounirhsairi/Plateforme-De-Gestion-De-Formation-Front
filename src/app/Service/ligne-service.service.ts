import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LigneServiceService {
  
  constructor(private httpClient:HttpClient) { }
  getLignes(){
    return this.httpClient.get("http://localhost:8082/lignes/all")
  }
  createLigne(model:any){
    return this.httpClient.post("http://localhost:8082/lignes/Create",model);
  }
  deleteLigne(id:any){
    return this.httpClient.delete("http://localhost:8082/lignes/delete/"+id)
  }
}

