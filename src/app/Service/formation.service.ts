import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FormationService {

  constructor(private httpClient:HttpClient) { }

  getAllFormations(){
    return this.httpClient.get("http://localhost:8082/formations/all")
  }
}
