import { Component, OnInit } from '@angular/core';
import { NotificationsService } from '../../../notifications/services/notifications.service';
import { DashComment } from '../../models/dash-comment';
import { DashCommentService } from '../../services/dash-comment.service';

@Component({
  selector: 'app-dash-comments',
  templateUrl: './dash-comments.component.html',
  styleUrls: ['./dash-comments.component.css']
})
export class DashCommentsComponent implements OnInit {
  comments:DashComment[] = [];

  constructor(
    private commentService:DashCommentService,
    private notificationService:NotificationsService
  ) { }

  ngOnInit(): void {
    this.commentService.getComments().subscribe({
      next:response => {
        this.comments = [...response];
      },
      error:err => {
        let message = 'Error getting folders';
          this.notificationService.displayErrorSnackBar(message,err);
      }
    });
  }

}
