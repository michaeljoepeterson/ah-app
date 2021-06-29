import { Component, Input, OnInit } from '@angular/core';
import { FileItem } from '../../../../models/file-item';
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
  baseChildIncrement:number = 6;
  childAdjustedSpacing:number;
  combinedItems:any[] = []

  constructor() { }

  ngOnInit(): void {
    this.childAdjustedSpacing = this.folderSpace + this.baseChildIncrement; 
    if(this.folder.customSort){
      this.initCustomOrder();
    }
  }

  initCustomOrder(){
    let length = this.folder.files.length + this.folder.subFolders.length;
    for(let i = 0;i < length;i++){
      this.combinedItems.push({});
    }
    this.folder.files.forEach(file => {
      let {sortOrder} = file;
      this.combinedItems[sortOrder] = new FileItem(file);
    });
    this.folder.subFolders.forEach(folder => {
      let {sortOrder} = folder;
      this.combinedItems[sortOrder] = new FolderItem(folder);
    });
  }
}
