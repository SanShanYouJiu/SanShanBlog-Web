import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {HttpModule, BaseRequestOptions} from '@angular/http';
import { CommonModule } from '@angular/common';

import {BsDropdownModule, ModalModule} from 'ng2-bootstrap';
import {Ng2PaginationModule} from "ng2-pagination";
import {TooltipModule } from 'ng2-bootstrap';
import {ToastModule} from "ng2-toastr/ng2-toastr";
import { FileUploadModule } from 'ng2-file-upload';

import {LoginComponent} from "./component/home/login/login.component";
import {RegisterComponent} from "./component/home/register/register.component";
import {MarkDownService} from "./service/markdown-editor.service";
import {UEditorService} from "./service/ueditor-editor.service";
import {BlogService} from "./service/blog.service";
import {HeaderComponent} from "./component/header/header.component";
import {FooterComponent} from "./component/footer/footer.component";
import { AppComponent } from './component/app.component';
import { appRoutes} from "./app.routing.module";
import { IndexComponent} from "./component/home/index/index.component";
import {RouterModule} from "@angular/router";
import {ErrorComponent} from "./component/home/error/error.component";
import {MarkDownEditorComponent} from "./component/admin/Editor/markdown-editor.component";
import {AuthGuard} from "./service/guard/auth.guard";
import {AuthenticationService} from "./service/authentication.service";
import {UserService} from "./service/user.service";
import {AlertService} from "./service/alert.service";
import {AlertComponent} from "./directive/alert.component";
import {AuthGuard2} from "./service/guard/auth.guard2";
import {BlogDetailComponent} from "./component/home/blog/blog.detail.component";
import {IndexService} from "./service/index.service";
import {BlogTagComponent} from "./component/home/index/tag/blog-tag.component";
import {BlogTitleComponent} from "./component/home/index/title/blog-title.component";
import {BlogDateComponent} from "./component/home/index/date/blog-date.component";
import {UploadDemoComponent} from "./component/admin/upload/upload.component";


@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    BlogDetailComponent,
    MarkDownEditorComponent,
    LoginComponent,
    RegisterComponent,
    HeaderComponent,
    BlogTagComponent,
    BlogTitleComponent,
    BlogDateComponent,
    FooterComponent,
    ErrorComponent,
    AlertComponent,
    UploadDemoComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    FileUploadModule,
    RouterModule.forRoot(appRoutes),
    HttpModule,
    BsDropdownModule.forRoot(),
    TooltipModule.forRoot(),
    ModalModule.forRoot(),
    ToastModule.forRoot(),
    Ng2PaginationModule,
    CommonModule,
  ],
  providers: [
    AuthGuard,
    AuthGuard2,
    AuthenticationService,
    BaseRequestOptions,
    UserService,
    IndexService,
    AlertService,


    MarkDownService,
    UEditorService,
    BlogService],
  bootstrap: [AppComponent]
})
export class AppModule { }
