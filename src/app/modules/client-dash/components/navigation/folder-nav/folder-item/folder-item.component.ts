import { Component, Input, OnInit } from '@angular/core';
import { FolderItem } from '../../../../models/folder-item';

@Component({
  selector: 'app-folder-item',
  templateUrl: './folder-item.component.html',
  styleUrls: ['./folder-item.component.css']
})
export class FolderItemComponent implements OnInit {
  @Input() folder:FolderItem;
  /**
   * received child item spacing for child items and base folder
   */
  @Input() folderSpace:number = 0;
  /**
   * increment child spacing to imply folder structure
   */
  baseChildIncrement:number = 2;
  childAdjustedSpacing:number;

  constructor() { }

  ngOnInit(): void {
    this.childAdjustedSpacing = this.folderSpace + this.baseChildIncrement; 
  }

}
