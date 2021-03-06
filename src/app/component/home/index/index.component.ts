import { Component, OnInit, ElementRef, Input, ViewChild } from '@angular/core';
import { BlogService } from '../../../service/index';
import { Blog } from '../../../pojo/blog';
import { Router } from '@angular/router';
import { IndexService } from '../../../service/index.service';
import { isCombinedNodeFlagSet } from 'tslint';
import { AlertService } from '../../../service/alert.service';
import { LogService } from '../../../service/Log.service';
import { FileUploader, ParsedResponseHeaders } from 'ng2-file-upload';
import { Config } from '../../../config/ApiConfig';
import { Headers } from '../../../pojo/Headers';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/delay';
import { PaginationInstance } from 'ng2-pagination';
import { UserService } from 'app/service/user.service';
import { RecommendService } from '../../../service/recommend.service';

const URL = Config.index_advice_upload;


@Component({
  selector: 'index',
  templateUrl: 'index.component.html',
  styleUrls: ["index.component.css"]
})


export class IndexComponent implements OnInit {
  @Input('data') blogs: Blog[];

  asyncBlogs: Observable<Blog[]>;
  p = 1;
  total: number;
  loading: boolean;

  usermodel: any = {};
  repeatPassword: string;

  @ViewChild('emailfeedback')
  email: ElementRef;

  @ViewChild('opinionfeedback')
  opinion: ElementRef;

  @ViewChild('file')
  file: ElementRef;

  filechange: number;

  blogRecommends: Observable<Blog[]>;

  public uploader: FileUploader = new FileUploader({
    url: URL,
  });
  public hasBaseDropZoneOver = false;
  public hasAnotherDropZoneOver = false;

  public fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }

  public fileOverAnother(e: any): void {
    this.hasAnotherDropZoneOver = e;
  }


  ngOnInit() {
    this.getPage(1);
    this.getRecommend();
  }


  constructor(private router: Router,
    private userService: UserService,
    private blogService: BlogService,
    private indexService: IndexService,
    private recommendService: RecommendService,
    private alertService: AlertService) {
    this.filechange = 0;
  }


  changeFileFlag() {
    this.filechange = 1;
  }

  getPage(page: number) {
    this.loading = true;
    this.blogService.getBlog_by_page(20, page)
      .then(
        res => {
          if (res.status === 0) {
            this.total = res.data.total;
            this.p = res.data.pageNum;
            this.loading = false;
            this.asyncBlogs = res.data.completeData;
          } else {
            // 出错的情况
            this.alertService.error(res.msg);
          }
        }
      );
    //   .do(res => {
    //     this.total = res.total;
    //     this.p = page;
    //     this.loading = false;
    //   })
    //   .map(res => res.items);
  }


  getRecommend() {
    this.recommendService.get_blogRecommends()
    .then(
      res => {
        if ( res.status === 0) {
         this.blogRecommends = res.data;
        } else {
          this.alertService.error(res.msg);
        }
      }
    );
  }

  //判断是否显示头部和尾部
  isLogin(): boolean {
    if (localStorage.getItem('currentUser')) {
      // logged in so return true
      return true;
    } else {
      return false;
    }
  }

  register() {
    if (this.usermodel.username === undefined || this.usermodel.username === "") {
      this.alertService.error('用户名不能为空');
      return;
    }
    if (this.usermodel.email === undefined || this.usermodel.email === "") {
      this.alertService.error('邮箱不能为空');
      return;
    }
    if (this.usermodel.password === undefined || this.usermodel.password === "") {
      this.alertService.error('密码不能为空');
      return;
    }
    if (this.usermodel.password !== this.repeatPassword) {
      this.alertService.error('密码不一致');
      return;
    }


    this.userService.create_novalidate(this.usermodel)
      .subscribe(
        data => {
          if (data.status === 0) {
            this.alertService.success('注册成功', true);
            this.router.navigate(['/login']);
          } else {
            this.alertService.error(data.msg);
            this.loading = false;
          }
        },
        error => {
          this.alertService.error(error.data);
          this.loading = false;
        });
  }


  feedback() {
    const emailValue = this.email.nativeElement.value;
    const opinionValue = this.opinion.nativeElement.value;

    if (emailValue !== '' && this.filechange !== 0) {
      // 用的是ng2-file-upload中自带的传递功能 在header中加入其它数据
      const header1 = new Headers('email', emailValue);
      const header2 = new Headers('opinion', opinionValue);
      const list: Headers[] = [header1, header2];
      this.uploader.options.headers = list;
      this.uploader.uploadAll();
      // TODO: 文件太大上传失败的情况
      this.alertService.success('反馈成功', true);
      return;
    } else if (emailValue !== '') {
      this.indexService.feedback(emailValue, opinionValue)
        .subscribe(
          data => {
            if (data.status === 0) {
              this.alertService.success('反馈成功', true);
              return;
            } else {
              LogService.errorMsg('反馈出错:' + data.msg);
              this.alertService.error(data.msg);
              return;
            }
          },
          error => {
            LogService.error('反馈出错', error);
            this.alertService.error('反馈出错');
            return;
          }
        );
    } else {
      this.alertService.error('email不能为空');
    }
  }

}
