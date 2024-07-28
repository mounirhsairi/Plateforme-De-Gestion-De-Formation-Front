import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProgramServiceService {

  constructor(private httpClient:HttpClient) { }


  getAllProgram(){
    return this.httpClient.get("http://localhost:8082/program/all")
  }
  getProgram(id:any){
    return this.httpClient.get("http://localhost:8082/program/"+id)
  }
  creerSession(model:any,id:any){
    return this.httpClient.post("http://localhost:8082/session/"+id+"/Create",model)

  }
  addtosession(id:any ,model:any){
    return this.httpClient.patch("http://localhost:8082/session/update/"+id,model)

  }
  getListProgrammeBysession(id:any){
    return this.httpClient.get("http://localhost:8082/session/"+id)

  }
  delete(id:any){
    return this.httpClient.delete("http://localhost:8082/session/delete/programme/"+id)

  }
  deletesession(id:any){
    return this.httpClient.delete("http://localhost:8082/session/delete/"+id)

  }
}
