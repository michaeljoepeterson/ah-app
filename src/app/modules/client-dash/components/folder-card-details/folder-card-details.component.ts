import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { PatientFile } from '../../models/patient-file';
import { FolderItem } from '../../models/folder-item';
import { FolderNavService } from '../../services/folder-nav.service';

@Component({
  selector: 'app-folder-card-details',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './folder-card-details.component.html',
  styleUrls: ['./folder-card-details.component.css']
})
export class FolderCardDetailsComponent implements OnInit {
  subs:Subscription[] = [];
  selectedItem:(FolderItem|PatientFile);
  selectedFolder:FolderItem;

  constructor(
    private ref:ChangeDetectorRef,
    private folderNavService:FolderNavService
  ) { }

  ngOnInit(): void {
    let itemSub = this.folderNavService.selectedItem.subscribe(item => {
      this.selectedItem = item;
      this.ref.markForCheck();
    });

    this.subs = [itemSub];
  }

  ngOnDestroy(){
    try{
      this.subs.forEach(sub => sub.unsubscribe());
    }
    catch(e){
      console.warn('Error cleaning up folder details:',e)
    }
  }
}
