import { Component, OnInit } from '@angular/core';
import { Router, Params, ActivatedRoute } from '@angular/router';
import { SearchService, AlertService } from '../../../service';
import { Observable } from 'rxjs/Observable';
import { Blog } from 'app/pojo/blog';
import { User } from '../../../pojo/user';
import { ElasticSearchInfo } from '../../../pojo/elastic-search-info';

@Component({
    selector: 'search-show',
    templateUrl: 'search-show.component.html',
    styleUrls: ['search-show.component.css']
})

export class SearchShowComponent implements OnInit {

    asyncBlogs: Blog[];
    asyncUsers: User[];
    key: string;

    blogP = 0;
    blogTotal: number;
    blogLoading: boolean;

    userP = 0;
    userTotal: number;
    userLoading: boolean;

    constructor(private route: ActivatedRoute,
        private router: Router,
        private searchservice: SearchService,
        private alertService: AlertService
    ) {

    }

    ngOnInit() {
        this.route.params
            .switchMap((params: Params) => {
                 this.key = params['key'];
                  this.getBlogPage(1);
                  return this.key;
            }
            ).subscribe(response => {
                // this.getBlogPage(0);
            });
    }

    getBlogPage(page: number) {
        this.blogLoading = true;
        this.searchservice.search_blog_info(this.key, 10, page)
            .then(
                res => {
                    if (res.status === 0) {
                        let elastic: ElasticSearchInfo[];
                        const blogs:  Blog[] = new Array<Blog>();
                        elastic = res.data.result;
                        for (let index = 0; index < elastic.length; index++) {
                              blogs[index] = elastic[index].source;
                        }
                        this.asyncBlogs = blogs;
                        this.blogTotal = res.data.total;
                        this.blogP = page;
                        this.blogLoading = false;
                    } else {
                        this.alertService.error(res.msg);
                    }
                });
    }

    getUserPage(page: number) {
        console.log(page);
        this.userLoading = false;
        this.searchservice.search_user_info(this.key, 10, page)
        .then(
            res => {
                if (res.status === 0) {
                    let elastic: ElasticSearchInfo[];
                    const users:  User[] = new Array<User>();
                    elastic = res.data.result;
                    for (let index = 0; index < elastic.length; index++) {
                          users[index] = elastic[index].source;
                    }
                    this.asyncUsers = users;
                    this.userTotal = res.data.total;
                    this.userP = page;
                    this.userLoading = false;
                } else {
                    this.alertService.error(res.msg);
                }
            });
    }
}