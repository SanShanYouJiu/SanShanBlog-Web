import { Component, OnInit } from '@angular/core';
import { BlogService } from '../../../../service/blog.service';
import { AlertService } from 'app/service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
@Component({
  selector: 'blog-date',
  templateUrl: 'blog-date.component.html'
})
export class BlogDateComponent implements OnInit {
  p = 1;
  total: number;
  loading: boolean;
  asyncDates: Observable<string[]>;

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
          this.asyncDates = res.data.completeData;
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
