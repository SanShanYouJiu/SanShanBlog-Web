import {Component, OnInit, ElementRef, ViewChild} from '@angular/core';
import {MarkDownBlog} from "../../../pojo/markdown-blog";
import {UEditorBlog} from "../../../pojo/ueditor-blog";
import {Blog} from "../../../pojo/blog";
import 'rxjs/add/operator/switchMap';
import {Params, ActivatedRoute} from "@angular/router";
import {Location}               from '@angular/common';
import {BlogService} from "../../../service/blog.service";

@Component({
  selector: 'blog-detail',
  templateUrl: 'blog.detail.component.html'
})

export class BlogDetailComponent implements OnInit  {

  blog: Blog;

  markdownblog: MarkDownBlog;

  uEditorBlog: UEditorBlog;


  constructor(private route: ActivatedRoute,
              private blogService: BlogService,
              private location: Location,
              private elementRef: ElementRef
  ) {
  }


  ngOnInit() {
    this.route.params
      .switchMap((params: Params) => this.blogService.getBlog_by_id(+params['id']))
      .subscribe(response => {
        this.blog = response.data;
        if (this.blog.type === 1) {
          let HyperDown = require('hyperdown');
          this.markdownblog = new MarkDownBlog();
          let parser = new HyperDown, html = parser.makeHtml(this.blog.content);
          this.markdownblog.content=html;
        }
        else {
          this.uEditorBlog = new UEditorBlog();
          this.uEditorBlog.content = this.blog.content;
        }
      });
  } 


  goBack(): void {
    this.location.back();
  }

}
