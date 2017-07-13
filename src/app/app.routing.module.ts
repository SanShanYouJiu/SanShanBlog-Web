import {Routes} from "@angular/router";
import {IndexComponent} from "./component/home/index/index.component";
import {LoginComponent} from "./component/home/login/login.component";
import {RegisterComponent} from "./component/home/register/register.component";
import {ErrorComponent} from "./component/home/error/error.component";
import {MarkDownEditorComponent} from "./component/admin/Editor/markdown-editor.component";
import {AuthGuard} from "./service/guard/auth.guard";
import {AuthGuard2} from "./service/guard/auth.guard2";
import {BlogDetailComponent} from "./component/home/blog/blog.detail.component";
import {BlogDateComponent} from "./component/home/index/date/blog-date.component";
import {BlogTitleComponent} from "./component/home/index/title/blog-title.component";
import {UploadDemoComponent} from "./component/admin/upload/upload.component";

export const appRoutes: Routes = [
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
    path:'blog-date',
    component:BlogDateComponent
  },
  {
    path:'blog-tag',
    component:BlogDateComponent
  },
  {
    path:'blog-title',
    component:BlogTitleComponent
  },
  {
    path:'blog-detail/:id',
    component:BlogDetailComponent
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate:[AuthGuard2]
  },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate:[AuthGuard2]
  },
  {
    path: 'upload',
    component: UploadDemoComponent
  },
  {
    path: 'error',
    component: ErrorComponent
  },
  {
    path:'admin/editor/markdown-editor',
    component:MarkDownEditorComponent,
    canActivate:[AuthGuard]
  },
  {
    path: 'admin',
    loadChildren: 'app/component/admin/admin.module#AdminModule',
    canActivate:[AuthGuard]
  },

  {
    path: '**',
    redirectTo:'/error'
  },

];


