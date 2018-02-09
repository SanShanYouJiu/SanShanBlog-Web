/* tslint:disable */
import { Component, OnInit, ViewEncapsulation, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { UEditorComponent } from 'ngx-ueditor';
import {UEditorConfig} from 'ngx-ueditor';
import {UEditorService} from "../../../service/ueditor-editor.service";
import {LogService} from "../../../service/Log.service";
import {UEditorBlog} from "../../../pojo/ueditor-blog";
import {AlertService} from "../../../service/alert.service";


@Component({
  selector: 'ueditor-editor',
  templateUrl: 'ueditor.component.html',
})
export class UEditorEditorComponent implements OnInit{
  ngOnInit(): void {
  }
  @ViewChild('full') full: UEditorComponent;
  full_source: string;

  constructor(private el: ElementRef,
              private alterService:AlertService,
  private uEditorService:UEditorService,
  ) {
  }

  @ViewChild('ueditor_tag')
  tag:ElementRef;

  @ViewChild('ueditor_title')
  title:ElementRef;

   alreadySumbit : boolean =false; 

  insert_blog(){
   let  ueditorblog =new UEditorBlog();
    ueditorblog.tag=this.tag.nativeElement.value;
    ueditorblog.title=this.title.nativeElement.value;
    ueditorblog.content=this.full.Instance.getContent();
    this.alreadySumbit = true;
    this.uEditorService.insert_blog(ueditorblog)
      .then(response=>{
        if(response.status==0){
         this.alterService.success("成功");
        }
        else {
          this.alterService.error("博客写入失败");
          this.alreadySumbit = false;
      }
      })
  }

  update_blog(ueditorblog:UEditorBlog){
    this.uEditorService.update_by_id(ueditorblog)
      .then(response=>{
        if(response.status==0)
          this.alterService.success("成功");
        else
          this.alterService.error(response.msg);
      })
  }


   setLanguage(lang: 'zh-cn' | 'en') {
    this.full.setLanguage(lang);
  }


    getAllHtml() {
    alert(this.full.Instance.getAllHtml())
  }

   getContent() {
    let arr = [];
    arr.push("使用editor.getContent()方法可以获得编辑器的内容");
    arr.push("内容为：");
    arr.push(this.full.Instance.getContent());
    alert(arr.join("\n"));
  }

    getContentTxt() {
    let arr = [];
    arr.push("使用editor.getContentTxt()方法可以获得编辑器的纯文本内容");
    arr.push("编辑器的纯文本内容为：");
    arr.push(this.full.Instance.getContentTxt());
    alert(arr.join("\n"));
  }

    setContent(isAppendTo: boolean) {
    let arr = [];
    arr.push("使用editor.setContent('欢迎使用ueditor')方法可以设置编辑器的内容");
    this.full.Instance.setContent('欢迎使用ueditor', isAppendTo);
    alert(arr.join("\n"));
  }

    getPlainTxt() {
    let arr = [];
    arr.push("使用editor.getPlainTxt()方法可以获得编辑器的带格式的纯文本内容");
    arr.push("内容为：");
    arr.push(this.full.Instance.getPlainTxt());
    alert(arr.join('\n'))
  }

    hasContent() {
    let arr = [];
    arr.push("使用editor.hasContents()方法判断编辑器里是否有内容");
    arr.push("判断结果为：");
    arr.push(this.full.Instance.hasContents());
    alert(arr.join("\n"));
  }

   insertHtml() {
    let value = prompt('插入html代码', '');
    this.full.Instance.execCommand('insertHtml', value)
  }

    getText() {
    //当你点击按钮时编辑区域已经失去了焦点，如果直接用getText将不会得到内容，所以要在选回来，然后取得内容
    let range = this.full.Instance.selection.getRange();
    range.select();
    let txt = this.full.Instance.selection.getText();
    alert(txt)
  }

  focus: boolean | string;
   addListenerFocus() {
    this.full.addListener('focus', () => {
      this.focus = `fire focus in ${new Date().getTime()}`;
    });
    this.focus = '监听中，尝试在编辑中输入几个字！';
  }
   removeListenerFocus() {
    this.full.removeListener('focus');
    this.focus = '已移除监听';
  }

   config_source: string;
  config: any = {
    toolbars: [[
      'fullscreen', 'source', '|', 'undo', 'redo', '|',
      'bold', 'italic', 'underline', 'fontborder', 'strikethrough', 'superscript', 'subscript', 'removeformat', 'formatmatch', 'autotypeset', 'blockquote', 'pasteplain', '|', 'forecolor', 'backcolor', 'insertorderedlist', 'insertunorderedlist', 'selectall', 'cleardoc', '|',
      'rowspacingtop', 'rowspacingbottom', 'lineheight', '|',
      'customstyle', 'paragraph', 'fontfamily', 'fontsize', '|',
      'directionalityltr', 'directionalityrtl', 'indent', '|',
      'justifyleft', 'justifycenter', 'justifyright', 'justifyjustify', '|', 'touppercase', 'tolowercase', '|',
      'link', 'unlink', 'anchor', '|', 'imagenone', 'imageleft', 'imageright', 'imagecenter', '|',
      'simpleupload', 'insertimage', 'emotion', 'scrawl', 'insertvideo', 'music', 'attachment', 'map', 'gmap', 'insertframe', 'insertcode', 'webapp', 'pagebreak', 'template', 'background', '|',
      'horizontal', 'date', 'time', 'spechars', 'snapscreen', 'wordimage', '|',
      'inserttable', 'deletetable', 'insertparagraphbeforetable', 'insertrow', 'deleterow', 'insertcol', 'deletecol', 'mergecells', 'mergeright', 'mergedown', 'splittocells', 'splittorows', 'splittocols', 'charts', '|',
      'print', 'preview', 'searchreplace', 'drafts', 'help'
  ]],
    autoClearinitialContent: true,
    wordCount: true,
    initialFrameHeight: 400 
    // , initialFrameWidth:1147 
  };

  form_source: string;

  custom_source: string;
}
