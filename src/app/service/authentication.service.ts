import { Injectable } from '@angular/core';
import {Http, Response, URLSearchParams} from '@angular/http';
import 'rxjs/add/operator/map'
import {Config} from  '../config/ApiConfig';
import {LogService} from "./Log.service";
import {User} from "../pojo/user";

@Injectable()
export class AuthenticationService {
  constructor(private http: Http) { }

  login(user:User) {
    let urlParams = new URLSearchParams();
    urlParams.set('username',user.username);
    urlParams.set('password',user.password);
    // urlParams.set("codevalidate",codevalidate);
    return this.http.post(Config.login,urlParams)
      .map((response: Response) => {
        // login successful if there's a jwt token in the response
        let user = response.json();
        if (user && user.token) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('currentUser', JSON.stringify(user));
        }
      });
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
  }
}
