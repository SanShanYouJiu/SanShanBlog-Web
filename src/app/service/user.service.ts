import { Injectable } from '@angular/core';
import {Http, Headers, RequestOptions, Response, URLSearchParams} from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map'
import {Config} from  '../config/ApiConfig';
import {AuthenticationService } from './index';
import {User} from "../pojo/user";


@Injectable()
export class UserService {

  constructor(
    private http: Http,) {
  }

  getAll() {
    return this.http.get('/api/users', this.jwt()).map((response: Response) => response.json());
  }

  getById(id: number) {
    return this.http.get('/api/users/' + id, this.jwt()).map((response: Response) => response.json());
  }

  create(user: User,codeId:number) {
    let urlParams = new URLSearchParams();
    urlParams.set('username',user.username);
    urlParams.set('password',user.password);
    urlParams.set('email',user.email);
    urlParams.set("codeid",codeId.toString());
    urlParams.set("code",user.codevalidate);
    return this.http.post(Config.register, urlParams, this.jwt()).map((response: Response) => response.json());
  }

  create_novalidate(user: User) {
    let urlParams = new URLSearchParams();
    urlParams.set('username',user.username);
    urlParams.set('password',user.password);
    urlParams.set('email',user.email);
    return this.http.post(Config.register_novalidate, urlParams, this.jwt()).map((response: Response) => response.json());
  }


  update(user: User) {
    let urlParams = new URLSearchParams();
    urlParams.set('username',user.username);
    urlParams.set('password',user.password);
    urlParams.set("code",user.codevalidate);
    return this.http.put('/api/users/' + user.id, user, this.jwt()).map((response: Response) => response.json());
  }

  delete(id: number) {
    return this.http.delete('/api/users/' + id, this.jwt()).map((response: Response) => response.json());
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
