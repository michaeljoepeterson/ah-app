import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { CustomField } from '../../models/custom-field';
import { FieldTypes, fieldTypes } from '../../constants';

@Component({
  selector: 'app-edit-field',
  changeDetection:ChangeDetectionStrategy.OnPush,
  templateUrl: './edit-field.component.html',
  styleUrls: ['./edit-field.component.css']
})
export class EditFieldComponent implements OnInit {
  @Input() field:CustomField;

  fieldTypes:FieldTypes = fieldTypes;
  mouseOver:boolean = false;
  editMode:boolean = false;
  currentField:CustomField;

  constructor() { }

  ngOnInit(): void {
    console.log(fieldTypes);
    this.currentField = new CustomField(this.field);
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

  typeChange(){

  }

  onCancelClicked(){
    this.setEditing(false);
    this.currentField.updateField(this.field);
  }

  onConfirmClicked(){
    this.field.updateField(this.currentField);
  }
}
