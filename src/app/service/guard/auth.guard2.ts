import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import {AlertService} from "../alert.service";

@Injectable()
export class AuthGuard2 implements CanActivate {

  constructor(private router: Router,
              private alertService: AlertService) {
  }

  canActivate() {
    if (localStorage.getItem('currentUser')) {
      // logged in so return true
      return false;
    }
    return true;
  }
}
