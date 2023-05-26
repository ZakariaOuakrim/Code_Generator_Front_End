export class Property{
    access_modifier!:string;
    type!:string;
    name!:string;
    value!:string;
    columnName!:string;
    autowired!:boolean;
    length!:number;
    constructor(access_modifier?:string,type?:string,name?:string,value?:string,columnName?:string,isAutowired?:boolean,length?:number){
        this.access_modifier=access_modifier!;
        this.type=type!;
        this.name=name!;
        this.value=value!;
        this.columnName=columnName!;
        this.autowired=isAutowired!;
        this.length = length!;
    }

   
}