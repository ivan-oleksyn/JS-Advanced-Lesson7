import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { IPostRequest, IPostResponse } from '../interfaces/post.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
  export class PostService {

    private url = environment.BACKEND_URL;
    private api = { posts: `${this.url}/posts`};

constructor(private http: HttpClient) { }

  getAll(): Observable<IPostResponse[]>{
    return this.http.get<IPostResponse[]>(this.api.posts);
  }

  create(post: IPostRequest): Observable<IPostResponse>{
    return this.http.post<IPostResponse>(this.api.posts, post);
  }

  update(post: IPostRequest, id: number): Observable<IPostResponse>{
    return this.http.patch<IPostResponse>(`${this.api.posts}/${id}`, post);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.api.posts}/${id}`);
  }
}
