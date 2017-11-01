import { Injectable } from '@angular/core';
import {Http, Headers, RequestOptions, Response, URLSearchParams} from '@angular/http';
import {Config} from  '../config/ApiConfig';
import {User} from '../pojo/user';
import { LogService } from 'app/service/Log.service';
@Injectable()
export class UserInfoService {

    constructor( private http: Http, ) { }

   getBasic(username: string): Promise<any>{
     const urlParams = new URLSearchParams();
     urlParams.set('username', username);
    return this.http.post(Config.get_user_info_basic, urlParams)
      .toPromise()
      .then(response => response.json())
      .catch(LogService.handleError);
   }

   getBlogs(username: string): Promise<any>{
       const  urlParams = new URLSearchParams();
       urlParams.set('username', username);
     return  this.http.post(Config.get_user_info_blogs, urlParams)
       .toPromise()
       .then(response => response.json())
       .catch(LogService.handleError);
   }


}
