import {Component, OnInit, ElementRef, ViewChild} from '@angular/core';
import {BlogService} from "../../../service/index";
import {Blog} from "../../../pojo/blog";
import {Router} from "@angular/router";
import {IndexService} from "../../../service/index.server";

@Component({
  selector: 'index',
  templateUrl: 'index.component.html'
})
export class IndexComponent implements OnInit {
  private blogs: Blog[];

  @ViewChild('emailfeedback')
  email:ElementRef;

  @ViewChild('opinionfeedback')
  opinion:ElementRef;

  @ViewChild('file')
  file:ElementRef;

  ngOnInit() {
    this.getBlogs();
  }

  constructor(
    private router:Router,
    private  blogService: BlogService,
    private indexservice:IndexService) {

  }

  getBlogs(): void {
    this.blogService.getBlogs()
      .then(response => this.blogs = response.data);
  }

   feedback(){
      this.indexservice.feedBack(this.email.nativeElement.value,this.opinion.nativeElement.value);
      if(this.file.nativeElement.value!=null){
        console.log("上传文件 还没写");
      }
   }
}
