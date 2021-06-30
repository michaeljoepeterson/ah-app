import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Tag } from '../models/tag';

@Injectable({
  providedIn: 'root'
})
export class TagService {

  constructor() { }

  getTags():Observable<Tag[]>{
    let tagNames = ['tag 1','some tag','my tag'];
    let tags = tagNames.map(name => {
      let tag = new Tag();
      tag.name = name;
      return tag;
    });

    return of(tags);
  }
}
