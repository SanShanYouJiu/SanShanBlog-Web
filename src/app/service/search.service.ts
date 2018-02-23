import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response, URLSearchParams } from '@angular/http';
import { Config } from '../config/ApiConfig';
import { LogService } from 'app/service';

@Injectable()
export class SearchService {

    constructor(private http: Http, ) { }


    search_user_info(key: string, pageRows: number, pageNum: number): Promise<any> {
        return this.http.get(Config.search_user_info + '/' + key + '/pageRows:' + pageRows + '/pageNum:' + pageNum)
            .toPromise()
            .then(response => response.json())
            .catch(LogService.handleError);
    }

    search_blog_info(key: string, pageRows: number, pageNum: number): Promise<any> {
        return this.http.get(Config.search_blog_info + '/' + key + '/pageRows:' + pageRows + '/pageNum:' + pageNum)
            .toPromise()
            .then(response => response.json())
            .catch(LogService.handleError);
    }

}