import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { DashComment } from '../models/dash-comment';

@Injectable({
  providedIn: 'root'
})
export class DashCommentService {

  constructor() { }

  getComments():Observable<DashComment[]>{
    let commentData = [
      {
        user:'user 1',
        content:'Here is my first comment'
      },
      {
        user:'user 2',
        content:'Here is my second comment'
      },
      {
        user:'user 3',
        content:'Here is my third comment'
      }
    ];
    let comments = commentData.map(comment => new DashComment(comment));
    return of(comments);
  }
}
