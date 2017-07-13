import { Injectable } from '@angular/core';
import {Http, URLSearchParams,Response} from "@angular/http";
import 'rxjs/add/operator/toPromise';
import {Config} from "../config/ApiConfig";
import {LogService} from "./Log.service";

@Injectable()
export class IndexService {

  constructor(private http:Http) { }

  //收到意见
  feedBack(email:string,opinion:string){
    let urlparams = new URLSearchParams();
    urlparams.set("email", email);
    urlparams.set("opinion", opinion);
    return this.http.post(Config.index_advice,urlparams).map((response: Response) => response.json());
  }

  //上传文件
  //todo  上传文件修复
  feedbackIncludeFile(email:string,opinion:string,file:any){
    let urlparams = new URLSearchParams();
    urlparams.set("email", email);
    urlparams.set("opinion", opinion);
    urlparams.set("file", file);
    return this.http.post(Config.index_advice_upload,urlparams).map((response:Response)=>response.json());
  }


}
