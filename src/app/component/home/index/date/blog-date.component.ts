import { Component, OnInit } from '@angular/core';
import { AlertService, BlogService } from 'app/service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Blog } from 'app/pojo/blog';
@Component({
  selector: 'blog-date',
  templateUrl: 'blog-date.component.html'
})
export class BlogDateComponent implements OnInit {
  p = 1;
  total: number;
  loading: boolean;
  asyncDatas: Observable<Blog[]>;

  constructor(
    private route: Router,
    private blogService: BlogService,
    private alertService: AlertService) { }

  ngOnInit() {
    this.getPage(1);
  }

  getPage(page: number) {
    this.loading = true;
    this.blogService.getDate_by_page(8, page)
      .then(
      res => {
        if (res.status === 0) {
          this.total = res.data.total;
          this.p = res.data.pageNum;
          this.loading = false;
          console.log(res.data.completeData);
          this.asyncDatas = res.data.completeData;
        } else {
          this.alertService.error(res.msg);
        }
      }
      );
    //   .do(res => {
    //     this.total = res.total;
    //     this.p = page;
    //     this.loading = false;
    //   })
    //   .map(res => res.items);
  }

}
