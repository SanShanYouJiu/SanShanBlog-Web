import { Component, OnInit, Input } from '@angular/core';
import { AuthenticationService } from "../../../../service/authentication.service";
import { Blog } from "../../../../pojo/blog";
import { AdminIndexService } from "../../../../service/admin.index.service";
import { User } from "../../../../pojo/user";
import { UserInfo } from "../../../../pojo/user-info";
import { AlertService } from "app/service";
import { Router, ActivatedRoute, ParamMap, Params } from '@angular/router';
import 'rxjs/add/operator/switchMap';
import { LogService } from "app/service/Log.service";

@Component({
  selector: 'delete-blog',
  templateUrl: 'delete-blog.component.html',
  providers: [AdminIndexService, AlertService]
})
export class DeleteBlogComponent implements OnInit {
  id: number;

  constructor(
    private route: ActivatedRoute,
    private alterService: AlertService,
    private adminIndexService: AdminIndexService) {

  }

  ngOnInit(): void {
    this.route.params.switchMap(((params: Params) => {
      return params['id'];
    })).subscribe(
      response => {
        this.deleteBlogById(<number>response);
      }
      );
  }


  deleteBlogById(id: number) {
    this.adminIndexService.deleteBlogById(id)
      .then(response => {
        if (response.status == 0) {
          this.alterService.success("操作成功")
        } else {
          this.alterService.error(response.msg);
        }
      });
  }


}
