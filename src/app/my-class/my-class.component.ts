import { ClassFromDB } from './../Entities/RequestDownload';
import { Method } from './../Entities/method';
import { Property } from './../Entities/Property';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Class } from '../Entities/class';
import { ClassService } from '../services/class.service.service';
import { Parameter } from '../Entities/parameter';
import { ActivatedRoute, Router } from '@angular/router';
import { DataPassingService } from '../services/data-passing.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-my-class',
  templateUrl: './my-class.component.html',
  styleUrls: ['./my-class.component.css']
})
export class MyClassComponent implements OnInit {
  packageNameComingFromList!: string;
  class: Class = new Class();
  selectedRadio!: number;
  selectedAccessOption!: 'private';
  selectVisibilityOption!: 'public';
  selectedGenerationType = 'AUTO';
  GeneratedValue!: boolean;
  count: number = 0;
  projectId!: number;
  packageName!: string;
  isThereAnError: boolean = false;
  errorMessage: string = '';
  classToModifyId: number = + this.route.snapshot.paramMap.get("classModifyId")! ?? '';
  mode: string = this.route.snapshot.paramMap.get("mode") ?? '';
  classModify!: ClassFromDB;
  constructor(private snackBar: MatSnackBar, private http: HttpClient, private fb: FormBuilder, private classService: ClassService, private route: ActivatedRoute, private dataPassing: DataPassingService, private router: Router) { }
  ngOnInit(): void {
    this.selectedAccessOption = 'private'
    this.selectVisibilityOption = 'public'
    if (this.mode == 'modify') {
      this.classService.getClass(this.classToModifyId).subscribe(data => {
        this.classModify = data as ClassFromDB;
        console.log(this.classModify.className);
        this.getTheInitialValues();
      }
      );
    }

  }
  form = this.fb.group({
    //we create a form control to get user input values from the form
    packageName: new FormControl(this.route.snapshot.paramMap.get("package") ?? ''),
    className: new FormControl(this.classModify?.className ?? ''),
    classType: new FormControl(''),
    isGenerateService: new FormControl(''),
    isGenerateRepository: new FormControl(''),
    isGenerateController: new FormControl(''),
    tableName: new FormControl(''),
    requestMappingURL: new FormControl(''),
    isIdGenerate: new FormControl(''),
    isGeneratedValue: new FormControl(''),
    generatedType: new FormControl(''),
    properties: this.fb.array([]),
    methods: this.fb.array([]),

  })
  getTheInitialValues() {
    if(this.classModify.properties!=null){
    }
    this.form.patchValue({
      packageName: this.classModify?.packageName,
      isGeneratedValue: this.classModify?.isGeneratedValue as boolean ? '1' : '0',
      className: this.classModify?.className,
      classType: this.classModify?.classType,
      isGenerateService: this.classModify?.service as boolean ? '1' : '0',
      isGenerateRepository: this.classModify?.isGenerateRepository as boolean ? '1' : '0',
      isGenerateController: this.classModify?.isGenerateController as boolean ? '1' : '0',
      requestMappingURL: this.classModify?.requestMappingURL,
      isIdGenerate: this.classModify?.isIdGenerate as boolean ? '1' : '0',
      tableName: this.classModify?.tableName,
      generatedType: this.classModify?.generatedType,
    }
    );
    if(this.form.get("classType")?.value=='Entity'){
      this.selectedRadio=1
    }
    else if(this.form.get("classType")?.value=='Component'){
      this.selectedRadio=2;
    }
    else if(this.form.get("classType")?.value=='Controller_GEN' || this.form.get("classType")?.value=='Controller'){
      this.selectedRadio=3;
    }
    else if(this.form.get("classType")?.value=='Service_GEN' || this.form.get("classType")?.value=='Service'){
      this.selectedRadio=4;
    }
    else if(this.form.get("classType")?.value=='Configuration'){
      this.selectedRadio=5;
    }

    if (this.classModify?.properties.length != 0) {
      this.classModify?.properties.forEach(property => {
        this.addPropertyFiled();
        this.properties.controls[this.count - 1].patchValue({
          type: property.type,
          name: property.name,
          accessibilityType: property.access_modifier,
          value: property.value,
          columnName: property.columnName,
          isAutowired: property.autowired ? '1' : '0'
        });
      });
    }
    if (this.classModify?.methods.length != 0) {
      this.classModify?.methods.forEach(method => {
        this.addMethodField();
        this.methods.controls[this.count - 1].patchValue({
          visibility: method.visibility,
          type: method.returnType,
          name: method.name,
          body: method.body,
          requestMappingType: method.requestMappingType,
        });
        if (method.parameters.length != 0) {
          method.parameters.forEach(parameter => {
            this.addParameterFiled(this.count - 1);
            this.parameters(this.count - 1).controls[this.parameters(this.count - 1).length - 1].patchValue({
              type: parameter.type,
              name: parameter.name
            });
          });
        }
      });
    }
  }
  //creating a form group



