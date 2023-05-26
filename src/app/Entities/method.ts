import { Parameter } from "./parameter";

export class Method{
    visibility!:string;
    returnType!:string;
    name!:string;
    body!:string;
    parameters!:Parameter[];
    requestMappingType!:string;
}