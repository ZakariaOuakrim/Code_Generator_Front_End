import { ClassFromDB } from './../Entities/RequestDownload';
import { ClassService } from './../services/class.service.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, Inject, OnInit } from '@angular/core';
import { XmlGeneratorComponent } from '../xml-generator/xml-generator.component';

@Component({
  selector: 'app-code-dialog',
  templateUrl: './code-dialog.component.html',
  styleUrls: ['./code-dialog.component.css']
})
export class CodeDialogComponent implements OnInit{
  constructor(@Inject(MAT_DIALOG_DATA) public data:ClassFromDB,private classService:ClassService){}
  javaCode!:string
  ngOnInit(): void {
    console.log(this.data)
    this.classService.getCodeOfClass(this.data).subscribe(
      response=>{
        console.log(response)
        this.javaCode = response as string;
      }
    )
  }

}
