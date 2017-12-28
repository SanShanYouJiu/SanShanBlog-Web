import { Component, OnInit } from '@angular/core';
import { UserService } from "../../../../service/user.service";
import { Router } from "@angular/router";
import { AlertService } from "../../../../service/alert.service";
import { Config } from "../../../../config/ApiConfig";
import { Headers, RequestOptions, Response } from '@angular/http';
import { CodeValidateService } from "../../../../service/code-validate.service";

@Component({
  selector: 'register',
  templateUrl: 'register.component.html'
})
export class RegisterComponent implements OnInit {
  model: any = {};
  loading = false;
  repeatPassword: string;
  private imagePrefix = 'data:image/png;base64,';

  private imageCode: string;

  private codeId: number;

  constructor(private router: Router,
    private userService: UserService,
    private alertService: AlertService,
    private codeValidate: CodeValidateService) {
  }

  ngOnInit() {
    this.getCodeValidate();
  }


  getCodeValidate(): void {
    this.codeValidate.getCodeValidate()
    .then(response => {
      if (response.status === 0) {
        this.imageCode = this.imagePrefix + response.data.imageCode;
        this.codeId = response.data.codeId;
      } else {
        this.alertService.error(response.msg);
      }
    });
  }

  register() {
    this.loading = true;

    if (this.model.password !== this.repeatPassword) {
      this.alertService.error('密码不重复');
      return;
    }

    this.userService.create(this.model,this.codeId)
      .subscribe(
      data => {
        if (data.status === 0) {
          this.alertService.success('注册成功', true);
          this.router.navigate(['/login']);
        } else {
          this.alertService.error(data.msg);
        }
      },
      error => {
        this.alertService.error(error.data);
        this.loading = false;
      });
  }

}


