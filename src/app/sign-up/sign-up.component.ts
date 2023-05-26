import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { UserService } from './../services/user.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../Entities/userDetail';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  constructor(private fb: FormBuilder, private userService: UserService) { }
  ngOnInit() {
  }

  formControlOne = this.fb.group({
    userName: ['', Validators.required],
  })
  formControlTwo = this.fb.group({
    email: new FormControl('', [Validators.required, Validators.email])
  });
  formControlTree = this.fb.group({
    password: new FormControl('', Validators.required),
    confirmPassword: new FormControl('', Validators.required)
  })

  user: User = new User();
  isLinear = true;

  signUp() {
    this.user.email = this.formControlTwo.value.email as string;
    this.user.password = this.formControlTree.value.password as string;
    this.user.userName = this.formControlOne.value.userName as string;
    this.userService.registerNewUser(this.user).subscribe(
      (response => {
        console.log("User Registered Successfully");
      })
    )
  };
}



