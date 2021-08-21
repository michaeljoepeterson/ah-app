import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { PatientFile } from '../../../models/patient-file';
import { FolderItem } from '../../../models/folder-item';
import { FolderNavService } from '../../../services/folder-nav.service';

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

  constructor(
    private folderNavService:FolderNavService
  ) { }

  ngOnInit(): void {
    this.itemStatsues = this.item.getStatuses();
  }

  selectItem(){
    this.folderNavService.selectItem(this.item);
  }
}
