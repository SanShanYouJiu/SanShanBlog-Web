import { Component, OnInit } from '@angular/core';
import { BlogService } from "../../../../service/blog.service";
import { AlertService } from "app/service";
import { Router } from "@angular/router";

@Component({
    selector: 'blog-title',
    templateUrl: 'blog-title.component.html'
})
export class BlogTitleComponent implements OnInit {
    TitleAll: any[];
    constructor(
        private route: Router,
        private blogService: BlogService,
        private alertService: AlertService) { }

    ngOnInit() {
        this.blogService.getBlog_title_all().then(response => {
            if (response.status==0) {
                this.TitleAll = response.data;
            } else {
                this.alertService.error(response.msg);
            }
        });
    }

}
