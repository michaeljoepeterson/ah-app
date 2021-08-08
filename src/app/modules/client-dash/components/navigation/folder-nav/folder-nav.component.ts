import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { NotificationsService } from '../../../../notifications/services/notifications.service';
import { AuthService } from '../../../../../services/auth.service';
import { FolderItem, folderType } from '../../../models/folder-item';
import { FolderNavService } from '../../../services/folder-nav.service';
import { MenuItem } from 'primeng/api';
import { User } from '../../../../../models/users/user';

/**
 * wrapper to handle the side navbar component 
 * grabs initial data from service and hands that data to the folder nav list
 */
@Component({
  selector: 'app-folder-nav',
  //changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './folder-nav.component.html',
  styleUrls: ['./folder-nav.component.css']
})
export class FolderNavComponent implements OnInit {
  user:User;
  folders:FolderItem[];
  subscriptions:Subscription[] = [];
  generalSub:Subscription;
  menuItems:MenuItem[] = [];
  isLoggedIn:boolean = false;

  constructor(
    private authService:AuthService,
    private folderService:FolderNavService,
    private ref:ChangeDetectorRef,
    private notificationService:NotificationsService
  ) { }

  ngOnInit(): void {
    /*
    let sub = this.authService.authInfo.subscribe(auth => {
      let user = auth ? auth.email : null;
      if(user){
        this.user = auth.user;
        this.getUserFolders();
      }
    });
    */

    let sub = this.authService.isLoggedIn.subscribe(loggedIn => {
      if(loggedIn){
        this.isLoggedIn = true;
        let {user} = this.authService.getAuthInfo();
        this.user = user;
        this.getUserFolders();
      }
    })

    let folderSub = this.folderService.currentFolders.subscribe(folders => {
      if(folders){
        this.folders = [...folders];
      }
      else{
        this.folders = [];
      }
      this.ref.markForCheck();
    });

    this.subscriptions = [sub,folderSub];
  }

  getUserFolders(){
    if(this.user){
      if(this.generalSub){
        this.generalSub.unsubscribe();
      }
      this.generalSub = this.folderService.getFolderData(this.user.id).subscribe({
        next:response => {
          //this.folders = response;
          console.log('folder',this.folders);
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
