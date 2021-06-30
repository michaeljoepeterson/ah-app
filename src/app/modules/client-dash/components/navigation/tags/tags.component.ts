import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { NotificationsService } from '../../../../notifications/services/notifications.service';
import { Tag } from '../../../models/tag';
import { TagService } from '../../../services/tag.service';

@Component({
  selector: 'app-tags',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.css']
})
export class TagsComponent implements OnInit {
  @Input() tags:Tag[] = [];

  constructor(
    private tagService:TagService,
    private notificationService:NotificationsService
  ) { }

  ngOnInit(): void {
    if(this.tags.length === 0){
      this.tagService.getTags().subscribe({
        next:response => {
          this.tags = [...response];
        },
        error:err => {
          let message = 'Error getting folders';
          this.notificationService.displayErrorSnackBar(message,err);
        }
      });
    }
  }

}
