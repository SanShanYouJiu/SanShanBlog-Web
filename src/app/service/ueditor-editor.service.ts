import {Injectable} from "@angular/core";
import {Headers, Http, RequestOptions,Response, URLSearchParams} from "@angular/http";
import {UEditorComponent} from "ngx-ueditor";
import 'rxjs/add/operator/map'
import { Observable } from 'rxjs';
import 'rxjs/add/operator/toPromise';
import {Config} from "../config/ApiConfig";
import {UEditorBlog} from "../pojo/ueditor-blog";
import {LogService} from "./Log.service";
@Injectable()
export class UEditorService{

   constructor(private http:Http){

   }


  insert_blog(uEditorBlog:UEditorBlog):Promise<any>{
    let urlParams = new URLSearchParams();
    urlParams.set("content",uEditorBlog.content);

    if(uEditorBlog.tag!=null)
     urlParams.set("tag",uEditorBlog.tag);

    urlParams.set("title", uEditorBlog.title);
    return this.http.post(Config.insert_ueditor_blog,urlParams,this.jwt()).
      toPromise()
      .then(response=>response.json())
      .catch(LogService.handleError);
  }

  query_all():Promise<any>{
    let urlParams = new URLSearchParams();
    return this.http.post(Config.ueditor_query_all,urlParams, this.jwt())
      .toPromise()
      .then(response => response.json())
      .catch(LogService.handleError);
  }

//TODO 还没实现完
  update_by_id(uEditorBlog:UEditorBlog):Promise<any>{
    let urlParams = new URLSearchParams();
    urlParams.set("id", uEditorBlog.id.toString());
    if(uEditorBlog.content!=null)
      urlParams.set("content", uEditorBlog.content);
    if(uEditorBlog.tag!=null)
      urlParams.set("tag", uEditorBlog.tag);
    if(uEditorBlog.title!=null)
      urlParams.set("title", uEditorBlog.title);
    return this.http.post(Config.update_ueditor_blog, urlParams, this.jwt()).
      toPromise()
      .then(response=>response.json())
      .catch(LogService.handleError);
  }



  private jwt() {
    // create authorization header with jwt token
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser && currentUser.token) {
      let headers = new Headers({ 'Authorization': 'Bearer ' + currentUser.token });
      return new RequestOptions({ headers: headers });
    }
  }
}
