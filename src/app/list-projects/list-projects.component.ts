import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DataPassingService } from './../services/data-passing.service';
import { saveAs } from 'file-saver';
import { ProjectService } from './../services/project-service.service';
import { Component, OnInit } from '@angular/core';
import { Project } from '../Entities/Project';
import { UserAuthService } from '../services/user-auth.service';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-list-projects',
  templateUrl: './list-projects.component.html',
  styleUrls: ['./list-projects.component.css']
})
export class ListProjectsComponent implements OnInit{
  projects!:Project[];  
  constructor(private dialog:MatDialog,private route:Router,private dataPassingService:DataPassingService,private projectService:ProjectService,private userAuthService:UserAuthService) { }
  isUserAdmin:boolean=false;
  doesListHaveProjects:boolean=true;
  ngOnInit(): void {
    if(!this.userAuthService.isLoggedIn() ){
      this.route.navigate(['login']);
    }
    if(this.userAuthService.getActiveUserRole()=='ADMIN'){
      this.isUserAdmin=true;
      console.log("------------ Admin")
      this.projectService.getAllProjectsAdminVersion().subscribe(
        (response:Project[])=>{
          this.projects=response;
        }
      )
      return;
    }
    this.projectService.getAllProjects(this.userAuthService.getEmail() || '').subscribe(
      (response:Project[])=>{
        this.projects=response;
        if(this.projects.length===0){
          this.doesListHaveProjects=false;
        }
      }
    )

  }
  public downloadProject(project:Project){
    this.projectService.generateProject(project).subscribe((blob:Blob)=>{
      saveAs(blob,project.artifactId);
    })
  }
  setGroupId(groupId:string){
    this.dataPassingService.setGroupId=groupId;
  }

  public deleteProject(projectId:number){
    this.projectService.deleteProject(projectId).subscribe(
      (result:any)=>{
        this.ngOnInit();
      }
    );
  }
  openConfirmationToDelete(id: number) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: { projectId: id }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteProject(id);
      }
    });
  }



}
