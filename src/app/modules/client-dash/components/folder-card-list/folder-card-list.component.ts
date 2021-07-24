import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { FileItem } from '../../models/file-item';
import { FolderItem } from '../../models/folder-item';
import { FolderNavService } from '../../services/folder-nav.service';

@Component({
  selector: 'app-folder-card-list',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './folder-card-list.component.html',
  styleUrls: ['./folder-card-list.component.css']
})
export class FolderCardListComponent implements OnInit {
  subscriptions:Subscription[];
  @Input() folder:FolderItem;
  folderItems:(FolderItem|FileItem)[] = [];

  constructor(
    private ref:ChangeDetectorRef,
    private folderNavService:FolderNavService
  ) { }

  ngOnInit(): void {
    let folderSub = this.folderNavService.selectedFolder.subscribe(folder => {
      if(folder){
        this.folder = folder;
        this.folderItems = this.folder.flattenItems();
        this.ref.markForCheck();
      }
    });

    let foldersSub = this.folderNavService.currentFolders.subscribe(folders =>{
      if(folders && this.folder){
        this.folder = this.folderNavService.findFolder(folders,this.folder.id);
        this.folderItems = this.folder ? this.folder.flattenItems() : [];
      }
      this.ref.markForCheck();
    });
    this.subscriptions = [folderSub,foldersSub];
  }

  ngOnDestroy(){
    try{
      this.subscriptions.forEach(sub => sub.unsubscribe());
    }
    catch(e){
      console.warn(e);
    }
  }
}
