import { Dependency } from './../Entities/dependency';
import { FormBuilder, Validators } from '@angular/forms';
import { DepenedencyService } from '../services/depenedency-service';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DependencyListComponent } from '../dependency-list/dependency-list.component';

@Component({
  selector: 'app-dependency-dialog',
  templateUrl: './dependency-dialog.component.html',
  styleUrls: ['./dependency-dialog.component.css']
})

export class DependencyDialogComponent implements OnInit {
  constructor(public dialogRef: MatDialogRef<DependencyDialogComponent>, private dependencyService: DepenedencyService, private fb: FormBuilder, @Inject(MAT_DIALOG_DATA) public data: number) { }
  dependency!: Dependency
  mode!:string;
  ngOnInit(): void {
    if (this.data != null) {
      this.dependencyService.getDependencyById(this.data).subscribe(
        data => {
          //initialize the form 
          this.dependency = data as Dependency
          this.form.patchValue({
            groupId:this.dependency.groupId,
            artifactId:this.dependency.artifactId,
            version:this.dependency.version       
          });
          this.mode="modify";
        }
      )
    }else{
      this.mode="add"
    }
  }
  form = this.fb.group({
    groupId: ['', Validators.required],
    artifactId: ['', Validators.required],
    version: ['', Validators.required],
  });
  onClose(): void {
    this.dialogRef.close();
  }
  addNewDependency(dependencyForm: any) {
    if(this.mode=="add"){
      this.dependencyService.addADependency(dependencyForm.value).subscribe(data => {
        console.log(data);
        this.onClose();
      });
    }
    else{
      this.dependencyService.modifyDependency(dependencyForm.value,this.data).subscribe(data=>{
        console.log("modified");
        this.onClose();
      })
    }
  }
}

