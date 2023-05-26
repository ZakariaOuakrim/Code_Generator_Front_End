import { Router } from '@angular/router';
import { DepenedencyService } from '../services/depenedency-service';
import { Dependency } from './../Entities/dependency';
import { MatDialog } from '@angular/material/dialog';
import { UserAuthService } from './../services/user-auth.service';
import { Component, OnInit } from '@angular/core';
import { DependencyDialogComponent } from '../dependency-dialog/dependency-dialog.component';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-dependency-list',
  templateUrl: './dependency-list.component.html',
  styleUrls: ['./dependency-list.component.css']
})
export class DependencyListComponent implements OnInit{
  dependencies!:Dependency[];
  searchText!:string;

  constructor(private router:Router,private depenedencyService:DepenedencyService ,private userAuthService:UserAuthService,private dialog:MatDialog) { }
  ngOnInit(): void {
    if(!this.userAuthService.isLoggedIn()){
      this.router.navigate(['login']);
    }
   this.depenedencyService.getAllDependencies().subscribe(data=>{
      this.dependencies=data;
    });
  }
  openDependencyDialog():void{
    const dialogRef = this.dialog.open(DependencyDialogComponent, {
      
    });
    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit();
    }
    );
  
  }
  openModifyDialog(id:number){
    const dialogRef = this.dialog.open(DependencyDialogComponent,{
      data:id
    });
    dialogRef.afterClosed().subscribe(result=>{
      this.ngOnInit();
    })
  
  }

  deleteDependecies(dependencyId:number){
    this.depenedencyService.deleteADependency(dependencyId).subscribe(data=>{
      console.log(data);
      this.ngOnInit();
    });
  }
  openConfirmationToDelete(id:number){
    const dialogRef = this.dialog.open(ConfirmationDialogComponent,{
      data:{classId:id}
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.deleteDependecies(id);
      }
    });
  }

  
}
