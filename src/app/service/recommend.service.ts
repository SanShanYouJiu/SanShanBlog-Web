import {Injectable} from "@angular/core";
import {Headers, Http, RequestOptions,Response, URLSearchParams} from "@angular/http";
import {Config} from "../config/ApiConfig";
import {LogService} from "./Log.service";
import 'rxjs/add/operator/map'
import { Observable } from 'rxjs';
import 'rxjs/add/operator/toPromise';
@Injectable()
export class RecommendService {

  constructor(
    private http: Http, ) {
  }


  get_blogRecommends(): Promise<any>{
    return this.http.get(Config.blog_recommend)
    .toPromise()
    .then(response => response.json())
    .catch(LogService.handleError);
 }


}
