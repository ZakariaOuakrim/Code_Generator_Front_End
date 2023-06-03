import { UserAuthService } from './user-auth.service';
import { Dependency } from './../Entities/dependency';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Project } from '../Entities/Project';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private baseUrl = "http://localhost:8080/project";
  constructor(private http: HttpClient, private userAuthService: UserAuthService) { }

  requestHeader = new HttpHeaders({ "No-Auth": "True" })
  headers = new HttpHeaders({
    Authorization: `Bearer ${this.userAuthService.getToken()}`,
    'Content-Type': 'application/json'
  });

  public createNewProject(project: Project, user: string) {
    const data = {
      "project": project,
      "email": user
    }
    return this.http.post(this.baseUrl + "/createNewProject", data);
  }
  public getAllProjectsAdminVersion() {
    return this.http.get<Project[]>(this.baseUrl + "/getAllProjectsAdminVersion", { headers: this.headers });
  }

  public getAllProjects(email: string) {
    console.log("headers " + this.headers.get('Authorization'))
    return this.http.get<Project[]>(this.baseUrl + "/getAllProjects/" + email, { headers: this.headers });
  }

  public generateProject(project: Project,email:string) {
    const headers = new HttpHeaders().append('Accept', 'application/octet-stream');
    return this.http.post(this.baseUrl + "/downloadProject/"+email, project, { headers, responseType: 'blob' })
  }
  public addDependencyToProject(projectId: number, dependencyId: number) {
    return this.http.post(this.baseUrl + "/addDependencyToProject/" + projectId, dependencyId, { headers: this.requestHeader });
  }
  public deleteDependencyFromProject(projectId: number, dependencyId: number) {
    return this.http.delete(this.baseUrl + "/deleteDependencyFromProject/" + projectId + "/" + dependencyId, { headers: this.requestHeader });
  }

  public deleteProject(projectId:number){
    return this.http.delete(this.baseUrl+"/deleteProject/"+projectId, { headers: this.requestHeader })
  }
  public getProjectById(projectId:number){
    return this.http.get<Project>(this.baseUrl+"/getProjectById/"+projectId, { headers: this.requestHeader });
  }
  public modifyProject(projectId:number,project:any){
    return this.http.put(this.baseUrl+"/modifyProject/"+projectId,project, { headers: this.requestHeader });
  }


}
