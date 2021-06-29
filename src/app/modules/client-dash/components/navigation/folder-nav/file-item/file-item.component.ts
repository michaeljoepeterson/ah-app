import { Component, Input, OnInit } from '@angular/core';
import { FileItem } from '../../../../models/file-item';

@Component({
  selector: 'app-file-item',
  templateUrl: './file-item.component.html',
  styleUrls: ['./file-item.component.css']
})
export class FileItemComponent implements OnInit {
  @Input() file:FileItem;

  constructor() { }

  ngOnInit(): void {
  }

}