  createANewClass(classForm: any) {

    //setting the package name of the class
    this.class.packageName = this.form.value.packageName ?? '';
    //setting the class name of the class
    this.class.className = this.form.value.className ?? '';
    this.class.classType = this.getClassType(this.selectedRadio) ?? "";
    const projectIdParam = this.route.snapshot.paramMap.get("id");
    console.log("project id param " + projectIdParam);
    this.class.projectId = projectIdParam ? parseInt(projectIdParam) : 0;
    if (this.class.classType == 'Entity') {
      this.class.service = (this.form.value.isGenerateService ?? '') == '1' ? true : false;
      this.class.generateRepository = (this.form.value.isGenerateRepository ?? '') == '1' ? true : false;
      this.class.generateController = (this.form.value.isGenerateController ?? '') == '1' ? true : false;
      this.class.tableName = this.form.value.tableName ?? '';
      this.class.idGenerate = (this.form.value.isIdGenerate ?? '') == '1' ? true : false;
      this.class.generatedValue = (this.form.value.isGeneratedValue ?? '') == '1' ? true : false;
      this.class.generatedType = this.form.value.generatedType ?? '';
    }
    if (this.class.classType == 'Controller') {
      this.class.requestMappingURL = this.form.value.requestMappingURL ?? '';
    }

    if (this.properties.length > 0) {
      //intializing the properties array
      this.class.properties = [];
      let property;
      while (this.properties.length != 0) {
        property = new Property();
        property.access_modifier = this.properties.controls[0].value.accessibilityType;
        property.type = this.properties.controls[0].value.type;
        property.name = this.properties.controls[0].value.name;
        property.value = this.properties.controls[0].value.value;
        property.columnName = this.properties.controls[0].value.columnName;
        property.autowired = (this.properties.controls[0].value.isAutowired ?? '') == '1' ? true : false;
        this.class.properties.push(property);
        this.properties.removeAt(0);
      }
    }



    if (this.methods.length > 0) {
      this.class.methods = [];
      let method;
      let parameter;


      while (this.methods.length != 0) {
        method = new Method();
        method.visibility = this.methods.controls[0].value.visibility;
        method.returnType = this.methods.controls[0].value.type;
        method.name = this.methods.controls[0].value.name;
        method.body = this.methods.controls[0].value.body;
        method.requestMappingType = this.methods.controls[0].value.requestMappingType;
        //adding the parameters to the method
        if (this.methods.controls[0].value.parameters.length > 0) {
          method.parameters = [];
          while (this.methods.controls[0].value.parameters.length != 0) {
            parameter = new Parameter();
            parameter.type = this.parameters(0).controls[0].value.type;
            parameter.name = this.parameters(0).controls[0].value.name;
            method.parameters.push(parameter);
            this.parameters(0).removeAt(0);
          }
        }
        this.class.methods.push(method);
        this.methods.removeAt(0)
      }
    }
    //last values testing
    //sending the class object to the backend
    if(this.mode=='modify'){
      this.class.mode="modify";
      
    }
    this.classService.createNewClass(this.class).subscribe(
      (response: any) => {
        console.log("sent successfully");
        console.log(response);
        this.router.navigate(['/listOfClasses', this.class.projectId]);
        this.openSnackBar('Class created successfully'); // Display snack bar message
      }, (error: any) => {
        console.log(error.error.text);
        this.isThereAnError = true;
        this.errorMessage = "This Class already exists";
      }
    );
  }
  openSnackBar(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 3000, // Display duration in milliseconds
    });
  }


  private getClassType(num: number) {
    if (num == 1) {
      return 'Entity';
    }
    else if (num == 2) {
      return 'Component';
    }
    else if (num == 3) {
      return 'Controller';
    }
    else if (num == 4) {
      return 'Service';
    }
    else if (num == 5) {
      return 'Configuration';
    }
    else {
      return '';
    }
  }





  addPropertyFiled() {
    const propertyForm = this.fb.group({
      type: [''],
      name: [''],
      accessibilityType: ['private'],
      value: [''],
      columnName: [''],
      isAutowired: ['']
    });
    this.properties.push(propertyForm)
    this.count++;
  }

  deletePropertyFiled() {
    this.properties.removeAt(this.properties.length - 1);
  }

  addMethodField() {
    const methodForm = this.fb.group({
      type: [''],
      name: [''],
      body: [''],
      visibility: ['public'],
      requestMappingType: [''],
      parameters: this.fb.array([]),

    });
    this.methods.push(methodForm);
  }
  deleteMethodField() {
    this.methods.removeAt(this.methods.length - 1);
  }

  addParameterFiled(indexMethod: number) {
    const parameterForm = this.fb.group({
      type: [''],
      name: ['']
    });
    this.parameters(indexMethod).push(parameterForm)
  }
  deleteParameterFiled(indexMethod: number) {
    this.parameters(indexMethod).removeAt(this.parameters.length - 1);
  }

  get properties(): FormArray {
    return this.form.controls["properties"] as FormArray;
  }


  get methods(): FormArray {
    return this.form.controls["methods"] as FormArray;
  }

  parameters(index: number): FormArray {
    return this.methods.controls[index].get("parameters") as FormArray;
  }



}
