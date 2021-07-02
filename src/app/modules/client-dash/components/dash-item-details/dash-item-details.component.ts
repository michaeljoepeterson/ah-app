import { Component, Input, OnInit } from '@angular/core';
import { FileItem } from '../../models/file-item';
import { FolderItem } from '../../models/folder-item';

@Component({
  selector: 'app-dash-item-details',
  templateUrl: './dash-item-details.component.html',
  styleUrls: ['./dash-item-details.component.css']
})
export class DashItemDetailsComponent implements OnInit {
  @Input() item:(FolderItem|FileItem);

  constructor() { }

  ngOnInit(): void {
  }

}
