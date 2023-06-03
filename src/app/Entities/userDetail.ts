import { ApplicationSetting } from './ApplicationSetting';
import { Project } from './Project';
export class User{
    email!:string;
    password!:string;
    userName!:string;
    enabled!:boolean;
    name!:string;
    projects!:Project[];
    role!:string;
}