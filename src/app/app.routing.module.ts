import { Routes, RouterModule } from '@angular/router';
import { IndexComponent } from './component/home/index/index.component';
import { LoginComponent } from './component/home/auth/login/login.component';
import { RegisterComponent } from './component/home/auth/register/register.component';
import { ErrorComponent } from './component/home/error/error.component';
import { MarkDownEditorComponent } from './component/admin/Editor/markdown-editor.component';
import { AuthGuard } from './service/guard/auth.guard';
import { AuthGuard2 } from './service/guard/auth.guard2';
import { BlogDetailComponent } from './component/home/blog/blog.detail.component';
import { BlogDateComponent } from './component/home/index/date/blog-date.component';
import { BlogTitleComponent } from './component/home/index/title/blog-title.component';
import { UploadDemoComponent } from './component/admin/upload/upload.component';
import { BlogTagComponent } from 'app/component/home/index/tag/blog-tag.component';
import { BlogSearchShowComponent } from 'app/component/home/index/search/blog-search-show.component';
import { NgModule } from '@angular/core';
import { ForgetPasswordComponent } from './component/home/auth/forget-password.component';
import { ChangePasswordComponent } from './component/home/auth/change-password.component';
import { ConfirmForgetPasswordComponent } from 'app/component/home/auth/confirm-forget-password.component';
import { SpecificUsersInfoComponent } from './component/home/user-info/spec-users-info.component';
import { AboutComponent } from 'app/component/home/about/about.component';

const appRoutes: Routes = [
  {
    path: '',
    redirectTo: '/index',
    pathMatch: 'full'
  },
  {
    path: 'index',
    component: IndexComponent
  },
  {
      path: 'about',
      component: AboutComponent
  },
  {
    path: 'blog-date',
    component: BlogDateComponent
  },
  {
    path: 'blog-tag',
    component: BlogTagComponent
  },
  {
    path: 'blog-title',
    component: BlogTitleComponent
  },
  {
    path: 'auth/forget-pwd',
    component: ForgetPasswordComponent,
  },
  {
    path: 'auth/change-pwd/:code',
    component: ChangePasswordComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'auth/confirm-forget-pwd',
    component: ConfirmForgetPasswordComponent
  },
  {
    path: 'blog-detail/:id',
    component: BlogDetailComponent
  },
  {
    path: 'blog-search-show/:string',
    component: BlogSearchShowComponent
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [AuthGuard2]
  },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [AuthGuard2]
  },
  {
    path: 'error',
    component: ErrorComponent
  },
  {
    path: 'spec-users/:username',
    component: SpecificUsersInfoComponent
  },
  // TODO: 未知原因 不能lazy load
  {
    path: 'admin/upload',
    component: UploadDemoComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'admin/editor/markdown-editor',
    component: MarkDownEditorComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'admin',
    loadChildren: 'app/component/admin/admin.module#AdminModule',
    canActivate: [AuthGuard]
  },

  {
    path: '**',
    redirectTo: '/error'
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(
      appRoutes,
      // { enableTracing: true } // <-- debugging purposes only
    )
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {
}


