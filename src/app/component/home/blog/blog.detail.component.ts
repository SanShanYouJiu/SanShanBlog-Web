import { Component, OnInit, OnDestroy, AfterContentInit, ElementRef, ViewChild } from '@angular/core';
// tslint:disable-next-line:import-spacing
import { ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
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

export class BlogDetailComponent implements OnInit, OnDestroy, AfterContentInit {


  url = document.location.href;

  private timer;

  blog: Blog = new Blog();

  blogVoteinfo: BlogVoteInfo = new BlogVoteInfo();

  @ViewChild('blogContent')
  blogContentDiv: ElementRef;


  markdownblog: MarkDownBlog = new MarkDownBlog();

  uEditorBlog: UEditorBlog = new UEditorBlog();


  constructor(private route: ActivatedRoute,
    private blogService: BlogService,
    private location: Location,
    private voteService: VoteService,
    private elementRef: ElementRef,
    private ref: ChangeDetectorRef
  ) {
  }


  ngOnInit() {
    this.route.params
      .switchMap((params: Params) => this.blogService.getBlog_by_id(+params['id']))
      .subscribe(response => {
        this.blog = response.data;
        if (this.blog.type === 1) {
          // const HyperDown = require('hyperdown');
          const marked = require('marked');
          const md = marked.setOptions({
            renderer: new marked.Renderer(),
            gfm: true,
            tables: true,
            breaks: false,
            pedantic: false,
            sanitize: false,
            smartLists: true,
            smartypants: false
          });
          this.markdownblog = new MarkDownBlog();
          const html = marked(this.blog.content);
          this.markdownblog.content = html;
        } else {
          this.uEditorBlog = new UEditorBlog();
          this.uEditorBlog.content = this.blog.content;
        }
        this.get_blog_info(this.blog.id);
      });
  }

  ngOnDestroy(): void {
    if (this.timer) {
      clearInterval(this.timer);
    }
  }

  ngAfterContentInit(): void {
    let i = 0;
    this.timer = setInterval(() => {// 设置定时刷新事件，每隔100ms刷新
      this.img_width_change(window.innerWidth, window.innerHeight);
      const imgs = this.blogContentDiv.nativeElement.getElementsByTagName('img');
      i++;
      // 超过6S 未响应 默认超时
      if (i >= 30) {
        clearInterval(this.timer);
      }
    }, 200);
  }


  onResize(event) {
    // tslint:disable-next-line:no-unused-expression
    const contentWidth = event.target.innerWidth;
    const contentHeight = event.target.innerHeight;
    this.img_width_change(contentWidth, contentHeight);
  }

  img_width_change(contentWidth: number, contentHeight: number) {
    const imgs = this.blogContentDiv.nativeElement.getElementsByTagName('img');
    if (contentHeight / contentWidth > 1.2) {
      for (let i = 0; i < imgs.length; i++) {
        imgs[i].style.width = '100%';
      }
    } else {
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
