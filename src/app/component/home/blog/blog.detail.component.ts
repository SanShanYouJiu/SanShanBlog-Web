import { Component, OnInit, AfterViewInit, ElementRef, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { MarkDownBlog } from '../../../pojo/markdown-blog';
import { UEditorBlog } from '../../../pojo/ueditor-blog';
import { Blog } from '../../../pojo/blog';
import 'rxjs/add/operator/switchMap';
import { Params, ActivatedRoute } from '@angular/router';
// tslint:disable-next-line:import-spacing
import { Location } from '@angular/common';
import { BlogService } from '../../../service/blog.service';
import { VoteService } from 'app/service';
import { BlogVoteInfo } from 'app/pojo/blog-vote-info';

@Component({
  selector: 'blog-detail',
  templateUrl: 'blog.detail.component.html',
  styleUrls: ['blog.detail.component.css']
})

export class BlogDetailComponent implements OnInit, AfterViewInit {


  blog: Blog;

  blogVoteinfo: BlogVoteInfo = new BlogVoteInfo();

  @ViewChild('blogContent')
  blogContentDiv: ElementRef;


  markdownblog: MarkDownBlog = new MarkDownBlog();

  uEditorBlog: UEditorBlog = new UEditorBlog();


  constructor(private route: ActivatedRoute,
    private blogService: BlogService,
    private location: Location,
    private voteService: VoteService,
    private elementRef: ElementRef
  ) {
  }


  ngOnInit() {
    this.route.params
      .switchMap((params: Params) => this.blogService.getBlog_by_id(+params['id']))
      .subscribe(response => {
        this.blog = response.data;
        if (this.blog.type === 1) {
          const HyperDown = require('hyperdown');
          this.markdownblog = new MarkDownBlog();
          const parser = new HyperDown, html = parser.makeHtml(this.blog.content);
          this.markdownblog.content = html;
        }
        // tslint:disable-next-line:one-line
        else {
          this.uEditorBlog = new UEditorBlog();
          this.uEditorBlog.content = this.blog.content;
        }
        this.get_blog_info(this.blog.id);
      });
  }

  ngAfterViewInit(): void {
  }

  onResize(event) {
    // tslint:disable-next-line:no-unused-expression
    const contentWidth = event.target.innerWidth;
    const contentHeight = event.target.innerHeight;
    this.img_width_change(contentWidth, contentHeight);
  }

  img_width_change(contentWidth: number, contentHeight: number) {
    if (contentHeight / contentWidth > 1.2) {
      const imgs = this.blogContentDiv.nativeElement.getElementsByTagName('img');
      for (let i = 0; i < imgs.length; i++) {
        imgs[i].style.width = '100%';
      }
    } else {
      const imgs = this.blogContentDiv.nativeElement.getElementsByTagName('img');
      for (let i = 0; i < imgs.length; i++) {
        imgs[i].style.width = '';
      }
    }
  }


  goBack(): void {
    this.location.back();
  }

  vote_favour(): void {
    this.voteService.favour_blog(this.blog.id).then(response => {
      if (response.status === 0) {
        this.get_blog_info(this.blog.id);
      } else {
        console.log(response.msg);
      }
    });

  }

  vote_tread(): void {
    this.voteService.tread_blog(this.blog.id).then(response => {
      if (response.status === 0) {
        this.get_blog_info(this.blog.id);
      } else {
        console.log(response.msg);
      }
    });

  }

  get_blog_info(blogId: number): void {
    this.voteService.get_blog_info(blogId).then(response => {
      if (response.status === 0) {
        this.blogVoteinfo = response.data;
      } else {

      }
    }
    );
  }

}
