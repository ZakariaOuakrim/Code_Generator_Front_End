import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserAuthService {

  constructor() { }
  public setRoles(roles:[]){
    sessionStorage.setItem('roles',JSON.stringify(roles));
  }
  public getRoles(){
    return JSON.parse(sessionStorage.getItem('roles')!);
  }
  public setToken(token:string){
    localStorage.setItem('token',token);
  } 
  public getToken() {
    return  localStorage.getItem('token');
  }
  public clear(){
    sessionStorage.clear();
  }
  public isLoggedIn():boolean{
    return this.getToken() && this.getRoles()   
  }
  public setUserName(userName:string){
    sessionStorage.setItem('username',userName);
  }
  public getUserName(){
    return sessionStorage.getItem('username');
  }
  public getEmail(){
    return sessionStorage.getItem('email');
  }
  public setEmail(email:string){
    return sessionStorage.setItem('email',email);
  }
  public setActiveUserRole(role:string){
    sessionStorage.setItem('activeUserRole',role);
  }
  public getActiveUserRole(){
    return sessionStorage.getItem('activeUserRole') as string;
  }


}
