import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from "../../../service/authentication.service";
import { Blog } from "../../../pojo/blog";
import { AdminIndexService } from "../../../service/admin.index.service";
import { User } from "../../../pojo/user";
import { UserInfo } from "../../../pojo/user-info";
import { AlertService, VoteService } from "app/service";
import { LogService } from "app/service/Log.service";
import { UserVoteInfo } from 'app/pojo/user-vote-info';

@Component({
  selector: 'admin-index',
  templateUrl: 'admin-index.component.html',
})
export class AdminIndexComponent implements OnInit {
  blogs: Blog[];//TODO: 将blogs进行排序 下面同理
  markdownblogs: Blog[];
  ueditorblogs: Blog[];
  userinfo: UserInfo = new UserInfo();
  userVoteInfo: UserVoteInfo = new UserVoteInfo();

   model: any = {};

  constructor(private authenticationService: AuthenticationService,
    private adminIndexService: AdminIndexService,
    private voteService: VoteService,
    private alertService: AlertService) {
  }

  ngOnInit() {
    this.adminIndexService.getUserInfo()
      .then(response => {
        this.userinfo = response.data;
        this.voteService.get_user_vote_info(this.userinfo.username).
          then(userVoteResponse =>
            this.userVoteInfo = userVoteResponse.data);
      }
      );
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

    this.voteService.get_user_vote_info(this.userinfo.username).
      then(response =>
        this.userVoteInfo = response.data
      );
  }

  change_user_info() {
    this.adminIndexService.change_user_info(this.userinfo.username, this.model.avater, this.model.blogLink)
      .then(response => {
        if (response.status == 0) {
          this.alertService.success("成功");
        } else {
          this.alertService.error(response.msg);
        }
      })
  }

  deleteBlogById(id: number) {
    console.log(id);
    this.adminIndexService.deleteBlogById(id)
      .then(response => {
        if (response.status == 0) {
          this.alertService.success("操作成功");
        } else {
          this.alertService.error(response.msg);
        }

      });
  }


  logout() {
    this.authenticationService.logout();
  }
}
