import {Injectable} from "@angular/core";
import {Headers, Http, RequestOptions, Response, URLSearchParams} from "@angular/http";
import {UEditorComponent} from "ngx-ueditor";
import 'rxjs/add/operator/map'
import { Observable } from 'rxjs';
import 'rxjs/add/operator/toPromise';
import {Config} from "../config/ApiConfig";
import {UEditorBlog} from "../pojo/ueditor-blog";
import {LogService} from "./Log.service";
@Injectable()
export class UEditorService{

   constructor(private http: Http){

   }


  insert_blog(uEditorBlog: UEditorBlog): Promise<any> {
    const urlParams = new URLSearchParams();
    if (uEditorBlog.content != null) {
    urlParams.set('content', uEditorBlog.content);
    }

    if (uEditorBlog.tag != null) {
     urlParams.set('tag', uEditorBlog.tag);
    }

    if (uEditorBlog.title != null) {
    urlParams.set('title', uEditorBlog.title);
    }
    return this.http.post(Config.insert_ueditor_blog, urlParams, this.jwt()).
      toPromise()
      .then(response => response.json())
      .catch(LogService.handleError);
  }

  query_all(): Promise<any>{
    return this.http.get(Config.ueditor_query_all, this.jwt())
      .toPromise()
      .then(response => response.json())
      .catch(LogService.handleError);
  }

  update_by_id(uEditorBlog: UEditorBlog): Promise<any>{
    const urlParams = new URLSearchParams();
    if (uEditorBlog.content != null) {
      urlParams.set('content', uEditorBlog.content);
    }
    if (uEditorBlog.tag != null) {
      urlParams.set('tag', uEditorBlog.tag);
    }
      if (uEditorBlog.title != null) {
      urlParams.set('title', uEditorBlog.title);
      }
    return this.http.post(Config.update_ueditor_blog + uEditorBlog.id, urlParams, this.jwt()).
      toPromise()
      .then(response => response.json())
      .catch(LogService.handleError);
  }



  private jwt() {
    // create authorization header with jwt token
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser && currentUser.token) {
      const headers = new Headers({ 'Authorization': 'Bearer ' + currentUser.token });
      return new RequestOptions({ headers: headers });
    }
  }
}
