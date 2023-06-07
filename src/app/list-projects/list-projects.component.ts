import { ModifyProjectComponent } from './../modify-project/modify-project.component';
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
  loadingDownload:boolean=false;
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
    try{
      this.projectService.getAllProjects(this.userAuthService.getEmail() || '').subscribe(
        (response:Project[])=>{
          this.projects=response;
          if(this.projects.length===0){
            this.doesListHaveProjects=false;
          }
        },
        (error)=>{
          console.log(error)
        }
      )
    }catch(erro){
      this.route.navigate(['login']);
    }
 

  }
  public downloadProject(project:Project){
    this.loadingDownload=true;
    this.projectService.generateProject(project,this.userAuthService.getEmail() || "").subscribe((response:any)=>{
      const blob = new Blob([response], { type: 'application/octet-stream' });

      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.download = project.artifactId + '.zip';
  
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      this.loadingDownload=false;

    })
  }
  setGroupId(groupId:string){
    this.dataPassingService.setGroupId=groupId;
  }

  public deleteProject(projectId:number){
    this.loadingDownload=true;

    this.projectService.deleteProject(projectId).subscribe(
      (response:any)=>{
        this.ngOnInit();
      }
    );
    this.loadingDownload=false;

  }
  openConfirmationToDelete(projectId: number) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: projectId
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteProject(projectId);
      }
    });
  }
  modifyProject(projectId:number){
    const dialogRed = this.dialog.open(ModifyProjectComponent,{
      data:projectId
    });
  }



}
