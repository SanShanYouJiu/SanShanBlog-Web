import { Component, OnInit, Input } from '@angular/core';
import { AuthenticationService } from '../../../../service/authentication.service';
import { Blog } from '../../../../pojo/blog';
import { AdminIndexService } from '../../../../service/admin.index.service';
import { User } from '../../../../pojo/user';
import { Params, ActivatedRoute } from '@angular/router';
import { UserInfo } from '../../../../pojo/user-info';
import { AlertService, BlogService } from 'app/service';
import { LogService } from 'app/service/Log.service';
import { MarkDownBlog } from 'app/pojo/markdown-blog';
import { UEditorBlog } from 'app/pojo/ueditor-blog';

@Component({
  selector: 'update-blog',
  templateUrl: 'update-blog.component.html',
})
export class UpdateBlogComponent implements OnInit {
  blog: Blog;
  private id:number;
  markdownblog: MarkDownBlog;

  uEditorBlog: UEditorBlog;

  loading = false;

  private model: any = {};

  constructor(
    private route: ActivatedRoute,
    private blogService: BlogService,
    private adminIndexService:AdminIndexService,
    private alterService: AlertService,
  ) {
  }

  ngOnInit(): void {
    this.route.params
      .switchMap((params: Params) => {
        this.id = params['id'];
        return this.blogService.getBlog_by_id(this.id)
      })
      .subscribe(response => {
        this.blog = response.data;
        if (this.blog.type === 1) {
          const  HyperDown = require('hyperdown');
          this.markdownblog = new MarkDownBlog();
          const  parser = new HyperDown, html = parser.makeHtml(this.blog.content);
          this.markdownblog.content = html;
        }
        else {
          this.uEditorBlog = new UEditorBlog();
          this.uEditorBlog.content = this.blog.content;
        }
      });
  }

  updateBlog() {
    this.loading = true;
    this.adminIndexService.updateBlogById(this.id, this.model.title, this.model.tag, this.model.content)
    .then(response => {
      if (response.status === 0) {
        this.alterService.success('操作成功');
      }else{
        this.alterService.error('操作失败');
        this.loading = false;
      }
    } );
  }

}
