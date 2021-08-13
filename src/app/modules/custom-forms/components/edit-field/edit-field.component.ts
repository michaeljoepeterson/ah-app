import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { CustomField } from '../../models/custom-field';

@Component({
  selector: 'app-edit-field',
  changeDetection:ChangeDetectionStrategy.OnPush,
  templateUrl: './edit-field.component.html',
  styleUrls: ['./edit-field.component.css']
})
export class EditFieldComponent implements OnInit {
  @Input() field:CustomField;

  mouseOver:boolean = false;
  editMode:boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  mouseOverField(){
    this.mouseOver = true;
  }

  mouseLeaveField(){
    this.mouseOver = false;
  }

  setEditing(edit:boolean){
    this.editMode = edit;
  }
}
