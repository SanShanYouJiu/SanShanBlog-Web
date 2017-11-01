import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions, Response, URLSearchParams } from '@angular/http';
import { Blog } from '../pojo/blog';
import { Config } from '../config/ApiConfig';
import 'rxjs/add/operator/toPromise';
import { LogService } from './Log.service';

@Injectable()
export class BlogService {
  constructor(private http: Http) { }


  getBlog_All(): Promise<any> {
    return this.http.get(Config.query_blog_all)
      .toPromise()
      .then(response => response.json())
      .catch(LogService.handleError);
  }

  getBlog_by_page(pageRows: number, pageNum: number): Promise<any> {
    const urlParams = new URLSearchParams();
    urlParams.set('pageRows', pageRows.toString());
    urlParams.set('pageNum', pageNum.toString());
    return this.http.post(Config.query_blog_by_page, urlParams)
      .toPromise()
      .then(response => response.json())
      .catch(LogService.handleError);
  }

  getBlog_by_id(id: number): Promise<any> {
    const urlParams = new URLSearchParams();
    urlParams.set('id', id.toString());
    // get是有问题的
    return this.http.post(Config.query_blog_by_id, urlParams)
      .toPromise()
      .then(response => response.json())
      .catch(LogService.handleError);
  }


  delete_by_id(id: number): Promise<any> {
    const urlParams = new URLSearchParams();
    urlParams.set('id', id.toString());
    return this.http.post(Config.delete_blog_by_id, urlParams, this.jwt())
      .toPromise()
      .then(response => response.json())
      .catch(LogService.handleError);
  }


  getBlog_tag_all(): Promise<any> {
    return this.http.get(Config.query_tag_all)
      .toPromise()
      .then(response => response.json())
      .catch(LogService.handleError);
  }

  getBlog_by_tag(tag: string): Promise<any> {
    const urlParams = new URLSearchParams();
    urlParams.set('tag', tag);
    return this.http.post(Config.query_by_tag, urlParams)
      .toPromise()
      .then(response => response.json())
      .catch(LogService.handleError);
  }

getTag_by_page(pageRows: number, pageNum: number):Promise<any>{
  const urlParams = new URLSearchParams();
  urlParams.set('pageRows', pageRows.toString());
  urlParams.set('pageNum', pageNum.toString());
  return this.http.post(Config.query_tag_by_page, urlParams)
    .toPromise()
    .then(response => response.json())
    .catch(LogService.handleError);
}

  getBlog_title_all(): Promise<any> {
    return this.http.get(Config.query_title_all).toPromise().then(response => response.json())
      .catch(LogService.handleError);
  }

  getBlog_by_title(title: string): Promise<any> {
    const urlParams = new URLSearchParams();
    urlParams.set('title', title);
    return this.http.post(Config.query_by_title, urlParams)
      .toPromise()
      .then(response => response.json())
      .catch(LogService.handleError);
  }

  getTitle_by_page(pageRows: number, pageNum: number):Promise<any>{
    const urlParams = new URLSearchParams();
    urlParams.set('pageRows', pageRows.toString());
    urlParams.set('pageNum', pageNum.toString());
    return this.http.post(Config.query_title_by_page, urlParams)
      .toPromise()
      .then(response => response.json())
      .catch(LogService.handleError);
  }


  getBlog_by_date(date: string): Promise<any> {
    const urlParams = new URLSearchParams();
    urlParams.set('date', date);
    return this.http.post(Config.query_by_date, urlParams)
      .toPromise()
      .then(response => response.json())
      .catch(LogService.handleError);
  }

  getDate_by_page(pageRows: number, pageNum: number): Promise<any> {
    const urlParams = new URLSearchParams();
    urlParams.set('pageRows', pageRows.toString());
    urlParams.set('pageNum', pageNum.toString());
    return this.http.post(Config.query_date_by_page, urlParams)
      .toPromise()
      .then(response => response.json())
      .catch(LogService.handleError);
  }


  getBlog_date_all(): Promise<any> {
    return this.http.get(Config.query_date_all).toPromise().then(response => response.json()).catch(LogService.handleError);
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
