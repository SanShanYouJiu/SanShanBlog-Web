import { Component, OnInit } from '@angular/core';
import { BlogService } from "../../../../service/blog.service";
import { AlertService } from "app/service";
import { Router } from "@angular/router";

@Component({
    selector: 'blog-tag',
    templateUrl: 'blog-tag.component.html'
})
export class BlogTagComponent implements OnInit {
    TagAll: string[];
    constructor(
        private route: Router,
        private blogService: BlogService,
        private alertService: AlertService) { }

    ngOnInit() {
        this.blogService.getBlog_tag_all().then(response => {
            if (response.status===0) {
                this.TagAll = response.data;
            } else {
                this.alertService.error(response.msg);
            }
        });
    }


}
