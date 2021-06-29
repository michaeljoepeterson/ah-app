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

  constructor() { }

  ngOnInit(): void {
    
  }

}
