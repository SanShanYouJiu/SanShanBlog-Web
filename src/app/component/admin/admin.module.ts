import { NgModule } from '@angular/core';
import { EditorComponent } from "./Editor/editor.component";
import { UEditorEditorComponent } from "./Editor/ueditor.component";
import { CommonModule } from "@angular/common";
import { AdminIndexComponent } from "./index/admin-index.component";
import { childRouter } from "./admin.router.module";
import { RouterModule } from "@angular/router";
import { AdminComponent } from "./admin.component";
import { HttpModule } from "@angular/http";
import { UEditorModule } from "ngx-ueditor";
import { FormsModule } from "@angular/forms";
import { DeleteBlogComponent } from "app/component/admin/index/change-state/delete-blog.component";
import { UpdateBlogComponent } from "app/component/admin/index/change-state/update-blog.component";
import { AdminIndexService } from 'app/service/admin.index.service';
import { MarkDownService, UEditorService } from "app/service";
import { MarkDownEditorComponent } from "app/component/admin/Editor/markdown-editor.component";

@NgModule({
  imports: [
    RouterModule.forChild(childRouter),
    HttpModule,
    FormsModule,
    CommonModule,
    UEditorModule.forRoot({
      // 指定ueditor.js路径目录
      path: 'assets/plugins/ueditor/',
      // 默认全局配置项
      options: {
        themePath: 'assets/plugins/ueditor/themes/'
      }
    }),
  ],
  providers: [
    AdminIndexService,
    MarkDownService,
    UEditorService
  ],
  declarations: [
    // 该模块的入口,因此一定要包含进来
    AdminComponent,
    AdminIndexComponent,
    EditorComponent,
    UEditorEditorComponent,
    DeleteBlogComponent,
    UpdateBlogComponent,
  ],
})
export class AdminModule {

}
