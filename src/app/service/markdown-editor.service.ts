import {Injectable} from "@angular/core";
import {Headers, Http, RequestOptions,Response, URLSearchParams} from "@angular/http";
import {Config} from "../config/ApiConfig";
import {LogService} from "./Log.service";
import 'rxjs/add/operator/map'
import { Observable } from 'rxjs';
import 'rxjs/add/operator/toPromise';
import {MarkDownBlog} from "../pojo/markdown-blog";
import {parseHttpResponse} from "selenium-webdriver/http";
@Injectable()
export class MarkDownService{

  constructor(
    private http: Http, ) {
  }


  insert_blog(markdownblog: MarkDownBlog): Promise<any>{
    const urlParams = new URLSearchParams();
    if (markdownblog.content != null) {
    urlParams.set('content', markdownblog.content);
    }
    urlParams.set('tag', markdownblog.tag);
    if (markdownblog.title != null) {
    urlParams.set('title', markdownblog.title);
    }
    return this.http.post(Config.insert_markdown_blog,urlParams,this.jwt())
      .toPromise()
      .then(response => response.json())
      .catch(LogService.handleError);
  }

  query_all():Promise<any>{
    return this.http.get(Config.markdown_query_all,this.jwt()).
    toPromise().then(response => response.json())
      .catch(LogService.handleError);
  }


//TODO 还没实现完
  update_by_id(markdownblog: MarkDownBlog): Promise<any>{
    const urlParams = new URLSearchParams();
    if(markdownblog.content != null) {
      urlParams.set('content', markdownblog.content);
    }
    if (markdownblog.tag != null) {
      urlParams.set('tag', markdownblog.tag);
    }
    if (markdownblog.title != null) {
      urlParams.set('title', markdownblog.title);
    }
    return this.http.post(Config.update_markdown_blog + markdownblog.id, urlParams, this.jwt()).
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
