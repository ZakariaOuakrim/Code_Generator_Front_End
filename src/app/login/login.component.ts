import { User } from './../Entities/userDetail';
import { UserAuthService } from './../services/user-auth.service';
import { UserService } from './../services/user.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user: User = new User();
  trueCredentials: boolean = true;
  accountNotVerified: boolean = false;
  hide = true;

  ngOnInit(): void {
    //throw new Error('Method not implemented.');
  }
  constructor(private userService: UserService, private router: Router, private userAuthService: UserAuthService) { }
  form = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  });

  login(_loginForm: any) {
    this.user.email = this.Email!.value ?? '';
    this.user.password = this.Password!.value ?? '';
    this.userService.login_user(this.user).subscribe(
      (response: any) => {
        if (response.token == null && response.user == null) {
          console.log("Invalid Credentials");
          this.trueCredentials = false;
          this.accountNotVerified=false
          return;
        }
       
        console.log(response.token);
        console.log(response.user);
        this.userAuthService.setToken(response.token);
        if(response.user===null){
          this.accountNotVerified=true;
          this.trueCredentials=true;
          return;
        }
        this.userAuthService.setRoles(response.user.role);
        this.userAuthService.setUserName(response.user.username);
        this.userAuthService.setEmail(response.user.email)
        const role = response.user.role;
        this.userAuthService.setActiveUserRole(role);
        if (role === 'USER') {
          this.router.navigate(['/user']);
        }
        if (role === 'ADMIN') {
          this.router.navigate(['/admin']);
        }
      }, (error: any) => {
        console.log(error);
      }
    );
  }

  get Email() {
    return this.form.get('email');
  }
  get Password() {
    return this.form.get('password');
  }

}


