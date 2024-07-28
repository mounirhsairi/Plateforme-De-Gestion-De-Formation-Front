import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BesoinPersonnel } from '../model/BesoinPersonnel.model';

@Injectable({
  providedIn: 'root'
})
export class DemandeService {

  constructor(private httpClient:HttpClient) { }

  CreateDemandeRecutement(model:any){
    return this.httpClient.post("http://localhost:8082/demandes/Create", model);

  }
  CreateDemandePolyvalence(model:any){
    return this.httpClient.post("http://localhost:8082/demandesPoly/Create", model);

  }
  getAllDemandeRecrutement(){
    return this.httpClient.get("http://localhost:8082/demandes/all");
  }
  getAllDemandePolyvalence(){
    return this.httpClient.get("http://localhost:8082/demandesPoly/all");
  }
  UpdateEtatDemande(idDemande:number ,etat:string){
    return this.httpClient.patch("http://localhost:8082/demandes/update/etat/"+idDemande+"/"+etat ,"")
  }
  UpdateEtatDemandePoly(idDemande:number ,etat:string){
    return this.httpClient.patch("http://localhost:8082/demandesPoly/update/etat/"+idDemande+"/"+etat ,"")
  }
  getDemandeRecrutementById(id:any){
    return this.httpClient.get("http://localhost:8082/demandes/"+id)
  }
  DeleteDemandeRecrutement(id:any){
    return this.httpClient.delete("http://localhost:8082/demandes/delete/"+id)
  }
  UpdateDemandeRecrutement(id: any, model: any) {
    return this.httpClient.patch("http://localhost:8082/demandes/update/" + id, model);
  }
  DeleteDemandePoly(id:any){
    return this.httpClient.delete("http://localhost:8082/demandesPoly/delete/"+id)
  }
  getDemandePolyById(id:any){
    return this.httpClient.get("http://localhost:8082/demandesPoly/"+id)
  }
  JustCreateDemandeRecutement(model:any){
    return this.httpClient.post("http://localhost:8082/demandes/just/Create", model);

  }
  JustCreateDemandePolyvalence(model:any){
    return this.httpClient.post("http://localhost:8082/demandesPoly/just/Create", model);

  }
  UpdateEtEnvoiDemandeRecrutement(id: any) {
    return this.httpClient.patch("http://localhost:8082/demandes/UEE/" + id, "");
  }
  UpdateEtEnvoiDemandePoly(id: any) {
    return this.httpClient.patch("http://localhost:8082/demandesPoly/UEE/" + id, "");
  }
}
