import { Injectable } from '@angular/core';
import {LogService} from "./Log.service";
import {Config} from "../config/ApiConfig";
import {Headers, Http, RequestOptions,Response, URLSearchParams} from "@angular/http";

@Injectable()
export class AdminIndexService {

  constructor(private http:Http) { }


  getBlog_All(): Promise<any> {
    return this.http.get(Config.admin_query_blog_all,this.jwt())
      .toPromise()
      .then(response => response.json())
      .catch(LogService.handleError);
  }

   getMarkdown_All():Promise<any>{
      return this.http.get(Config.admin_query_markdown_all,this.jwt())
        .toPromise()
        .then(response=>response.json())
        .catch(LogService.handleError);
   }

  getUEditor_All():Promise<any>{
    return this.http.get(Config.admin_query_ueditor_all,this.jwt())
      .toPromise()
      .then(response=>response.json())
      .catch(LogService.handleError);
  }

  getUserInfo():Promise<any>{
    return this.http.get(Config.get_user_info,this.jwt())
      .toPromise()
      .then(response=>response.json())
      .catch(LogService.handleError);
  }

    private jwt() {
    // create authorization header with jwt token
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser && currentUser.token) {
      let headers = new Headers({'Authorization': 'Bearer ' + currentUser.token});
      return new RequestOptions({headers: headers});
    }
  }


}
