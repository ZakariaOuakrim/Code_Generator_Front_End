import { Observable } from 'rxjs';
import { ClassFromDB } from './../Entities/RequestDownload';
import { HttpClient, HttpRequest, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FileService {
  private baseUrl = 'http://localhost:8080/file'
  constructor(private http:HttpClient) { }
  requestHeader = new HttpHeaders({"No-Auth":"True"})

  public uploadFile(files:File[],email:string){
    const formData: FormData = new FormData();
    for(let file of files){
      formData.append('files', file, file.name);
    }
    /*const req= new HttpRequest('POST',`${this.baseUrl}/upload`,formData,{
      reportProgress:true,
      responseType:'json'
    });*/
   return this.http.post<ClassFromDB[]>(this.baseUrl+"/upload/"+email,formData,{headers:this.requestHeader})
  }

}
