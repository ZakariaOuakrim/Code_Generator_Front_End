import { CanActivate, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { UserAuthService } from './user-auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGardService implements CanActivate{

  constructor(private authService:UserAuthService,private route:Router) { }
  canActivate() {
    if(this.authService.isLoggedIn()){
      return true;
    }else{
      this.route.navigate(['/login']);
      return false;
    }
  }
}
