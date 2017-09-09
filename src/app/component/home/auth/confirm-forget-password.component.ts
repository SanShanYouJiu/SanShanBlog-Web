import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from "../../../service/authentication.service";
import { Config } from "app/config/ApiConfig";
import {Router, ActivatedRoute} from "@angular/router";
import { AlertService } from "app/service";

@Component({
    selector: 'confirm-forget-password',
    templateUrl: 'confirm-forget-password.component.html'
})
export class ConfirmForgetPasswordComponent implements OnInit {
    codeUrl: string;
    private model: any = {}; 

    private ToDoUrl:string;

    constructor(private authService: AuthenticationService,
        private router:Router,
        private alter:AlertService) {
        this.codeUrl = Config.codeValidate;
    }
    ngOnInit() { 
        //TODO: 魔法值 
            this.ToDoUrl="/auth/forget-pwd"
    }

    onSubmit() {
        this.authService.send_mail(2, this.model.email)
        .then(response=>{
            if(response.status==0){
                      this.router.navigateByUrl(this.ToDoUrl);
            }else{
                console.log('验证码错误 或者操作太频繁 5分钟一次');
                if(response.status==20014){
                    this.alter.error("发送EMAIL出现错误")
                }else if(response.status==20016){
                    this.alter.error("请求太过频繁 5分钟一次");
                }else {
                    this.alter.error(response.msg);
                }
            }
        }
        );
    }

}
