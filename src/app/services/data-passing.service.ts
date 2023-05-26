import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataPassingService {
  private groupId:string='';
  get getGroupId():string{
    return localStorage.getItem('groupId')!;
  }
  set setGroupId(groupId:string){
    localStorage.setItem('groupId',groupId);
  }

}
