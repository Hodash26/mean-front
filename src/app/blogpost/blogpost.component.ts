import { Component, OnInit } from '@angular/core';
import { BlogpostService } from '../blogpost.service';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Blogpost } from '../models/blogposts';

@Component({
  selector: 'app-blogpost',
  templateUrl: './blogpost.component.html',
  styleUrls: ['./blogpost.component.css']
})
export class BlogpostComponent implements OnInit {
  blogpost$: Observable<Blogpost>;

  constructor(private activatedRoute: ActivatedRoute, private blogpostsService: BlogpostService) { }

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    this.blogpost$ = this.blogpostsService.getBlogpostById(id);
  }

}
