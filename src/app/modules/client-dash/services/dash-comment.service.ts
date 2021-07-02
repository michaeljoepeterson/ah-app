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
        user:'Bill Johnson',
        content:'Please look over the files for our first patient.'
      },
      {
        user:'Amber Smith',
        content:'Looks good!'
      },
      {
        user:'Sam Stevenson',
        content:'I think we need to go over the first drafts again.'
      }
    ];
    let comments = commentData.map(comment => new DashComment(comment));
    return of(comments);
  }
}
