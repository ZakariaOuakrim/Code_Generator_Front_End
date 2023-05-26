import { UserAuthService } from './../services/user-auth.service';
import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit{

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );
    
  user!:string;
  isUserAdmin:boolean=false;

  constructor(private breakpointObserver: BreakpointObserver,private userAuthService:UserAuthService) {}
  ngOnInit(): void {
    this.user = this.userAuthService.getEmail() || '';
    this.isUserAdmin = this.userAuthService.getActiveUserRole()=='ADMIN';
  }
  
  menuitems = ['Projects','Classes','Logout'];
  showMyClasses: boolean = false;
  showMyProjects:boolean=true;
  dataSource:any; 

  showComponent(item:string){
    switch(item){
      case 'Classes':
        this.showMyClasses = true;
        this.showMyProjects=false;
        break;
      case 'Projects':
        this.showMyClasses = false;
        this.showMyProjects=true;
      break;
      case 'Logout':
        this.showMyClasses = false;
        this.showMyProjects=false;
    }   
  }

}
