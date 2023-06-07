import { Parameter } from './parameter';
import { Method } from './method';
import { Property } from "./Property";

export class Class{
    packageName!:string;
    className!:string;
    classType!:string;
    service!:boolean;
    generateRepository!:boolean;
    generateController!:boolean;
    tableName!:string;
    idGenerate!:boolean;
    generatedValue!:boolean;
    generatedType!:string;
    properties!:Property[];
    methods!:Method[];
    requestMappingURL!:string;
    projectId!:number;
    mode!:string;
    isEmbeddedId!:boolean;
    idOfPropertyId!:number;
}