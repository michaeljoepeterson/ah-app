import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { CustomField } from '../../models/custom-field';
import { FieldTypes, fieldTypes } from '../../constants';
import { FormService } from '../../services/form.service';

@Component({
  selector: 'app-edit-field',
  changeDetection:ChangeDetectionStrategy.OnPush,
  templateUrl: './edit-field.component.html',
  styleUrls: ['./edit-field.component.css']
})
export class EditFieldComponent implements OnInit {
  @Input() field:CustomField;

  fieldTypes:FieldTypes;
  mouseOver:boolean = false;
  editMode:boolean = false;
  currentField:CustomField;
  newOption:string;
  isNew:boolean = false;

  constructor(
    private formService:FormService,
    private ref:ChangeDetectorRef
  ) { 
    this.fieldTypes = this.formService.fieldTypes;
  }

  ngOnInit(): void {
    this.currentField = new CustomField(this.field);
    if(!this.field.id){
      this.editMode = true;
      this.isNew = true;
    }
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
    this.currentField.updateField(this.field);
    this.newOption = '';
    this.setEditing(false);
    if(this.isNew){
      this.formService.updateNewField(false);
    }
  }

  onConfirmClicked(){
    this.field.updateField(this.currentField);
    this.newOption = '';
    this.setEditing(false);
    if(this.isNew){
      this.formService.updateNewField(true);
      //temp until new id from server
      this.field.id = 'test' + new Date().valueOf();
    }
  }

  removeOption(option:string){
    this.currentField.fieldOptions = this.currentField.fieldOptions.filter(optionValue => option !== optionValue);
    this.ref.detectChanges();
  }

  addOption(){
    this.currentField.fieldOptions.push(this.newOption);
    this.newOption = '';
  }
}
