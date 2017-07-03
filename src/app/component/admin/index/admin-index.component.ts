import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from "../../../service/authentication.service";
import {Blog} from "../../../pojo/blog";
import {BlogService} from "../../../service/blog.service";
import {MarkDownService} from "../../../service/markdown-editor.service";
import {UEditorService} from "../../../service/ueditor-editor.service";
import {MarkDownBlog} from "../../../pojo/markdown-blog";
import {UEditorBlog} from "../../../pojo/ueditor-blog";

@Component({
  selector: 'admin-index',
  templateUrl: 'admin-index.component.html'
})
export class AdminIndexComponent implements OnInit {
    blogs:Blog[];
    markdownblogs:MarkDownBlog[];
    ueditorblogs:UEditorBlog[];

  constructor(private authenticationService: AuthenticationService,
              private  blogService: BlogService,
              private markdownservice:MarkDownService,
              private ueditorservice:UEditorService) {
  }

  ngOnInit(){
    this.blogService.getBlogs()
      .then(response => this.blogs = response.data);
    this.markdownservice.query_all().
         then(response =>this.markdownblogs = response.data);
    this.ueditorservice.query_all()
      .then(response => this.ueditorblogs = response.data);
  }



  logout(){
    this.authenticationService.logout();
  }
}
