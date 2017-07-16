import { Component, OnInit } from '@angular/core';
import {BlogService} from "../../../../service/blog.service";

@Component({
    selector:'blog-tag',
    templateUrl: 'blog-tag.component.html'
})
export class BlogTagComponent implements OnInit {
    constructor(private blogService:BlogService) { }

    ngOnInit() {
    }


}
