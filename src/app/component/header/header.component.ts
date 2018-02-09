import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthGuard} from '../../service/guard/auth.guard';
import {AuthenticationService} from '../../service/authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: 'header.component.html',
  styleUrls:['header.component.css']
})
export class HeaderComponent implements OnInit {
  isBackColor: boolean = false;

  Title = '欢迎来到三山博客';
  LittleTitle = '今日无事';
  MoreFunction = '更多功能等待扩展..';

  constructor(private router: Router,
             private  authenticationService:AuthenticationService) {
  }

  ngOnInit() {
  }

  logout(){
     this.authenticationService.logout();
  }

  //判断是否显示头部和尾部
  isLogin(): boolean{
    if (localStorage.getItem('currentUser')) {
      // logged in so return true
      return true;
    }else
         return false;
  }


}
