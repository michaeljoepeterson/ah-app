import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { FileItem } from '../../../models/file-item';
import { FolderItem } from '../../../models/folder-item';

@Component({
  selector: 'app-folder-card',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './folder-card.component.html',
  styleUrls: ['./folder-card.component.css']
})
export class FolderCardComponent implements OnInit {
  @Input() item:(FolderItem|FileItem);
  statuses:string[] = ['Scan Taken','Approved','Production'];
  itemStatsues:string[] = [];

  constructor() { }

  ngOnInit(): void {
    this.itemStatsues = this.item.getStatuses();
  }

}
