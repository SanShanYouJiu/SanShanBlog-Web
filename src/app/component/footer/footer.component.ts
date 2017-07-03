import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  /**
   * 返回顶部的速度因子
   */
  private speed: number = 1000;

  constructor() { }

  ngOnInit() {
  }

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
    let speed = this.speed  ? Math.round(this.speed / 100) : 6 ;
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

  /**
   * 获取当前的纵坐标
   * @returns {number}
   */
  private currentYPosition():number {
    if (self.pageYOffset)
      return self.pageYOffset;
    if (document.documentElement && document.documentElement.scrollTop)
      return document.documentElement.scrollTop;
    if (document.body.scrollTop)
      return document.body.scrollTop;
    return 0;
  };

}
