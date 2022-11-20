import { Component, OnInit } from '@angular/core';
import { log } from 'console';
import { IPostRequest, IPostResponse } from 'src/app/shared/interfaces/post.interface';
import { PostService } from 'src/app/shared/services/post.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  public blogPosts!: IPostResponse[];
  public postTitle!: string;
  public postDescription!: string;
  public postAuthor!: string;
  public currentId!:number;
  public editActive = false;

  constructor(
    private postService: PostService
  ) { }

  ngOnInit(): void {
    this.getPosts();
  }

  getPosts(): void {
    this.postService.getAll().subscribe((data: IPostResponse[]) => {
      this.blogPosts = data;
    })
  }

  addPost(): void {
    if(this.postTitle && this.postDescription && this.postAuthor){
      const newPost = {
        title: this.postTitle,
        description: this.postDescription,
        author: this.postAuthor
      };
      this.postService.create(newPost).subscribe(() => {
        this.getPosts();
        this.resetForm();
      })
    }
    else{
      alert('Please fill in all fields!!!');
    }
  }

  editPost(post: IPostResponse): void {
    this.postTitle = post.title;
    this.postDescription = post.description;
    this.postAuthor = post.author;
    this.currentId = post.id;
    this.editActive = true;
  }
  savePost(): void {
    if (this.postTitle && this.postDescription && this.postAuthor){
      const updatePost = {
        title: this.postTitle,
        description: this.postDescription,
        author: this.postAuthor
      };
      this.postService.update(updatePost, this.currentId).subscribe(() => {
        this.getPosts();
        this.resetForm();
        this.editActive = false;
      })
    }
    else{
      alert('Please fill in all fields!!!');
    }
    
  }

  deletePost(post: IPostResponse): void {
    this.postService.delete(post.id).subscribe(() => {
      this.getPosts();
    })
  }

  resetForm(): void{
    this.postTitle = '';
    this.postDescription = '';
    this.postAuthor = '';
  }
}
