export class ApplicationSetting{
    id!:number;
    typeOfDatabase!:string;
    applicationPort!:string
    applicationDataSourceUrl!:string
    userNameDataSource!:string
    passwordDataSource!:string
  
    setId(id:number){
      this.id=id;
    }
    getId(){
        return this.id;
        }
    setTypeOfDatabase(typeOfDatabase:string){
        this.typeOfDatabase=typeOfDatabase;
    }
    getTypeOfDatabase(){
        return this.typeOfDatabase;
    }
    setApplicationPort(applicationPort:string){
        this.applicationPort=applicationPort;
    }
    getApplicationPort(){
        return this.applicationPort;
    }
    setApplicationDataSourceUrl(applicationDataSourceUrl:string){
        this.applicationDataSourceUrl=applicationDataSourceUrl;
    }
    getApplicationDataSourceUrl(){
        return this.applicationDataSourceUrl;
    }
    setUserNameDataSource(userNameDataSource:string){
        this.userNameDataSource=userNameDataSource;
    }
    getUserNameDataSource(){
        return this.userNameDataSource;
    }
    setPasswordDataSource(passwordDataSource:string){
        this.passwordDataSource=passwordDataSource;
    }
    getPasswordDataSource(){
        return this.passwordDataSource;
    }
    constructor(id:number,typeOfDatabase:string,applicationPort:string,applicationDataSourceUrl:string,userNameDataSource:string,passwordDataSource:string){
        this.id=id;
        this.typeOfDatabase=typeOfDatabase;
        this.applicationPort=applicationPort;
        this.applicationDataSourceUrl=applicationDataSourceUrl;
        this.userNameDataSource=userNameDataSource;
        this.passwordDataSource=passwordDataSource;
    }
}