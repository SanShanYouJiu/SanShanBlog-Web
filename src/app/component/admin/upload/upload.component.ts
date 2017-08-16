import { Component } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import {AlertService} from "../../../service/alert.service";
import {Config} from "../../../config/ApiConfig";
import {RequestOptions, Headers} from "@angular/http";

//TODO: URL暂时放在这里
const URL = Config.index_advice_upload;

@Component({
  selector: 'admin-upload',
  templateUrl: 'upload.component.html'
})
export class UploadDemoComponent {

  constructor(alterService:AlertService,
  ){
  }
  public uploader:FileUploader = new FileUploader({
    url: URL,
    method:"POST",
    //作为JWT验证头部使用
    authTokenHeader:'Authorization',
    authToken:'Bearer ' + JSON.parse(localStorage.getItem('currentUser')).token
  });

  public hasBaseDropZoneOver:boolean = false;
  public hasAnotherDropZoneOver:boolean = false;

  public fileOverBase(e:any):void {
    this.hasBaseDropZoneOver = e;
  }

  public fileOverAnother(e:any):void {
    this.hasAnotherDropZoneOver = e;
  }
}
