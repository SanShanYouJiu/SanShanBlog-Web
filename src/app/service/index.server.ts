import { Injectable } from '@angular/core';
import {Http, URLSearchParams} from "@angular/http";
import 'rxjs/add/operator/toPromise';
import {Config} from "../config/ApiConfig";
import {LogService} from "./Log.service";

@Injectable()
export class IndexService {

    constructor(private http:Http) { }

    //收到意见
     feedBack(email:string,opinion:string,):Promise<any>{
       let urlparams = new URLSearchParams();
       urlparams.set("email", email);
       urlparams.set("opinion", opinion);
       return this.http.post(Config.index_advice,urlparams).toPromise().then(response => response.json())
         .catch(LogService.handleError);
     }

     //上传文件
    fileupload(file:any):Promise<any>{
      let urlparams = new URLSearchParams();
      urlparams.set("file", file);
      return this.http.post(Config.index_advice_upload,urlparams).toPromise().then(response=>response.json())
        .catch(LogService.handleError);
    }


}
