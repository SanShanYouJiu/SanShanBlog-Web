import { Component, ViewEncapsulation } from '@angular/core';
import { Router, Params, ActivatedRoute } from "@angular/router";
import { BlogService } from "app/service";
import 'rxjs/add/operator/switchMap';
import { LogService } from "app/service/Log.service";
import { Blog } from "app/pojo/blog";

@Component({
  selector: 'blog-search-show',
  templateUrl: 'blog-search-show.component.html',
})
export class BlogSearchShowComponent {

  msg: string;
  blogs:Blog[];
  constructor(private route: ActivatedRoute,
    private router: Router,
    private blogService: BlogService
  ) {
  }

  ngOnInit(): void {

    this.route.paramMap.switchMap((params: Params) => {
      let string = params.get('string');
       if(string.indexOf('tag:')!=-1){
         let requestString=string.replace('tag:','');
      return this.blogService.getBlog_by_tag(requestString);
       }else if(string.indexOf('title:')!=-1){
         let requestString=string.replace('title:','');
         return this.blogService.getBlog_by_title(requestString);
       }else if(string.indexOf('date:')!=-1){
        let requestString=string.replace('date:','');
         return this.blogService.getBlog_by_date(requestString);
       }else{
         LogService.errorMsg('匹配错误');
         return '匹配错误';
       }
    })
      .subscribe(response => {
        if(response.status!==0){
          this.msg = response.msg;
        }else{
          this.blogs=response.data;
        }
      });
  }

}


