import { SettingsComponent } from './settings/settings.component';
import { MyClassComponent } from './my-class/my-class.component';
import { AdminComponent } from './admin/admin.component';
import { HomeComponent } from './home/home.component';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignUpComponent } from './sign-up/sign-up.component';
import { ProfileComponent } from './profile/profile.component';
import { NavComponent } from './nav/nav.component';
import { DashComponent } from './dash/dash.component';
import { UserComponent } from './user/user.component';
import { ProjectComponent } from './project/project.component';
import { TestingDeleteComponent } from './testing-delete/testing-delete.component';
import { ListClassesComponent } from './list-classes/list-classes.component';
import { ListProjectsComponent } from './list-projects/list-projects.component';
import { ModifyClassComponent } from './modify-class/modify-class.component';
import { DependencyListComponent } from './dependency-list/dependency-list.component';
import { ListDependenciesProjectComponent } from './list-dependencies-project/list-dependencies-project.component';
import { VerifyAccountComponent } from './verify-account/verify-account.component';
import { XmlGeneratorComponent } from './xml-generator/xml-generator.component';
import { AuthGardService } from './services/auth-gard.service';


const routes: Routes = [
      {path:'',component:LoginComponent},
      {path: 'login',component: LoginComponent },
      {path:'signup',component: SignUpComponent},
      {path:'signUp',component:SignUpComponent },
      {path:'profile/:adminId',component: ProfileComponent ,canActivate:[AuthGardService] },
      {path: 'home',component: AppComponent, canActivate:[AuthGardService] },
      {path:'navPage',component:NavComponent , canActivate:[AuthGardService]},
      {path:'dashboard',component:DashComponent , canActivate:[AuthGardService]},
      {path:'user',component:UserComponent ,canActivate:[AuthGardService]},
      {path:'admin',component:AdminComponent , canActivate:[AuthGardService]},
      {path:'createClass',component:MyClassComponent , canActivate:[AuthGardService]},
      {path:'project',component:ProjectComponent , canActivate:[AuthGardService]},
      {path:'classes/:mode/:id/:package/:classModifyId',component:MyClassComponent , canActivate:[AuthGardService]},
      {path:'test',component:TestingDeleteComponent , canActivate:[AuthGardService]},
      {path:'listOfClasses/:id',component:ListClassesComponent , canActivate:[AuthGardService]},
      {path:'listOfProjects',component:ListProjectsComponent ,canActivate:[AuthGardService]},
      {path:'modifyClass/:projectId/:id',component:ModifyClassComponent , canActivate:[AuthGardService]},
      {path:'listOfDependencies',component:DependencyListComponent , canActivate:[AuthGardService]},
      {path:'ListDependenciesProject/:id',component:ListDependenciesProjectComponent , canActivate:[AuthGardService]},
      {path:'verifyAccount/:email',component:VerifyAccountComponent, canActivate:[AuthGardService]},
      {path:'settings',component:SettingsComponent , canActivate:[AuthGardService]},
      {path:'uploadXmlFile',component:XmlGeneratorComponent , canActivate:[AuthGardService]}
    ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }