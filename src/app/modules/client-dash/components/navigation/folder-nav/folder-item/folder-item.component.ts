import { animate, style, transition, trigger } from '@angular/animations';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { FileItem } from '../../../../models/file-item';
import { FolderItem } from '../../../../models/folder-item';

@Component({
  selector: 'app-folder-item',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './folder-item.component.html',
  styleUrls: ['./folder-item.component.css'],
  animations: [
    trigger(
      'enterAnimation', [
        transition(':enter', [
          style({
            
            overflow: 'hidden',
            height: '0px',
          }),
          animate('300ms ease-in-out', style({
            overflow: 'hidden',
            height: '*',
          })),
        ]),
        transition(':leave', [
          style({
            overflow: 'hidden',
            height: '*',
          }),
          animate('300ms ease-in-out', style({
            
            overflow: 'hidden',
            height: '0px',
          }))
        ])
      ]
    )
  ]
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
  @Input() folderExpanded:boolean = false;
  baseChildIncrement:number = 6;
  childAdjustedSpacing:number;
  combinedItems:any[] = [];
  folderCount:number = 0;

  constructor(
    private ref:ChangeDetectorRef
  ) { }

  ngOnInit(): void {   
    if(this.folder.customSort){
      this.initCustomOrder();
    }
  }

  ngOnChanges(changes:SimpleChanges){
    if(changes.folder && changes.folder.currentValue){
      this.getFolderCount();
      this.childAdjustedSpacing = this.folderSpace + this.baseChildIncrement;
    }
  }

  getFolderCount(){
    this.folderCount = this.folder.files.length + this.folder.subFolders.length;
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

  expandFolder(){
    console.log(this.folder);
    this.folderExpanded = !this.folderExpanded;
  }
}
