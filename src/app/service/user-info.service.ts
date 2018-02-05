import { Injectable } from '@angular/core';
import {Http, Headers, RequestOptions, Response, URLSearchParams} from '@angular/http';
import {Config} from  '../config/ApiConfig';
import {User} from '../pojo/user';
import { LogService } from 'app/service/Log.service';
@Injectable()
export class UserInfoService {

    constructor( private http: Http, ) { }

   getBasic(username: string): Promise<any> {
    return this.http.get(Config.get_user_info + username + Config.user_info_basic)
      .toPromise()
      .then(response => response.json())
      .catch(LogService.handleError);
   }

   getBlogs(username: string): Promise<any> {
     return  this.http.get(Config.get_user_info + username + Config.user_info_blogs)
       .toPromise()
       .then(response => response.json())
       .catch(LogService.handleError);
   }


}
