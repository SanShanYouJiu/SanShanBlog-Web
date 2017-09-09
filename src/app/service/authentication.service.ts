import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions, Response, URLSearchParams } from "@angular/http";
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

  forget_pwd(email:string,code:string){
    let urlParams = new URLSearchParams();
    urlParams.set('email',email);
    urlParams.set('code',code);
    return this.http.post(Config.forget_password,urlParams)
      .map((response:Response)=>{
        let user=response.json();
        if (user&&user.token) {
          localStorage.setItem('currentUser', JSON.stringify(user));
        }
    });
  }

  send_mail(type:number,email:string):Promise<any>{
    let urlParams =new URLSearchParams();
    urlParams.set('type',type.toString());
    urlParams.set('email',email);
    return this.http.post(Config.send_email,urlParams)
    .toPromise()
    .then(response => response.json())
    .catch(LogService.handleError);
  }

  
  change_pwd(code:string,password:string):Promise<any>{
    let urlParams = new URLSearchParams();
    urlParams.set('code',code);
    urlParams.set('password',password);
    return this.http.post(Config.change_password,urlParams,this.jwt())
    .toPromise()
    .then(response=>response.json())
    .catch(LogService.handleError);
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
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
