import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { loginDto } from '../model/loginDto.model';
import { Observable } from 'rxjs';
import { registerDto } from '../model/registerDto.model';

@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {

  constructor(private httpClient:HttpClient) { }

  login(model:loginDto){
    return this.httpClient.post("http://localhost:8082/api/v1/auth/authenticate", model);

  }
  refreshToken(refreshToken: string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${refreshToken}`
    });

    return this.httpClient.post<any>("http://localhost:8082/api/v1/auth/refresh-token", {}, { headers });
      
  }
  logout(token: string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.httpClient.post("http://localhost:8082/api/v1/auth/logout", {}, { headers });
  }
  registration(model:registerDto){
    return this.httpClient.post("http://localhost:8082/api/v1/auth/register", model);
  }
  GetAllUsers(){
    return this.httpClient.get("http://localhost:8082/api/v1/auth/allUsers");

  }
  deleteUser(id:any){
    return this.httpClient.delete("http://localhost:8082/api/v1/auth/delete/"+id);
  }

}
