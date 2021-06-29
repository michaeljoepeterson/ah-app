import { Component, Input, OnInit } from '@angular/core';
import { FolderItem } from '../../../../models/folder-item';

/**
 * wrapper to handle folder data, it renders folder nav items which handle rendering either a folder or file
 */
@Component({
  selector: 'app-folder-nav-list',
  templateUrl: './folder-nav-list.component.html',
  styleUrls: ['./folder-nav-list.component.css']
})
export class FolderNavListComponent implements OnInit {
  @Input() folders:FolderItem[];

  constructor() { }

  ngOnInit(): void {
  }

}
