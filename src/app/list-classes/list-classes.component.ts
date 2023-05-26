import { UserAuthService } from './../services/user-auth.service';
import { saveAs } from 'file-saver';
import { HttpHeaders } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Class } from '../Entities/class';
import { ClassService } from '../services/class.service.service';
import { ClassFromDB } from '../Entities/RequestDownload';
import { MatDialog } from '@angular/material/dialog';
import { DataPassingService } from '../services/data-passing.service';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { Location } from '@angular/common';

@Component({
  selector: 'app-list-classes',
  templateUrl: './list-classes.component.html',
  styleUrls: ['./list-classes.component.css']
})
export class ListClassesComponent implements OnInit {
  classes!: ClassFromDB[]; // this is the array of classes that will be displayed in the list
  packageNames!: string[]; // this is the array of package names that will be displayed in the list
  constructor(private userAuthService: UserAuthService, private classService: ClassService, private router: Router, private route: ActivatedRoute, public dialog: MatDialog, private dataPassing: DataPassingService) { }
  projectId!: number;
  groupId!: string;
  doesListHaveClasses: boolean = true;
  email:string | null= this.userAuthService.getEmail();
  isProjectIdZero:boolean=false; // this is used to check if the project id is zero or not so the add button could be show or not
  ngOnInit(): void {
    if (!this.userAuthService.isLoggedIn()) {
      this.router.navigate(['login']);
    }
    this.route.paramMap.subscribe(params => {
      this.projectId = params.get('id') as unknown as number;
    }
    )
    if(this.projectId==0){
      this.isProjectIdZero = true;
      this.classService.findAllPackageNamesOfUser(this.email!).subscribe(data=>{
        this.packageNames=data;
        
      });
      this.classService.findClassesByUserEmail(this.email!).subscribe(data=>{
        this.classes=data;
      });
      return;
    }
    this.classService.findAllClasses(this.projectId).subscribe(data => {
      this.classes = data;
      if (this.classes.length < 1) {
        this.doesListHaveClasses = false;
      }
    });

    console.log(this.projectId)
    this.classService.findAllPackages(this.projectId).subscribe(data => {
      this.packageNames = data;
    });
    this.groupId = this.dataPassing.getGroupId;
  }


  public navigateToCreateClassPage(packageName: any) {
    console.log(packageName);
    console.log(this.projectId);
    this.router.navigate(['/classes'], { queryParams: { packageName: packageName } });
  }

  downloadClass(myclass: ClassFromDB): void {
    console.log(myclass);
    this.classService.downloadClass(myclass).subscribe((blob: Blob) => {
      saveAs(blob, myclass.className + '.java');
    }
    );
  }
  deleteClass(id: number): any {
    this.classService.deleteClass(id, this.projectId).subscribe(
      (response: any) => {
        this.ngOnInit();
      }
    );
  }

  openConfirmationToDelete(id: number) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: { classId: id }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteClass(id);
      }
    });
  }



}


