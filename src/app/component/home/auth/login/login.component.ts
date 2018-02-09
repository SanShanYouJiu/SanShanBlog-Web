import { Component, OnInit } from '@angular/core';

import { Router, ActivatedRoute } from "@angular/router";
import { AuthenticationService } from "../../../../service/authentication.service";
import { AlertService } from "../../../../service/alert.service";
import { Config } from "../../../../config/ApiConfig";
import { CodeValidateService } from "../../../../service/code-validate.service";
@Component({
  selector: 'login',
  templateUrl: 'login.component.html'
})
export class LoginComponent implements OnInit {
  model: any = {};
  loading = false;
  error = '';
  returnUrl: string;

  private codeid: number;


  imageCode: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private alertService: AlertService,
    private codeValidate: CodeValidateService) {
  }

  ngOnInit() {
    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    this.getCodeValidate();
  }

  getCodeValidate(): void {
    this.codeValidate.getCodeValidate()
    .then(response => {
      if (response.status === 0) {
        this.codeid = response.data.codeId;
        this.imageCode = response.data.imageCode;
      } else {
        this.alertService.error(response.msg);
      }
    });
  }


  login() {
    this.loading = true;
    this.authenticationService.login(this.model, this.codeid)
      .subscribe(
      data => {
        if (data.status === 0) {
        this.router.navigate([this.returnUrl]);
        }else {
          this.alertService.error(data.msg);
          this.loading = false;
        }
      },
      error => {
        this.alertService.error('出现传输错误:可能是网络问题');
        this.loading = false;
      });
  }


}
