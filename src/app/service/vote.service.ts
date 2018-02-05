import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import { Config } from '../config/ApiConfig';
import { AuthenticationService } from './index';
import { BlogVoteInfo } from 'app/pojo/blog-vote-info';
import { IpBlogVote } from 'app/pojo/ip-blog-vote';
import { LogService } from 'app/service/Log.service';


@Injectable()
export class VoteService {

    constructor(
        private http: Http) {
    }

    favour_blog(blogId: number): Promise<any> {
        const urlParams = new URLSearchParams();
        return this.http.post(Config.vote_blogId + blogId + Config.favour_blog, urlParams)
        .toPromise()
        .then(response => response.json())
        .catch(LogService.handleError);
    }


    tread_blog(blogId: number): Promise<any> {
        const urlParams = new URLSearchParams();
        return  this.http.post(Config.vote_blogId + blogId + Config.tread_blog, urlParams)
        .toPromise()
        .then(response => response.json())
        .catch(LogService.handleError);
    }


    get_blog_info(blogId: number):  Promise<any>  {
        return  this.http.get(Config.vote_blogId + blogId + Config.blog_vote_info)
        .toPromise()
        .then(response => response.json())
        .catch(LogService.handleError);
    }

    // TODO 在Nginx中自带Ip
    get_ip_vote_info(ip: string): Promise<any> {
        return  this.http.get(Config.vote_ip + ip + Config.ip_vote_info)
        .toPromise()
        .then(response => response.json())
        .catch(LogService.handleError);
    }

    get_user_vote_info(username: string): Promise<any>{
        return this.http.get(Config.vote_user + username + Config.user_vote_info)
        .toPromise()
        .then(response => response.json())
        .catch(LogService.handleError);
    }


    private jwt() {
        // create authorization header with jwt token
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser && currentUser.token) {
            const headers = new Headers({ 'Authorization': 'Bearer ' + currentUser.token });
            return new RequestOptions({ headers: headers });
        }
    }

}
