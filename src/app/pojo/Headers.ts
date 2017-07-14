//为了使用ng2-file-upload加入其它信息使用
export class Headers{
  name: string;
  value: string;

  constructor(name:string,value:string){
    this.name=name;
    this.value=value;
  }
}
