import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { NotificationsService } from '../../../../notifications/services/notifications.service';
import { AuthService } from '../../../../../services/auth.service';
import { FolderItem } from '../../../models/folder-item';
import { FolderNavService } from '../../../services/folder-nav.service';

/**
 * wrapper to handle the side navbar component 
 * grabs initial data from service and hands that data to the folder nav list
 */
@Component({
  selector: 'app-folder-nav',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './folder-nav.component.html',
  styleUrls: ['./folder-nav.component.css']
})
export class FolderNavComponent implements OnInit {
  user:string;
  folders:FolderItem[];
  subscriptions:Subscription[] = [];
  generalSub:Subscription;

  constructor(
    private authService:AuthService,
    private folderService:FolderNavService,
    private ref:ChangeDetectorRef,
    private notificationService:NotificationsService
  ) { }

  ngOnInit(): void {
    let sub = this.authService.authInfo.subscribe(auth => {
      let email = auth ? auth.email : null;
      if(email){
        this.user = email;
        this.getUserFolders();
      }
    });

    this.subscriptions.push(sub);
  }

  getUserFolders(){
    if(this.user){
      if(this.generalSub){
        this.generalSub.unsubscribe();
      }
      this.generalSub = this.folderService.getUserFolders(this.user).subscribe({
        next:response => {
          this.folders = response;
          console.log('folder',this.folders);
          this.ref.markForCheck();
        },
        error:err => {
          let message = 'Error getting folders';
          this.notificationService.displayErrorSnackBar(message,err);
        },
        complete:() => {
          this.ref.markForCheck();
        }
      })
    }
  }

  ngOnDestroy(){
    try{
      this.subscriptions.forEach(sub => sub.unsubscribe());
    }
    catch(e){
      console.warn('Error cleainng up folders:',e);
    }
  }
}
