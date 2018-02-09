import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from "../../../service/authentication.service";
import {Router, ActivatedRoute} from "@angular/router";
import { AlertService } from "app/service";
@Component({
    selector: 'forget-password',
    templateUrl: 'forget-password.component.html'
})
export class ForgetPasswordComponent implements OnInit {
   private TodoUrl: string;
    constructor(
         private router: Router,
        private authService: AuthenticationService,
        private alter: AlertService    
     ) { }

      model: any = {};

    ngOnInit() {
        //TODO: 魔法值
        this.TodoUrl="auth/change-pwd";
    }

    onSubmit() {
        this.authService.forget_pwd(this.model.email,this.model.code)
        .subscribe(
            data=>{
                 this.router.navigateByUrl(this.TodoUrl+"/"+this.model.code);
            },
            error=>{
                console.log("忘记密码功能:传输中出现错误");
                this.alter.error("传输中出现错误");
            }
        )
    }

}
