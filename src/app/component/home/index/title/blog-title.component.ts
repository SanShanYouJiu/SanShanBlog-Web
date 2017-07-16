import { Component, OnInit } from '@angular/core';
import {BlogService} from "../../../../service/blog.service";

@Component({
    selector: 'blog-title',
    templateUrl: 'blog-title.component.html'
})
export class BlogTitleComponent implements OnInit {
    constructor(private blogService:BlogService) { }

    ngOnInit() { }

}
