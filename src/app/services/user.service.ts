import { HttpClient, HttpHeaders, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { JwtHelperService } from '@auth0/angular-jwt';  
import { User } from '../Entities/userDetail';

@Injectable({
  providedIn: 'root'
})
export class UserService { 
  private baseUrl='http://localhost:8080/auth';
  requestHeader = new HttpHeaders({"No-Auth":"True"})
  constructor(private http:HttpClient,private router:Router) {}

  saveUserDetails(user:User):Observable<any>{
    let url =this.baseUrl+"register";
    return this.http.post(url,user);
  }
  public login_user(user:User){
    return this.http.post(this.baseUrl+"/authenticate",user,{headers:this.requestHeader});
  }

  isLoggedIn(){
    let jwtHelper =  new JwtHelperService();
    let token =sessionStorage.getItem('token');
    sessionStorage.setItem('token',token!);
    if(!token){
      return false;
    }
    if(token){
      let expirationDate = jwtHelper.getTokenExpirationDate(token);
      let isExpired = jwtHelper.isTokenExpired(token);
      return !isExpired;
    }
    return;
  }

  getUserDetails(userId: string):Observable<any>{
    let url = this.baseUrl + "getUserData/" +userId ;  
    let headers = new HttpHeaders();
    let token =localStorage.getItem('token');
    headers.append('Authorization', 'Bearer ' + token);
    let options = {headers:headers};
    return this.http.get(url,options);  
  }

  public verifyAccount(_email:string){
    return this.http.put(this.baseUrl+"/verifyAccount/"+_email,{headers:this.requestHeader});
  }
  public registerNewUser(_user:User){
    return this.http.post(this.baseUrl+"/register",_user,{headers:this.requestHeader});
  }

  public getUser(email:string){
    return this.http.get<User>(this.baseUrl+"/getUser/"+email,{headers:this.requestHeader});
  }

  public userForgotPassword(_email:string){
    return this.http.put(this.baseUrl+"/forgotPassword/"+_email,{headers:this.requestHeader});
  }
  public getAllUsers(){
    return this.http.get<User[]>(this.baseUrl+"/getAllUsers",{headers:this.requestHeader});

  }
  public deleteUser(email:string){
    return this.http.delete(this.baseUrl+"/deleteUser/"+email,{headers:this.requestHeader});
  }
  
  



}
