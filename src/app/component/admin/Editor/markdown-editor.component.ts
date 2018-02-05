import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { MarkDownService } from "../../../service/markdown-editor.service";
import { MarkDownBlog } from "../../../pojo/markdown-blog";
import { AlertService } from "../../../service/alert.service";
import { MarkdownEditorComponent } from '../../../../../node_modules/_ngx-markdown-editor@1.1.6@ngx-markdown-editor';

@Component({
  selector: 'markdown-editor',
  templateUrl: 'markdown-editor.component.html',
  providers: [MarkDownService]
})
export class MarkDownEditorComponent implements OnInit {
  constructor(
    private alterService: AlertService,
    private markDownService: MarkDownService) { }


  private content: string;


  @ViewChild('markdown_title')
  title: ElementRef;

  @ViewChild('markdown_tag')
  tag: ElementRef;


  ngOnInit() { }


  insert_blog() {
    const markdown = new MarkDownBlog();
    markdown.content = this.content;
    markdown.title = this.title.nativeElement.value;
    markdown.tag = this.tag.nativeElement.value;
    this.markDownService.insert_blog(markdown)
      .then(response => {
        if (response.status === 0) {
          this.alterService.success('成功');
        } else {
          this.alterService.error('博客写入失败');
        }
      });
  }

  update_blog() {
    const markdown = new MarkDownBlog();
    this.markDownService.update_by_id(markdown)
      .then(response => {
        if (response.status === 0) {
          this.alterService.success('成功');
        } else {
          this.alterService.error(response.msg);
        }
      });
  }
}
