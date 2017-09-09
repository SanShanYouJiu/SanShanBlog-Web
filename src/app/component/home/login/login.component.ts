import { Component, OnInit } from '@angular/core';

import {Router, ActivatedRoute} from "@angular/router";
import {AuthenticationService} from "../../../service/authentication.service";
import {AlertService} from "../../../service/alert.service";
import {Config} from "../../../config/ApiConfig";
@Component({
    selector: 'login',
    templateUrl: 'login.component.html'
})
export class LoginComponent implements OnInit {
  private model: any = {};
  loading = false;
  error = '';
  returnUrl: string;
  codeUrl:string;

    constructor(
      private route: ActivatedRoute,
      private router:Router,
      private authenticationService:AuthenticationService,
      private alertService: AlertService) {
      this.codeUrl=Config.codeValidate;
    }

    ngOnInit() {
      // get return url from route parameters or default to '/'
      this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }


  login() {
    this.loading = true;

    this.authenticationService.login(this.model)
      .subscribe(
        data => {
          this.router.navigate([this.returnUrl]);
        },
        error => {
          this.alertService.error("无法登陆 可能是用户名与密码错误");
          this.loading = false;
        });
  }


}
