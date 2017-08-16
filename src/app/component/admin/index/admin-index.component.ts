import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from "../../../service/authentication.service";
import { Blog } from "../../../pojo/blog";
import { AdminIndexService } from "../../../service/admin.index.service";
import { User } from "../../../pojo/user";
import { UserInfo } from "../../../pojo/user-info";
import { AlertService } from "app/service";
import { LogService } from "app/service/Log.service";

@Component({
  selector: 'admin-index',
  templateUrl: 'admin-index.component.html',
  providers: [AdminIndexService]
})
export class AdminIndexComponent implements OnInit {
  blogs: Blog[];
  markdownblogs: Blog[];
  ueditorblogs: Blog[];
  userinfo: UserInfo;

  constructor(private authenticationService: AuthenticationService,
    private adminIndexService: AdminIndexService,
    private alertService: AlertService) {
  }

  ngOnInit() {
    this.adminIndexService.getBlog_All()
      .then(response =>
        this.blogs = response.data
      );
    this.adminIndexService.getMarkdown_All().
      then(response =>
        this.markdownblogs = response.data
      );
    this.adminIndexService.getUEditor_All()
      .then(response =>
        this.ueditorblogs = response.data
      );
    this.adminIndexService.getUserInfo()
      .then(response =>
        this.userinfo = response.data
      );
  }


  logout() {
    this.authenticationService.logout();
  }
}
