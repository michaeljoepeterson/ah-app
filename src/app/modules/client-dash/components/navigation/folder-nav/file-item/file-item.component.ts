import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { FileItem } from '../../../../models/file-item';

@Component({
  selector: 'app-file-item',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './file-item.component.html',
  styleUrls: ['./file-item.component.css']
})
export class FileItemComponent implements OnInit {
  @Input() file:FileItem;
  @Input() folderSpace:number = 0;

  constructor(
    private ref:ChangeDetectorRef
  ) { }

  ngOnInit(): void {
  }

}
