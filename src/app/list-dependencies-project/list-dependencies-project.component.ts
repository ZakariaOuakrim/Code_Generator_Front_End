import { UserAuthService } from './../services/user-auth.service';
import { ProjectService } from './../services/project-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Dependency } from '../Entities/dependency';
import { DepenedencyService } from '../services/depenedency-service';

@Component({
  selector: 'app-list-dependencies-project',
  templateUrl: './list-dependencies-project.component.html',
  styleUrls: ['./list-dependencies-project.component.css']
})
export class ListDependenciesProjectComponent implements OnInit {
  dependencies!:Dependency[];
  projectDepndencies:number[]=[];
  searchText!:string;
  projectId!:number;
  constructor(private router:Router,private userAuthService:UserAuthService,private dependencyService:DepenedencyService,private projectService:ProjectService,private route:ActivatedRoute) { }
  ngOnInit(): void {
    if(!this.userAuthService.isLoggedIn()){
      this.router.navigate(['login']);
    }
    this.dependencyService.getAllDependencies().subscribe(data=>{
      this.dependencies=data;
    });
    this.projectId=this.route.snapshot.params['id'] as number;
    this.dependencyService.getAllProjectDependencies(this.projectId).subscribe(data=>{
      this.projectDepndencies=data;
    }
    );
  }

  
  addDependencyToProject(dependencyId:number){
    this.projectService.addDependencyToProject(this.projectId,dependencyId).subscribe(data=>{
      console.log(data);
    });
    this.ngOnInit();
  }
  deleteDependencyFromProject(dependencyId:number){
    this.projectService.deleteDependencyFromProject(this.projectId,dependencyId).subscribe(
      ()=>{
      console.log("deleted success");
    },error=>{
      console.log(error)
    }
    );
    this.ngOnInit();
  }


}
