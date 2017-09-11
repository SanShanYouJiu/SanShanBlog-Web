import { Injectable } from '@angular/core';
import {Http, Headers, RequestOptions, Response, URLSearchParams} from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/toPromise';
import {Config} from  '../config/ApiConfig';
import { LogService } from "app/service/Log.service";


@Injectable()
export class CodeValidateService {

    constructor(private http:Http){
    }

  getCodeValidate():Promise<any>{ 
     return this.http.get(Config.codeValidate)
     .toPromise()
     .then(response=>response.json())
     .catch(LogService.handleError); 
  } 

}
