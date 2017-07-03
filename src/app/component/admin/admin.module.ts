import {NgModule} from '@angular/core';
import {EditorComponent} from "./Editor/editor.component";
import {UEditorEditorComponent} from "./Editor/ueditor.component";
import {MarkDownEditorComponent} from "./Editor/markdown-editor.component";
import {CommonModule} from "@angular/common";
import {AdminIndexComponent} from "./index/admin-index.component";
import {childRouter} from "./admin.router.module";
import {RouterModule} from "@angular/router";
import {AdminComponent} from "./admin.component";
import {HighlightDirective} from "../../directive/highlight.directive";
import {HttpModule} from "@angular/http";
import {UEditorModule} from "ngx-ueditor";
import {FormsModule} from "@angular/forms";

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
  declarations: [
    // 该模块的入口,因此一定要包含进来
    AdminComponent,
    AdminIndexComponent,
    EditorComponent,
    HighlightDirective,
    UEditorEditorComponent,
  ],
})
export class AdminModule {

}
