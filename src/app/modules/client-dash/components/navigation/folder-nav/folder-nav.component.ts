import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../../../../../services/auth.service';
import { FolderItem } from '../../../models/folder-item';
import { FolderNavService } from '../../../services/folder-nav.service';

@Component({
  selector: 'app-folder-nav',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './folder-nav.component.html',
  styleUrls: ['./folder-nav.component.css']
})
export class FolderNavComponent implements OnInit {
  user:string;
  folders:FolderItem[] = [];
  subscriptions:Subscription[] = [];

  constructor(
    private authService:AuthService,
    private folderService:FolderNavService,
    private ref:ChangeDetectorRef
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
      this.folderService.getUserFolders(this.user).subscribe({
        next:response => {
          this.folders = response;
          console.log('folder',this.folders);
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
