import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { PatientFile } from '../../../models/patient-file';
import { FolderItem } from '../../../models/folder-item';
import { FolderNavService } from '../../../services/folder-nav.service';
import { PatientFileService } from '../../../../patient-file/services/patient-file.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-folder-card',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './folder-card.component.html',
  styleUrls: ['./folder-card.component.css']
})
export class FolderCardComponent implements OnInit {
  @Input() item:(FolderItem|PatientFile);
  statuses:string[] = ['Scan Taken','Approved','Production'];
  itemStatsues:string[] = [];
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
    private folderNavService:FolderNavService,
    private patientFileService:PatientFileService
  ) { }

  ngOnInit(): void {
    this.itemStatsues = this.item.getStatuses();
  }

  selectItem(){
    this.folderNavService.selectItem(this.item);
    if(this.item instanceof PatientFile){
      this.sub = this.patientFileService.getFileData(this.item).subscribe({
        next:res => {
          return res;
        }
      });
    }
  }
}
