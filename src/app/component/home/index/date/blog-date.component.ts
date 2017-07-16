import { Component, OnInit } from '@angular/core';
import {BlogService} from "../../../../service/blog.service";

@Component({
    selector: 'blog-date',
    templateUrl: 'blog-date.component.html'
})
export class BlogDateComponent implements OnInit {
    constructor(private blogService:BlogService) { }

    ngOnInit() {

    }


    // getBlog_data_all

}
