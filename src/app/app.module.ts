import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {HttpModule, BaseRequestOptions} from '@angular/http';
import { CommonModule } from '@angular/common';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {BsDropdownModule, ModalModule} from 'ng2-bootstrap';
import {Ng2PaginationModule} from 'ng2-pagination';
import {TooltipModule } from 'ng2-bootstrap';
import { FileUploadModule } from 'ng2-file-upload';
import {PopoverModule} from 'ngx-popover';
import { LMarkdownEditorModule } from 'ngx-markdown-editor';

import {LoginComponent} from './component/home/auth/login/login.component';
import {RegisterComponent} from './component/home/auth/register/register.component';
import {MarkDownService} from './service/markdown-editor.service';
import {UEditorService} from './service/ueditor-editor.service';
import {BlogService} from './service/blog.service';
import {HeaderComponent} from './component/header/header.component';
import {FooterComponent} from './component/footer/footer.component';
import { AppComponent } from './component/app.component';
import { AppRoutingModule } from './app.routing.module';
import { IndexComponent} from './component/home/index/index.component';
import {RouterModule} from '@angular/router';
import {ErrorComponent} from './component/home/error/error.component';
import {MarkDownEditorComponent} from './component/admin/Editor/markdown-editor.component';
import {AuthGuard} from './service/guard/auth.guard';
import {AuthenticationService} from './service/authentication.service';
import {UserService} from './service/user.service';
import {AlertService} from './service/alert.service';
import {AlertComponent} from './directive/alert.component';
import {BlogDetailComponent} from './component/home/blog/blog.detail.component';
import {IndexService} from './service/index.service';
import {BlogTagComponent} from './component/home/index/tag/blog-tag.component';
import {BlogTitleComponent} from './component/home/index/title/blog-title.component';
import {BlogDateComponent} from './component/home/index/date/blog-date.component';
import {UploadDemoComponent} from './component/admin/upload/upload.component';
import {AdminIndexService} from './service/admin.index.service';
import { BlogSearchShowComponent } from 'app/component/home/index/search/blog-search-show.component';
import { AdminModule } from 'app/component/admin/admin.module';
import {ForgetPasswordComponent} from './component/home/auth/forget-password.component';
import {ChangePasswordComponent} from './component/home/auth/change-password.component';
import { ConfirmForgetPasswordComponent } from 'app/component/home/auth/confirm-forget-password.component';
import { CodeValidateService } from 'app/service/code-validate.service';
import {SpecificUserInfoComponent} from './component/home/user-info/spec-user-info.component';
import { UserInfoService } from 'app/service/user-info.service';
import { VoteService } from 'app/service';
import { AboutComponent } from 'app/component/home/about/about.component';
import { LeaveGuard } from './service/guard/leave.guard';
import { SearchShowComponent } from './component/home/search/search-show.component';
import { SearchService } from 'app/service/search.service';


@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    BlogDetailComponent,
    LoginComponent,
    RegisterComponent,
    HeaderComponent,
    BlogTagComponent,
    BlogTitleComponent,
    BlogDateComponent,
    BlogSearchShowComponent,
    FooterComponent,
    ErrorComponent,
    AlertComponent,
    UploadDemoComponent,
    ForgetPasswordComponent,
    ChangePasswordComponent,
    ConfirmForgetPasswordComponent,
    SpecificUserInfoComponent,
    MarkDownEditorComponent,
    AboutComponent,
    SearchShowComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    FileUploadModule,
    HttpModule,
    BsDropdownModule.forRoot(),
    TooltipModule.forRoot(),
    ModalModule.forRoot(),
    CommonModule,
    AppRoutingModule,
    Ng2PaginationModule,
    LMarkdownEditorModule,
    PopoverModule,
    // TODO: 修复Disqus
 
  ],
  providers: [
    AuthGuard,
    LeaveGuard,
    AuthenticationService,
    BaseRequestOptions,
    UserService,
    UserInfoService,
    IndexService,
    AlertService,
    VoteService,
    SearchService,

    CodeValidateService,
    BlogService],
  bootstrap: [AppComponent]
})
export class AppModule { }
