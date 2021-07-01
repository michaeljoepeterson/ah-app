import { Component, Input, OnInit } from '@angular/core';
import { DashComment } from '../../../models/dash-comment';

@Component({
  selector: 'app-dash-comment',
  templateUrl: './dash-comment.component.html',
  styleUrls: ['./dash-comment.component.css']
})
export class DashCommentComponent implements OnInit {
  @Input() comment:DashComment;

  constructor() { }

  ngOnInit(): void {
  }

}
