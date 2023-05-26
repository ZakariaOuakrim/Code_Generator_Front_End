import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';



@Injectable({providedIn: 'root'})
export class UserServiceService {

  constructor(private httpClient:HttpClient) {}

 // classes$ = this.httpClient.get<>('http://localhost:8080/users');

}
