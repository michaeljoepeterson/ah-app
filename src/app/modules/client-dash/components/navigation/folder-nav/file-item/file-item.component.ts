import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { FolderNavService } from '../../../../services/folder-nav.service';
import { PatientFile } from '../../../../models/patient-file';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-file-item',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './file-item.component.html',
  styleUrls: ['./file-item.component.css']
})
export class FileItemComponent implements OnInit {
  @Input() file:PatientFile;
  @Input() folderSpace:number = 0;
  subscriptions:Subscription[] = [];
  isSelected:boolean = false;

  constructor(
    private ref:ChangeDetectorRef,
    private folderService:FolderNavService
  ) { }

  ngOnInit(): void {
    let sub = this.folderService.selectedItem.subscribe(item => {
      if(item && item.id === this.file.id){
        this.isSelected = true;
      }
      else{
        this.isSelected = false;
      }
      this.ref.markForCheck();
    });

    let currentFolderSub = this.folderService.currentFolders.subscribe(folders => {
      this.ref.markForCheck();
    })

    this.subscriptions = [sub,currentFolderSub];
  }

  /**
   * select the file
   */
  selectFile(){
    this.folderService.selectItem(this.file);
    this.folderService.selectFolder(null);
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
