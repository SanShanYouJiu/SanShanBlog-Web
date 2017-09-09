import {Component, OnInit, ElementRef, ViewChild} from '@angular/core';
import {MarkDownService} from "../../../service/markdown-editor.service";
import {MarkDownBlog} from "../../../pojo/markdown-blog";
import {AlertService} from "../../../service/alert.service";

@Component({
    selector: 'markdown-editor',
    templateUrl: 'markdown-editor.component.html',
  providers:[MarkDownService]

})
export class MarkDownEditorComponent implements OnInit {
    constructor(
      private alterService:AlertService,
      private  markDownService:MarkDownService) { }

    @ViewChild('markdown_blog_content')
    textarea:ElementRef;

    @ViewChild('markdown_title')
    title:ElementRef;

    @ViewChild('markdown_tag')
    tag:ElementRef;


    ngOnInit() { }

    private getContent(){
     alert(this.textarea.nativeElement.value);
    }

  insert_blog(){

    let  markdown =new MarkDownBlog();
    markdown.content=this.textarea.nativeElement.value;
    markdown.title=this.title.nativeElement.value;
    markdown.tag=this.tag.nativeElement.value;
    this.markDownService.insert_blog(markdown)
      .then(response=>{
        if(response.status==0)
          this.alterService.success("成功");
        else
          this.alterService.error("博客写入失败");
      })
  }

  update_blog( ){
    let  markdown =new MarkDownBlog();
    this.markDownService.update_by_id(markdown)
      .then(response=>{
        if(response.status==0)
          this.alterService.success("成功");
        else
          this.alterService.error(response.msg);
      })
  }
}
