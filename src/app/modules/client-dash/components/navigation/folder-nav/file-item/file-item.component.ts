import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { FolderNavService } from '../../../../services/folder-nav.service';
import { PatientFile } from '../../../../models/patient-file';
import { Subscription } from 'rxjs';
import { PatientFileService } from '../../../../../patient-file/services/patient-file.service';

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
  private _sub:Subscription;
  get sub():Subscription{
    return this._sub;
  }

  set sub(subscription:Subscription){
    if(this._sub){
      this._sub.unsubscribe();
    }
    this._sub = subscription;
  }

  constructor(
    private ref:ChangeDetectorRef,
    private folderService:FolderNavService,
    private patientFileService:PatientFileService
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
    this.sub = this.patientFileService.getFileData(this.file).subscribe({
      next:res => {
        return res;
      }
    });
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
