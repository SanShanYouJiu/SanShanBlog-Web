import { Injectable } from '@angular/core';
import {Router} from "@angular/router";

@Injectable()
export class LogService {

  static isDebug:boolean=true;


    constructor(private router:Router) {

    }

    static debug(msg:any){
      if(this.isDebug){
        console.log(msg);
      }
    }

    static errorMsg(msg:any){
      console.log(msg);
    }

    static error(msg:any,error:any){
      console.log(msg,error);
    }


  static handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }




}
