import { animate, style, transition, trigger } from '@angular/animations';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { FolderNavService } from '../../../../services/folder-nav.service';
import { FileItem } from '../../../../models/file-item';
import { FolderItem } from '../../../../models/folder-item';
import { Subscription } from 'rxjs';

/**
 * represent a folder nav item
 */
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
  baseChildIncrement:number = 2;
  childAdjustedSpacing:number;
  combinedItems:any[] = [];
  folderCount:number = 0;
  isSelected:boolean = false;
  editFolder:FolderItem;
  subscriptions:Subscription[] = [];

  constructor(
    private ref:ChangeDetectorRef,
    private folderNavService:FolderNavService
  ) { }

  ngOnInit(): void {
    let sub = this.folderNavService.selectedFolder.subscribe(folder => {
      if(folder && folder.id === this.folder.id){
        this.isSelected = true;
      }
      else{
        this.isSelected = false;
      }
      this.ref.markForCheck();
    });
    let editSub = this.folderNavService.editFolder.subscribe(folder => {
      this.editFolder = folder;
    });

    let currentFolderSub = this.folderNavService.currentFolders.subscribe(folders => {
      this.getFolderCount();
      this.ref.markForCheck();
    })

    if(this.folder.customSort){
      this.initCustomOrder();
    }
    this.subscriptions = [sub,editSub,currentFolderSub];
  }

  ngOnChanges(changes:SimpleChanges){
    if(changes.folder && changes.folder.currentValue){
      this.getFolderCount();
      this.childAdjustedSpacing = this.folderSpace + this.baseChildIncrement;
    }
  }

  ngOnDestroy(){
    try{
      this.subscriptions.forEach(sub => sub.unsubscribe());
    }
    catch(e){
      console.warn(e);
    }
  }

  /**
   * get folder count for right numbers
   */
  getFolderCount(){
    this.folderCount = this.folder.files.length + this.folder.subFolders.length;
  }

  /**
   * handle custom ordering for items
   * not fully implemented
   */
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

  /**
   * expand a selected folder
   */
  expandFolder(){
    this.folderExpanded = !this.folderExpanded;
    this.folderNavService.selectFolder(this.folder);
    this.folderNavService.selectItem(this.folder);
    this.folderNavService.setEditFolder(null);
  }
}
