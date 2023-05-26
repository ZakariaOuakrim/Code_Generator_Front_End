import { Dependency } from "./dependency";

export class Project{
    id!:number;
    artifactId!:string;
    groupId!:string;
    version!:string;
    modelVersion!:string;
    projectVersion!:string;
    description!:string;
    dependencies!:Dependency[];
}