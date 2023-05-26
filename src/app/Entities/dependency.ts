import { Project } from "./Project";

export class Dependency{
    id!:number;
    groupId!:string;
    artifactId!:string;
    version!:string;
    projects!:Project[];

}