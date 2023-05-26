import { Method } from "./method";
import { Property } from "./Property";



export class ClassFromDB{
    id!:number;
    packageName!:string;
    className!:string;
    classType!:string;
    service!:boolean;
    isGenerateRepository!:boolean;
    isGenerateController!:boolean;
    tableName!:string;
    isIdGenerate!:boolean;
    isGeneratedValue!:boolean;
    generatedType!:string;
    properties!:Property[];
    methods!:Method[];
    requestMappingURL!:string;
}