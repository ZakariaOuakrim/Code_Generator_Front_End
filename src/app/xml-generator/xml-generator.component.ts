import { UserAuthService } from './../services/user-auth.service';
import { ClassService } from './../services/class.service.service';
import { CodeDialogComponent } from './../code-dialog/code-dialog.component';
import { ClassFromDB } from './../Entities/RequestDownload';
import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FileService } from '../services/file-service.service';
import { MatDialog } from '@angular/material/dialog';
import * as saveAs from 'file-saver';

@Component({
  selector: 'app-xml-generator',
  templateUrl: './xml-generator.component.html',
  styleUrls: ['./xml-generator.component.css']
})
export class XmlGeneratorComponent  {

  selectedFiles!: File[];
  error!:string;
  classes!:ClassFromDB[]
  loadingUpload:boolean=false;

  constructor(private http: HttpClient,private userAuthService:UserAuthService, private fileService: FileService,private dialog: MatDialog,private classService:ClassService) { }


  onFileSelected(event: any) {
    this.selectedFiles = event.target.files;
  }
  
  uploadFile() {
    this.loadingUpload=true
    this.fileService.uploadFile(this.selectedFiles,this.userAuthService.getEmail()??'').subscribe(
      (response:ClassFromDB[])=>{
        this.classes= response;
        this.loadingUpload=false;
      }
    )

  }

  downloadClass(_class:ClassFromDB){
    this.classService.downloadClass(_class).subscribe((blob: Blob) => {
      saveAs(blob, _class.className + '.java');
    }
    );  
  }
}
