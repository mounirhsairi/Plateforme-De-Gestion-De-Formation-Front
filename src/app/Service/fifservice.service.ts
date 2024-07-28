import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import {HttpClient, HttpEventType, HttpHeaders, HttpRequest} from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class FiFServiceService {

  constructor(private httpClient:HttpClient) { }
  /*storeImage(imageDataUrl: string): void {
    localStorage.setItem('selectedImage', imageDataUrl);
  }

  getStoredImage(): string | null {
    return localStorage.getItem('selectedImage');
  }

  clearStoredImage(): void {
    localStorage.removeItem('selectedImage');
  }*/
  getAllFiF(){
    return  this.httpClient.get("http://localhost:8082/files/all")

  }
  getFiFByOperator(idOperator:number){
   return  this.httpClient.get("http://localhost:8082/files/"+idOperator)
  }
  createFIF(model:any){
    return this.httpClient.post("http://localhost:8082/files/Create",model)
  }
  uploadFIF(matricule:any){
      return this.httpClient.get("http://localhost:8082/files/upload/"+matricule)
  }
  upload(file: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('file', file);

    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');

    const req = new HttpRequest('POST', "http://localhost:8082/files/upload", formData, {
      headers: headers,
      reportProgress: true,
      responseType: 'json'
    });

    return this.httpClient.request(req).pipe(
      map(event => {
        switch (event.type) {
          case HttpEventType.UploadProgress:
            if (event.total) {
              const progress = Math.round(100 * event.loaded / event.total);
              return { status: 'progress', message: progress };
            }
            break;
          case HttpEventType.Response:
            return event.body;
          default:
            return `Unhandled event: ${event.type}`;
        }
      })
    );
  }
  
  
}
