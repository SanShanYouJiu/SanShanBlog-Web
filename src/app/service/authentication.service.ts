import { Injectable } from '@angular/core';
import {Headers, Http, RequestOptions, Response, URLSearchParams, RequestOptionsArgs} from "@angular/http";
import 'rxjs/add/operator/map'
import { Observable } from 'rxjs/Observable';
import {Config} from  '../config/ApiConfig';
import {LogService} from "./Log.service";
import { ResponseVo } from 'app/pojo/responsevo';
import { User } from 'app/pojo/user';

interface loginStausResponse {
  responseMsg: ResponseVo<any>;
}

@Injectable()
export class AuthenticationService {
  constructor(private http: Http) { }

  login(user: User, codeid: number) {
    const urlParams = new URLSearchParams();
    urlParams.set('username', user.username);
    urlParams.set('password', user.password);
    urlParams.set('code', user.codevalidate);
    urlParams.set('codeid', codeid.toString());
    // urlParams.set("codevalidate",codevalidate);
    return this.http.post(Config.login,urlParams)
      .map((response: Response) => {
        // login successful if there's a jwt token in the response
        let user = response.json();
        if (user.data && user.data.token) {
          // sto.datare user .datadetails and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('currentUser', JSON.stringify(user.data));
        }
        return user;
      });
  }

  forget_pwd(email: string, code: string){
    let urlParams = new URLSearchParams();
    urlParams.set('email', email);
    urlParams.set('code', code);
    return this.http.post(Config.forget_password,urlParams)
      .map((response: Response) => {
        let user = response.json();
        if (user.data && user.data.token) {
          localStorage.setItem('currentUser', JSON.stringify(user.data));
        }
    });
  }

  send_mail(type: number, email: string, code: string, codeId: number): Promise<any> {
    const urlParams = new URLSearchParams();
    urlParams.set('type', type.toString());
    urlParams.set('email', email);
    urlParams.set('code', code);
    urlParams.set('codeid', codeId.toString());
    return this.http.post(Config.send_email, urlParams)
    .toPromise()
    .then(response => response.json())
    .catch(LogService.handleError);
  }


  change_pwd(code: string, password: string): Promise<any> {
    const urlParams = new URLSearchParams();
    urlParams.set('code', code);
    urlParams.set('password', password);
    return this.http.post(Config.change_password, urlParams, this.jwt())
    .toPromise()
    .then(response => response.json())
    .catch(LogService.handleError);
  }


  login_status():  Observable<Response> {
    return  this.http.get(Config.login_status, this.jwt());
   }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
  }

  private jwt() {
    // create authorization header with jwt token
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser && currentUser.token) {
      const headers = new Headers({ 'Authorization': currentUser.token });
      return new RequestOptions({ headers: headers });
    }
  }
}
