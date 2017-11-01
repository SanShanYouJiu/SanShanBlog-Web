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
  private model: any = {};
  loading = false;
  error = '';
  returnUrl: string;

  private codeid:number;

  private imagePrefix = "data:image/png;base64,";

  private imageCode: string;

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
    this.codeValidate.getCodeValidate()
      .then(response => {
        if (response.status == 0) {
          this.codeid=response.data.codeId;
          this.imageCode = this.imagePrefix + response.data.imageCode;
        } else {
          this.alertService.error(response.msg);
        }
      });
  }


  login() {
    this.loading = true;
    console.log(this.codeid);
    this.authenticationService.login(this.model,this.codeid)
      .subscribe(
      data => {
        if(data.status == 0){
        this.router.navigate([this.returnUrl]);
        }else{
          this.alertService.error("无法登陆:可能是用户名与密码错误");
        }
      },
      error => {
        this.alertService.error("出现传输错误:可能是网络问题");
        this.loading = false;
      });
  }


}
