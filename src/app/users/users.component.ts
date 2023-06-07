import { UserService } from './../services/user.service';
import { Component, OnInit } from '@angular/core';
import { User } from '../Entities/userDetail';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit{
  users!:User[];
  constructor(private userService:UserService){}
  ngOnInit(): void {
    this.userService.getAllUsers().subscribe(data=>{
      this.users=data;
    });
  }

  deleteUser(email:string){
    this.userService.deleteUser(email).subscribe(data=>{
      console.log(data);
     this.ngOnInit()
    });
  }


}
