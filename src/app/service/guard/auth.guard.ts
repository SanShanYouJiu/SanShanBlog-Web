import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService, AlertService } from 'app/service';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { ResponseVo } from '../../pojo/responsevo';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private router: Router,
    private alterService: AlertService,
    private authservice: AuthenticationService
  ) {
  }


  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (localStorage.getItem('currentUser')) {

      return this.authservice.login_status().map(
        data => {
          //TODO: 这里需要获得请求体 并且将登录失效的alter信息显示在页面上
          if (data['status'] !== 200) {
            localStorage.removeItem('currentUser');
            this.router.navigate(['/login']);
            this.alterService.error('登录失效');
            return false;
          } else {
            return true;
          }
        },
      ).catch(
        error => {
          localStorage.removeItem('currentUser');
          this.router.navigate(['/login']);
          this.alterService.error('登录失效');
          console.log('auth is lose efficacy');
          return new Observable<boolean>();
        }
      );
    }

    console.log('dont have user auth ,need to login');
    // not logged in so redirect to login page
    this.router.navigate(['/login']);
    return false;
  }
}
