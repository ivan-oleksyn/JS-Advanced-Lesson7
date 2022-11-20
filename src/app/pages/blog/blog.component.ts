import { Component, OnInit } from '@angular/core';
import { IPostResponse } from 'src/app/shared/interfaces/post.interface';
import { PostService } from 'src/app/shared/services/post.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {

  public userPosts: Array<IPostResponse> = [];

  constructor(private postService: PostService) { }

  ngOnInit(): void {
    this.getPosts();
  }

  getPosts(): void {
    this.postService.getAll().subscribe((data: IPostResponse[]) => {
      this.userPosts = data;
    })
  }

}
