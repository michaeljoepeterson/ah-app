import { Component, OnInit,Input } from '@angular/core';
import { fileType,FileItem } from '../../../../models/file-item';
import { folderType,FolderItem } from '../../../../models/folder-item';

/**
 * receives folder item and renders either a folder item or file item 
 */
@Component({
  selector: 'app-folder-nav-item',
  templateUrl: './folder-nav-item.component.html',
  styleUrls: ['./folder-nav-item.component.css']
})
export class FolderNavItemComponent implements OnInit {
  @Input() item:(FolderItem|FolderItem);
  fileType:string = fileType;
  foldertype:string = folderType;

  constructor() { }

  ngOnInit(): void {
  }

}