import { Injectable } from '@angular/core';
import {Config} from "../config/ApiConfig";
import {Headers, Http, RequestOptions,Response, URLSearchParams} from "@angular/http";
import { LogService } from 'app/service';

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
    return this.http.get(Config.admin_get_user_info,this.jwt())
      .toPromise()
      .then(response=>response.json())
      .catch(LogService.handleError);
  }

  change_user_info(username: string, avater: string, blogLink: string): Promise<any> {
    const urlParams = new URLSearchParams();
    urlParams.set('username', username);
    if (avater != null) {
      urlParams.set('avatar', avater);
    }
    if (blogLink != null) {
      urlParams.set('blogLink', blogLink);
    }

    return this.http.post(Config.admin_change_user_info, urlParams, this.jwt())
    .toPromise()
    .then(response => response.json())
    .catch(LogService.handleError);
    }

  deleteBlogById(id:number):Promise<any>{
    return this.http.delete(Config.delete_blog_by_id+id,this.jwt())
    .toPromise()
    .then(response=>response.json())
    .catch(LogService.handleError);
  }

  updateBlogById(id:number,title:string,tag:string,content:string):Promise<any>{
    let urlParams =new URLSearchParams();
    urlParams.set('id',id.toString());
    if(title!=null)
      urlParams.set('title',title);
    if(tag!=null)
      urlParams.set('tag',tag);
    if(content!=null)
      urlParams.set('content',content);
    return  this.http.post(Config.admin_update_blog_by_id,urlParams,this.jwt()).toPromise()
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
