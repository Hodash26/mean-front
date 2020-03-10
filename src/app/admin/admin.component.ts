import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Blogpost } from '../models/blogposts';
import { BlogpostService } from '../blogpost.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  // blogposts$: Observable<Blogpost[]>;
  allBlogposts: Blogpost[];

  constructor(private blogpostService: BlogpostService ) { }

  ngOnInit(): void {
    // this.blogposts$ = this.blogpostService.getBlogPosts();
    this.blogpostService
    .getBlogPosts()
    .subscribe(data => this.refresh(data));
  }

  deleteBlogposts(selectedOptions) {
    const ids = selectedOptions.map(so => so.value);
    if (ids.length === 1) {
    this.blogpostService
    .deleteSingleBlogpost(ids[0])
    .subscribe(data => this.refresh(data), err => this.handleError(err));
    } else {
      return this.blogpostService
      .deleteBlogposts(ids)
      .subscribe(data => this.refresh(data), err => this.handleError(err));
    }
  }

    refresh(data) {
      console.log('data', data);
      // tslint:disable-next-line: no-shadowed-variable
      this.blogpostService.getBlogPosts().subscribe(data => {
        this.allBlogposts = data;
      });
    }

    handleError(error) {
      console.error(error);
    }
  }
