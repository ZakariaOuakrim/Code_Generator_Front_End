import { UserAuthService } from './../services/user-auth.service';
import { ProjectService } from './../services/project-service.service';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent {
  constructor(private fb:FormBuilder,private projectService:ProjectService,private router:Router,private userAuthService:UserAuthService) { }
  form=this.fb.group({
    artifactId:new FormControl(''),
    groupId:new FormControl('com.example'),
    version:new FormControl('1.0.0'),
    modelVersion:new FormControl('4.0.0'),
    projectVersion:new FormControl('1'),
    description:new FormControl('')
  });

  createANewProject(classForm: any) {
    let project = classForm.value;
    console.log(this.userAuthService.getEmail());
    this.projectService.createNewProject(project,this.userAuthService.getEmail()!).subscribe(
      (response)=>{
        console.log("sent successfully");
          this.router.navigate(['/listOfProjects']);
      }
    );
  }

}
