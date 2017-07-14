import { Injectable } from '@angular/core';
import {Http, URLSearchParams,Response} from "@angular/http";
import 'rxjs/add/operator/toPromise';
import {Config} from "../config/ApiConfig";
import {LogService} from "./Log.service";

@Injectable()
export class IndexService {

  constructor(private http:Http) { }

  //收到意见
  feedback(email:string,opinion:string){
    let urlparams = new URLSearchParams();
    urlparams.set("email", email);
    urlparams.set("opinion", opinion);
    return this.http.post(Config.index_advice,urlparams).map((response: Response) => response.json());
  }


}
