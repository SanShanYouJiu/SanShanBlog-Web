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
  blog: Blog = new Blog();
  private id:number;
  markdownblog: MarkDownBlog = new MarkDownBlog();

  uEditorBlog: UEditorBlog =  new UEditorBlog();

  loading = false;

   model: any = {};

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
