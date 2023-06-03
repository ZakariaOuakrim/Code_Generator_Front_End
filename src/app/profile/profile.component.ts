import { UserAuthService } from './../services/user-auth.service';
import { User } from './../Entities/userDetail';
import { UserService } from './../services/user.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit{
  constructor(private userService:UserService,private userAuthService:UserAuthService,private route:Router){}
  user!:User;
  userName!:String
  nbrOfProjects!:number
  email!:String
  isAccountVerified!:string
  role!:string
  ngOnInit(): void {
    this.userService.getUser(this.userAuthService.getEmail() || "").subscribe(
      data=>{
        this.user=data;
        console.log(this.user)
        this.userName=this.user.name;
        this.nbrOfProjects=this.user.projects.length;
        console.log(this.nbrOfProjects)
        this.email=this.user.email;
        if(this.user.enabled==true){
          this.isAccountVerified="Valid";
        }
        this.role=this.user.role;
      }
    )
  }

  logout(){
    this.userAuthService.clear();
    this.route.navigate(['login']);
  }

}
