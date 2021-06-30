import { Component, OnInit,Input, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { fileType,FileItem } from '../../../../models/file-item';
import { folderType,FolderItem } from '../../../../models/folder-item';

/**
 * receives folder item and renders either a folder item or file item 
 */
@Component({
  selector: 'app-folder-nav-item',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './folder-nav-item.component.html',
  styleUrls: ['./folder-nav-item.component.css']
})
export class FolderNavItemComponent implements OnInit {
  @Input() item:(FolderItem|FolderItem);
  @Input() folderSpace:number = 0;
  fileType:string = fileType;
  foldertype:string = folderType;

  constructor(
    private ref:ChangeDetectorRef
  ) { }

  ngOnInit(): void {
  }

}
