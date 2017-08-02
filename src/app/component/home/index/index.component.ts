import {Component, OnInit, ElementRef, ViewChild} from '@angular/core';
import {BlogService} from "../../../service/index";
import {Blog} from "../../../pojo/blog";
import {Router} from "@angular/router";
import {IndexService} from "../../../service/index.service";
import {isCombinedNodeFlagSet} from "tslint";
import {AlertService} from "../../../service/alert.service";
import {LogService} from "../../../service/Log.service";
import {FileUploader, ParsedResponseHeaders} from 'ng2-file-upload';
import {Config} from "../../../config/ApiConfig";
import {Headers} from "../../../pojo/Headers";

const URL = Config.index_advice_upload;

@Component({
  selector: 'index',
  templateUrl: 'index.component.html'
})


export class IndexComponent implements OnInit {
  private blogs: Blog[];

  @ViewChild('emailfeedback')
  email: ElementRef;

  @ViewChild('opinionfeedback')
  opinion: ElementRef;

  @ViewChild('file')
  file: ElementRef;

  filechange: number;


  public uploader: FileUploader = new FileUploader({
    url: URL,
  });
  public hasBaseDropZoneOver: boolean = false;
  public hasAnotherDropZoneOver: boolean = false;

  public fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }

  public fileOverAnother(e: any): void {
    this.hasAnotherDropZoneOver = e;
  }


  ngOnInit() {
    this.getBlogs();

  }

  constructor(private router: Router,
              private  blogService: BlogService,
              private indexService: IndexService,
              private alertService: AlertService) {
    this.filechange = 0;
  }


  getBlogs(): void {
    this.blogService.getBlog_All()
      .then(response => this.blogs = response.data);
  }

  changeFileFlag() {
    this.filechange = 1;
  }


  //TODO 修复这个功能

  feedback() {
    let emailValue = this.email.nativeElement.value;
    let opinionValue = this.opinion.nativeElement.value;

    if (emailValue != "" && this.filechange != 0) {
      //用的是ng2-file-upload中自带的传递功能 在header中加入其它数据
      let header1 = new Headers("email", emailValue);
      let header2 = new Headers("opinion", opinionValue);
      let list: Headers[] = [header1, header2];
      this.uploader.options.headers = list;
      this.uploader.uploadAll();
      //todo 增加反馈失败的alter
      this.alertService.success('反馈成功', true);
      return;
    } else if (emailValue != "") {
      this.indexService.feedback(emailValue, opinionValue)
        .subscribe(
          data => {
            if (data.status == 0) {
              this.alertService.success('反馈成功', true);
              return;
            } else {
              LogService.errorMsg("反馈出错:" + data.msg);
              this.alertService.error(data.msg);
              return;
            }
          },
          error => {
            LogService.error("反馈出错", error);
            this.alertService.error("反馈出错");
            return;
          }
        );
    } else {
      this.alertService.error("email不能为空");
    }
  }
}
