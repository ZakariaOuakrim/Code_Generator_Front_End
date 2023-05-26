import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
@Component({
  selector: 'app-modify-class',
  templateUrl: './modify-class.component.html',
  styleUrls: ['./modify-class.component.css']
})
export class ModifyClassComponent implements OnInit{
  
  constructor(private fb:FormBuilder) { }
  ngOnInit(): void {
  }
  form = this.fb.group({
  })

  modifyClass(classForm: any) {
    
  }
    
}
