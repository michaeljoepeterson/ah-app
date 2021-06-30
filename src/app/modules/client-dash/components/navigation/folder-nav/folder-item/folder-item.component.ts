import { animate, style, transition, trigger } from '@angular/animations';
import { Component, Input, OnInit } from '@angular/core';
import { FileItem } from '../../../../models/file-item';
import { FolderItem } from '../../../../models/folder-item';

@Component({
  selector: 'app-folder-item',
  templateUrl: './folder-item.component.html',
  styleUrls: ['./folder-item.component.css'],
  animations: [
    trigger(
      'enterAnimation', [
        // state('in', style({
        //   overflow: 'hidden',
        //   height: '*',
        //   width: '300px'
        // })),
        // state('out', style({
        //   opacity: '0',
        //   overflow: 'hidden',
        //   height: '0px',
        //   width: '0px'
        // })),
        // transition('in => out', animate('400ms ease-in-out')),
        // transition('out => in', animate('400ms ease-in-out'))
        /*
        transition(':enter', [
          style({transform: 'translateY(100%)', opacity: 0}),
          animate('500ms', style({transform: 'translateY(0)', opacity: 1})),
        ]),
        transition(':leave', [
          style({transform: 'translateY(0)', opacity: 1}),
          animate('500ms', style({transform: 'translateY(100%)', opacity: 0}))
        ])
        */
        transition(':enter', [
          style({
            
            overflow: 'hidden',
            height: '0px',
          }),
          animate('400ms ease-in-out', style({
            overflow: 'hidden',
            height: '*',
          })),
        ]),
        transition(':leave', [
          style({
            overflow: 'hidden',
            height: '*',
          }),
          animate('400ms ease-in-out', style({
            
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
  expandedState:string = 'out'

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

  expandFolder(){
    console.log(this.folder);
    this.folderExpanded = !this.folderExpanded;
  }
}
