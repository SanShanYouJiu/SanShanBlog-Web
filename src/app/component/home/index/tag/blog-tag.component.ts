import { Component, OnInit } from '@angular/core';
import { BlogService } from "../../../../service/blog.service";
import { AlertService } from "app/service";
import { Router } from "@angular/router";
import { Blog } from '../../../../pojo/blog';

@Component({
    selector: 'blog-tag',
    templateUrl: 'blog-tag.component.html'
})
export class BlogTagComponent implements OnInit {
    BlogAll: Blog[];
    constructor(
        private route: Router,
        private blogService: BlogService,
        private alertService: AlertService) { }

    ngOnInit() {
        this.blogService.getBlog_tag_all().then(response => {
            if (response.status === 0) {
                this.BlogAll = response.data.completeData;
            } else {
                this.alertService.error(response.msg);
            }
        });
    }


}
