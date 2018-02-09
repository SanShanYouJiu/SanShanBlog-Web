import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { User } from '../../../pojo/user';
import { UserInfoService } from 'app/service/user-info.service';
import { Blog } from 'app/pojo/blog';

@Component({
  selector: 'spec-users',
  templateUrl: 'spec-users-info.component.html',
  styleUrls: ['spec-users-info.component.css']
})

export class SpecificUsersInfoComponent implements OnInit {
  p:number = 1;
  total: number;
  username: string;
  user: User = new User();
  blogs: Blog[];

  constructor(private route: ActivatedRoute,
    private userinfoService: UserInfoService) {
  }

  ngOnInit() {
    this.route.params
      .switchMap((params: Params) => {
        this.username = params['username'];
        return this.userinfoService.getBlogs(this.username);
      }).subscribe(
      response => {
        if (response.status === 0) {
          this.blogs = response.data;
        } else {
          //TODO: 出错的情况
        }
      }
      );
    this.userinfoService.getBasic(this.username).then(
      response => {
        if (response.status === 0) {
          this.user = response.data;
        } else {
          //TODO: 出错的情况
        }
      }
    )
  }

  getPage(page: number) {
    this.total = this.blogs.length;
    this.p = page;
}
}
