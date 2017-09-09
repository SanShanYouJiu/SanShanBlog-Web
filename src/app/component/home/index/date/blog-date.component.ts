import { Component, OnInit } from '@angular/core';
import { BlogService } from "../../../../service/blog.service";
import { AlertService } from "app/service";
import { Router } from "@angular/router";
@Component({
  selector: 'blog-date',
  templateUrl: 'blog-date.component.html'
})
export class BlogDateComponent implements OnInit {
  DateAll: string[];
  constructor(
    private route: Router,
    private blogService: BlogService,
    private alertService: AlertService) { }

  ngOnInit() {
    this.blogService.getBlog_date_all().then(response => {
      if (response.status==0) {
        this.DateAll = response.data;
      } else {
        this.alertService.error(response.msg);
      }
    });
  }

}
