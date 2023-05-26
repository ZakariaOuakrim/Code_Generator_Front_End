import { ClassFromDB } from './../Entities/RequestDownload';
import { UserAuthService } from './user-auth.service';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Class } from '../Entities/class';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class ClassService {
  private baseUrl = "http://localhost:8080/class";

  requestHeader = new HttpHeaders({"No-Auth":"True"})
  constructor(private http:HttpClient,private userAuthService:UserAuthService) { }

  public createNewClass(myClass:Class){
    return this.http.post(this.baseUrl+"/createnewclass",myClass,{headers:this.requestHeader});
  }

  public findAllClasses(packageId:number){
    return this.http.get<ClassFromDB[]>(this.baseUrl+"/listOfClasses/"+packageId,{headers:this.requestHeader});
  }
  //getting the name of the packages
  public findAllPackages(package_id:number){
    return this.http.get<string[]>(this.baseUrl+"/listOfPackageNames/"+package_id,{headers:this.requestHeader});
  }
  //get all the package names of a user 
  public findAllPackageNamesOfUser(email:string){
    return this.http.get<string[]>(this.baseUrl+"/getAllPackageNamesByEmail/"+email,{headers:this.requestHeader})
  }

  //getting the classes of a package
  public findClassesByPackageName(packageName:string){
    return this.http.get<Class[]>(this.baseUrl+"/"+packageName,{headers:this.requestHeader});
  }
  //get classes of a user
  public findClassesByUserEmail(email:string){
    return this.http.get<ClassFromDB[]>(this.baseUrl+"/listOfClassesByEmail/"+email,{headers:this.requestHeader});
  }

  public downloadClass(myclass:ClassFromDB): Observable<Blob>{
    const headers = new HttpHeaders().append('Accept', 'application/octet-stream');

    return this.http.post(`${this.baseUrl}/downloadClass`, myclass, { headers, responseType: 'blob' });
   //return this.http.get('http://localhost:8080/download', { headers, responseType: 'blob' });

  }

  public deleteClass(id:number,projectId:number){
    return this.http.delete(this.baseUrl+"/deleteClass/"+projectId+"/"+id,{headers:this.requestHeader});
  }

  public getClass(id:number){
    return this.http.get(this.baseUrl+"/getClass/"+id,{headers:this.requestHeader});
  }

  public getCodeOfClass(_class:ClassFromDB){
    return this.http.post(this.baseUrl+"/getCodeOfClass",_class,{headers:this.requestHeader});
  }

}
