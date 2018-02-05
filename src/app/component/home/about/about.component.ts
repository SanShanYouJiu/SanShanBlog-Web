import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { User } from '../../../pojo/user';
import { UserInfoService } from 'app/service/user-info.service';
import { Blog } from 'app/pojo/blog';

@Component({
  selector: 'about',
  templateUrl: 'about.component.html',
styleUrls:['about.component.css']
})

export class  AboutComponent implements OnInit {

    ngOnInit(): void {
    }

}
