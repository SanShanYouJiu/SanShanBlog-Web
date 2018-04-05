import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions, Response, URLSearchParams } from '@angular/http';
import { Blog } from '../pojo/blog';
import { Config } from '../config/ApiConfig';
import 'rxjs/add/operator/toPromise';
import { LogService } from './Log.service';

@Injectable()
export class BlogService {
  constructor(private http: Http) { }


  getBlog_by_page(pageRows: number, pageNum: number): Promise<any> {
    return this.http.get(Config.query_blog_by_page+"pageRows:"+pageRows+"/pageNum:"+pageNum)
      .toPromise()
      .then(response => response.json())
      .catch(LogService.handleError);
  }

  getBlog_by_id(id: number): Promise<any> {
    return this.http.get(Config.query_blog_by_id+id)
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
    return this.http.get(Config.query_by_tag+tag)
      .toPromise()
      .then(response => response.json())
      .catch(LogService.handleError);
  }

getTag_by_page(pageRows: number, pageNum: number):Promise<any>{
  return this.http.get(Config.query_tag_by_page+"pageRows:"+pageRows+"/pageNum:"+pageNum)
    .toPromise()
    .then(response => response.json())
    .catch(LogService.handleError);
}

  getBlog_by_title(title: string): Promise<any> {
    return this.http.get(Config.query_by_title+title)
      .toPromise()
      .then(response => response.json())
      .catch(LogService.handleError);
  }

  getTitle_by_page(pageRows: number, pageNum: number):Promise<any>{
    return this.http.get(Config.query_title_by_page+"pageRows:"+pageRows+"/pageNum:"+pageNum)
      .toPromise()
      .then(response => response.json())
      .catch(LogService.handleError);
  }


  getBlog_by_date(date: string): Promise<any> {
    return this.http.get(Config.query_by_date+date)
      .toPromise()
      .then(response => response.json())
      .catch(LogService.handleError);
  }

  getDate_by_page(pageRows: number, pageNum: number): Promise<any> {
    return this.http.get(Config.query_date_by_page+"pageRows:"+pageRows+"/pageNum:"+pageNum)
      .toPromise()
      .then(response => response.json())
      .catch(LogService.handleError);
  }

}
