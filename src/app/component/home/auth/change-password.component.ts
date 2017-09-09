import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from "../../../service/authentication.service";
import {Params, Router, ActivatedRoute } from "@angular/router";
import { AlertService } from "app/service";

@Component({
  selector: 'change-password',
  templateUrl: 'change-password.component.html'
})
export class ChangePasswordComponent implements OnInit {
  constructor(private authService: AuthenticationService,
    private router: Router,
    private route: ActivatedRoute,
    private alter:AlertService ) { }

  private model: any = {};
 
  private code:string;

  private TodoUrl: string;

  ngOnInit() {
    this.route.params.switchMap((params:Params)=>this.code=params['code'])
    .subscribe(response=>{
      //
    });
    //TODO: 魔法值
    this.TodoUrl = "/index";
  }

  onSubmit() {
    this.authService.change_pwd(this.code,this.model.password)
      .then(response => {
        if (response.status == 0) {
          this.router.navigateByUrl(this.TodoUrl);
          //删除掉登录信息的TOKEN 
          localStorage.removeItem('currentUser');
        } else {
          this.alter.error(response.msg);
          console.log("出现了错误：更改密码功能:",response.msg)
        }
      }
      )
  }
}
