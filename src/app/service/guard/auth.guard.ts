import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthenticationService, AlertService } from 'app/service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private router: Router,
     private alterService: AlertService,
    private authservice: AuthenticationService
  ) {
  }

  // tslint:disable-next-line:member-ordering
  private canLogin: boolean;

  canActivate() {
    if (localStorage.getItem('currentUser')) {
      //TODO 在用户第一次加载时需要检查
        return true;
    }

    console.log('dont have user auth ,need to login');
    // not logged in so redirect to login page
    this.router.navigate(['/login']);
    return false;
  }
}
