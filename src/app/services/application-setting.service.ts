import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApplicationSetting } from '../Entities/ApplicationSetting';

@Injectable({
  providedIn: 'root'
})
export class ApplicationSettingService {
  baseUrl = "http://localhost:8080/auth"
  requestHeader = new HttpHeaders({"No-Auth":"True"})

  constructor(private http:HttpClient) { }

  public getUserApplicationSetting(email:string){ 
    return this.http.get<ApplicationSetting>(this.baseUrl+"/applicationSettings/"+email,{headers:this.requestHeader});
  }

  public modifyUserApplicationSetting(applicationSetting:ApplicationSetting){
    return this.http.put(this.baseUrl+"/modifyApplicationSetting",applicationSetting,{headers:this.requestHeader})
  }

  

   
}
