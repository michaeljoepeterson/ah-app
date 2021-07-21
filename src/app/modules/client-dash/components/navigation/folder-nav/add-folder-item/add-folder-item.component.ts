import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-folder-item',
  templateUrl: './add-folder-item.component.html',
  styleUrls: ['./add-folder-item.component.css']
})
export class AddFolderItemComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  /**
   * handle when input loses focus and stop editing folder
   */
  focusRemoved(){

  }
}
