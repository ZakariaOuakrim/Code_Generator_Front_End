import { ActivatedRoute } from '@angular/router';
import { UserService } from './../services/user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-verify-account',
  templateUrl: './verify-account.component.html',
  styleUrls: ['./verify-account.component.css']
})
export class VerifyAccountComponent implements OnInit{
  constructor(private userService:UserService,private route:ActivatedRoute){}
  ngOnInit(): void {
    this.userService.verifyAccount(this.route.snapshot.params['email']).subscribe();
  }
  
}
