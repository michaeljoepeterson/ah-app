import { Component, OnInit } from '@angular/core';
import { FolderItem } from 'src/app/modules/client-dash/models/folder-item';

@Component({
  selector: 'app-folder-nav-list',
  templateUrl: './folder-nav-list.component.html',
  styleUrls: ['./folder-nav-list.component.css']
})
export class FolderNavListComponent implements OnInit {
  folders:FolderItem[];

  constructor() { }

  ngOnInit(): void {
  }

}
