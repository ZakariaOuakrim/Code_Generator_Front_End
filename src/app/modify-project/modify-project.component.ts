import { ProjectService } from './../services/project-service.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder } from '@angular/forms';
import { Component, Inject, OnInit } from '@angular/core';

@Component({
  selector: 'app-modify-project',
  templateUrl: './modify-project.component.html',
  styleUrls: ['./modify-project.component.css']
})
export class ModifyProjectComponent implements OnInit{
  constructor(private fb:FormBuilder,public dialogRef: MatDialogRef<ModifyProjectComponent>,private projectService:ProjectService,@Inject(MAT_DIALOG_DATA) public data: number){}
  projectVersion!:string;
  ngOnInit(): void {
    this.projectService.getProjectById(this.data).subscribe(
      (response:any)=>{
        if(response.projectVersion=="jar"){
          this.projectVersion="jar";
        }else{
          this.projectVersion="war";
        }

        this.form.patchValue({
          groupId:response.groupId,
          artifactId:response.artifactId,
          version:response.version,
          modelVersion:response.modelVersion,
          description:response.description,
          projectVersion:this.projectVersion
        })
      }
    )
  }
  form=this.fb.group({
    groupId:[''],
    artifactId:[''],
    version:[''],
    modelVersion:[''],
    description:[''],
    projectVersion:['']
  })

  modifyProject(classForm:any){
    this.projectService.modifyProject(this.data,classForm.value).subscribe(
      (response:any)=>{
        this.dialogRef.close();
      }
    )
  }
  onClose(): void {
    this.dialogRef.close();
  }
}
