import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { FolderItem } from '../../../../models/folder-item';

/**
 * wrapper to handle folder data, it renders folder nav items which handle rendering either a folder or file
 */
@Component({
  selector: 'app-folder-nav-list',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './folder-nav-list.component.html',
  styleUrls: ['./folder-nav-list.component.css']
})
export class FolderNavListComponent implements OnInit {
  @Input() folders:FolderItem[];
  /**
   * used to space out folders and imply folder structure
   */
  @Input() leftSpacing:number = 0;

  constructor(
    private ref:ChangeDetectorRef
  ) { }

  ngOnInit(): void {
  }

}
