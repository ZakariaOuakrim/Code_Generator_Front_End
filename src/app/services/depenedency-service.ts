import { Dependency } from './../Entities/dependency';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DepenedencyService {
  private baseUrl = "http://localhost:8080/dependency";
  requestHeader = new HttpHeaders({ "No-Auth": "True" });
  constructor(private http: HttpClient) { }
  public addADependency(dependecy: Dependency) {
    return this.http.post(this.baseUrl + "/addANewDependency", dependecy, { headers: this.requestHeader });
  }
  public getAllDependencies() {
    return this.http.get<Dependency[]>(this.baseUrl + "/getAllDependencies", { headers: this.requestHeader });
  }
  public deleteADependency(dependecyId: number) {
    return this.http.delete(this.baseUrl + "/deleteADependency/"+ dependecyId, { headers: this.requestHeader });
  } 
  public getAllProjectDependencies(id:number){
    return this.http.get<number[]>(this.baseUrl+"/projectDependencies/"+id,{headers:this.requestHeader});
  }
  public getDependencyById(id:number){
    return this.http.get(this.baseUrl+"/getDependencyById/"+id,{headers:this.requestHeader});
  }
  public modifyDependency(dependency:Dependency,id:number){
    return this.http.put(this.baseUrl+"/modifyDependency/"+id,dependency,{headers:this.requestHeader});
  }


}
