import { Inject, Component, ViewEncapsulation } from '@angular/core';
import { Router } from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css']
})
export class AppComponent {

  constructor(private router: Router) {
  }

  ngOnInit(): void {

  }
  //判断是否显示头部和尾部
  isShowFooter(): boolean {
    let url = this.router.url;
    if (url.includes('login') || url.includes('register')
      || url.includes('emailcheck') || url.includes('error')) {
      return false;
    }
    return true;
  }

  isNeedTopButton(): boolean {
    let url = this.router.url;
    if (url.includes('login') || url.includes('register')
      || url.includes('emailcheck') || url.includes('error')) {
      return false;
    }
    return true;
  }

  speed: number = 1000;

  /**
  * 根据速度值返回顶部,本质是对window.scrollTo()的不断定时
  */
  public smoothScroll() {
    let startY = this.currentYPosition();
    let stopY = 0;
    let distance = stopY > startY ? stopY - startY : startY - stopY;
    if (distance < 100) {
      window.scrollTo(0, stopY);
      return;
    }
    let speed = this.speed ? Math.round(this.speed / 100) : 6;
    let step = Math.round(distance / 25);
    let leapY = stopY > startY ? startY + step : startY - step;
    let timer = 0;
    if (stopY > startY) {
      for (let i = startY; i < stopY; i += step) {
        window.setTimeout("window.scrollTo(0, " + leapY + ")", timer * speed);
        leapY += step;
        if (leapY > stopY) leapY = stopY;
        timer++;
      }
      return;
    }
    for (let j = startY; j > stopY; j -= step) {
      setTimeout("window.scrollTo(0, " + leapY + ")", timer * speed);
      leapY -= step;
      if (leapY < stopY) leapY = stopY;
      timer++;
    }
  };

  needBackToTopBtn(): boolean {
      const url = this.router.url;
      if (url === '/about' || url.includes('/blog-detail') || url === '/admin/editor/ueditor-editor') {
        return true;
      } else {
        return false;
      }
  }

  /**
   * 获取当前的纵坐标
   * @returns {number}
   */
  private currentYPosition(): number {
    if (self.pageYOffset)
      return self.pageYOffset;
    if (document.documentElement && document.documentElement.scrollTop)
      return document.documentElement.scrollTop;
    if (document.body.scrollTop)
      return document.body.scrollTop;
    return 0;
  };

}


