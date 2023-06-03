import { MatSnackBar } from '@angular/material/snack-bar';
import { ApplicationSetting } from './../Entities/ApplicationSetting';
import { FormBuilder } from '@angular/forms';
import { UserAuthService } from './../services/user-auth.service';
import { ApplicationSettingService } from './../services/application-setting.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  form = this.fb.group({
    databaseType:[''],
    applicationPort:[''],
    databaseSourceUrl:[''],
    databaseUserName:[''],
    databasePassword:['']
  })
  constructor(private snackBar: MatSnackBar,private fb:FormBuilder,private applicationSettingService:ApplicationSettingService,private userAuthService:UserAuthService){}
  private applicationSetting!:ApplicationSetting; 
  private id!:number
  ngOnInit(): void {
    this.applicationSettingService.getUserApplicationSetting(this.userAuthService.getEmail()||'').subscribe(
      (data:ApplicationSetting)=>{
        this.id=data.id;
        this.form.patchValue({
          databaseType:data.typeOfDatabase,
          applicationPort:data.applicationPort,
          databaseSourceUrl:data.applicationDataSourceUrl,
          databaseUserName:data.userNameDataSource,
          databasePassword:data.passwordDataSource
        })
      }
    );
  }
  selected = 'PostgreSQL';
  public modifySettings(classForm:any){
    this.applicationSetting = new ApplicationSetting(this.id,this.form.value.databaseType?? "",this.form.value.applicationPort ??"",this.form.value.databaseSourceUrl ?? "",this.form.value.databaseUserName ?? "",this.form.value.databasePassword ?? "");
    this.applicationSettingService.modifyUserApplicationSetting(this.applicationSetting).subscribe(
      (data:any)=>{
        this.ngOnInit();
        this.openSnackBar('Settings modified'); // Display snack bar message
      }
    )
  }
  public seeFile(){
    console.log("See file")
  }

  openSnackBar(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 3000, // Display duration in milliseconds
    });
  }
}
