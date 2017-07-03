import {Component, ViewEncapsulation} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
})
export class AppComponent {

  constructor(private router: Router) {
  }

  ngOnInit(): void {

  }
  //判断是否显示头部和尾部
  isShowHeaderAndFooter(): boolean{
    let url = this.router.url;
    if (url.includes('login') || url.includes('register')
      || url.includes('emailcheck') || url.includes('error')){
      return false;
    }
    return true;
  }
}


