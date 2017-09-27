import { NgModule }            from '@angular/core';
import { Routes,
  RouterModule }        from '@angular/router';
import {EditorComponent} from "./Editor/editor.component";
import {UEditorEditorComponent} from "./Editor/ueditor.component";
import {MarkDownEditorComponent} from "./Editor/markdown-editor.component";
import {AdminIndexComponent} from "./index/admin-index.component";
import {DeleteBlogComponent } from "app/component/admin/index/change-state/delete-blog.component";
import { UpdateBlogComponent } from "app/component/admin/index/change-state/update-blog.component";

export  const childRouter:Routes=[
       {path:'',redirectTo:'/index',pathMatch:'full'},
       {path:'index',component:AdminIndexComponent},
       {path:'editor',component:EditorComponent},
       {path:'editor/ueditor-editor',component:UEditorEditorComponent},
       // {path:'editor/markdown-editor',component:MarkDownEditorComponent},
       {path:'update-blog/:id',component:UpdateBlogComponent},
       {path:'delete-blog/:id',component:DeleteBlogComponent},
       {path:'**',redirectTo:'/error'},
     ];



