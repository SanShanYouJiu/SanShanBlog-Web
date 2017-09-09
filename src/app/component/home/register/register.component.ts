import { Component, OnInit } from '@angular/core';
import {UserService} from "../../../service/user.service";
import {Router} from "@angular/router";
import {AlertService} from "../../../service/alert.service";
import {Config} from "../../../config/ApiConfig";

@Component({
    selector: 'register',
    templateUrl: 'register.component.html'
})
export class RegisterComponent implements OnInit {
  model: any = {};
  loading = false;
  repeatPassword:string;
  codeUrl:string;

    constructor(  private router: Router,
                  private userService: UserService,
                  private alertService: AlertService) {
      this.codeUrl=Config.codeValidate;
    }

  ngOnInit() {
  }

  register() {
    this.loading = true;

    if(this.model.password!=this.repeatPassword) {
      this.alertService.error('密码不重复');
      return;
    }

    this.userService.create(this.model)
      .subscribe(
        data => {
          if(data.status==0) {
            this.alertService.success('注册成功', true);
            this.router.navigate(['/login']);
          }else {
              this.alertService.error(data.msg);
          }
          },
        error => {
          this.alertService.error(error.data);
          this.loading = false;
        });
  }

  }


