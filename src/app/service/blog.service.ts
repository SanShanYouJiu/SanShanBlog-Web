import { Injectable } from '@angular/core';
import {Headers, Http, RequestOptions,Response, URLSearchParams} from "@angular/http";
import {Blog} from "../pojo/blog";
import {Config} from "../config/ApiConfig";
import 'rxjs/add/operator/toPromise';
import {LogService} from "./Log.service";

@Injectable()
export class BlogService {
  constructor(private http:Http) { }


  getBlog_All(): Promise<any> {
    return this.http.get(Config.query_blog_all)
      .toPromise()
      .then(response => response.json())
      .catch(LogService.handleError);
  }

  get_blog_by_id(id:number): Promise<any>{
    let urlParams = new URLSearchParams();
    urlParams.set("id",id.toString());
      //get是有问题的
    return this.http.post(Config.query_blog_by_id,urlParams)
      .toPromise()
      .then(response => response.json())
      .catch(LogService.handleError);
  }


  delete_by_id(id:number): Promise<any>{
    let urlParams = new URLSearchParams();
    urlParams.set("id",id.toString());
    return this.http.post(Config.delete_blog_by_id,urlParams)
      .toPromise()
      .then(response =>response.json())
      .catch(LogService.handleError);
  }


  getBlog_Tag_All(): Promise<any> {
    return this.http.get(Config.query_tag_all)
      .toPromise()
      .then(response => response.json())
      .catch(LogService.handleError);
  }

  getBlog_by_tag(tag:string): Promise<any> {
    let urlParams = new URLSearchParams();
    urlParams.set("tag",tag);
    return this.http.get(Config.query_by_tag,urlParams)
      .toPromise()
      .then(response => response.json())
      .catch(LogService.handleError);
  }

  getBlog_Title_All(title:string): Promise<any> {
    let urlParams = new URLSearchParams();
    urlParams.set("title",title);
    return this.http.get(Config.query_title_all,urlParams)
      .toPromise()
      .then(response => response.json())
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
