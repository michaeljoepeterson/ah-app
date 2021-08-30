import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatMenuTrigger } from '@angular/material/menu';

@Component({
  selector: 'app-form-edit-controls',
  templateUrl: './form-edit-controls.component.html',
  styleUrls: ['./form-edit-controls.component.css']
})
export class FormEditControlsComponent implements OnInit {
  @ViewChild('menuTrigger') menuTrigger:MatMenuTrigger
  @Input() hidden:boolean = true;
  @Input() editTooltip:string = 'Edit Field';
  @Input() addTooltip:string = 'Add a New Section or Field';
  @Input() hideAddButton:boolean = false;

  @Output() editModeUpdated = new EventEmitter();
  @Output() addNewSection = new EventEmitter();
  @Output() addNewField = new EventEmitter();

  editMode:boolean = false;
  menuOpen:boolean = false;

  constructor() { }

  ngOnInit(): void {

  }

  setEditing(edit:boolean){
    this.editMode = edit;
    this.editModeUpdated.emit(this.editMode);
  }

  menuOpened(){

    this.menuOpen = false;
  }

  menuClosed(){
    this.menuOpen = true;
  }

  onAddNewSection(){
    this.addNewSection.emit();
  }

  onAddNewField(){
    this.addNewField.emit();
  }
}
