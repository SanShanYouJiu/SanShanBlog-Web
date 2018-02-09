import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from "../../../service/authentication.service";
import { Config } from "app/config/ApiConfig";
import { Router, ActivatedRoute } from "@angular/router";
import { AlertService } from "app/service";
import { CodeValidateService } from "app/service/code-validate.service";

@Component({
    selector: 'confirm-forget-password',
    templateUrl: 'confirm-forget-password.component.html'
})
export class ConfirmForgetPasswordComponent implements OnInit {
      imageCode: string;
      model: any = {};

    private codeId:number;

    private ToDoUrl: string;

    constructor(private authService: AuthenticationService,
        private router: Router,
        private alter: AlertService,
        private codeValidate: CodeValidateService) {


    }
    ngOnInit() {
        //TODO: 魔法值
        this.ToDoUrl = "/auth/forget-pwd"
        this.getCodeValidate();
    }

  getCodeValidate(): void {
    this.codeValidate.getCodeValidate().then(response => {
        if (response.status === 0) {
            this.imageCode =  response.data.imageCode;
            this.codeId = response.data.codeId;
        } else {
            this.alter.error(response.msg);
        }
    });
  }

    onSubmit() {
        this.authService.send_mail(2, this.model.email,this.model.code,this.codeId)
            .then(response => {
                if (response.status === 0) {
                  this.router.navigateByUrl(this.ToDoUrl);
                  this.alter.success("成功");
                    return;
                } else {
                    console.log('验证码错误 或者操作太频繁 5分钟一次');
                    }if (response.status === 20016) {
                        this.alter.error("请求太过频繁 5分钟一次");
                    } else {
                        this.alter.error(response.msg);
                    }
                }
            );
    }

}
