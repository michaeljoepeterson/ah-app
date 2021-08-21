import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { CustomField } from '../../models/custom-field';
import { FieldTypes, fieldTypes } from '../../constants';
import { FormService } from '../../services/form.service';
import { Subscription } from 'rxjs';

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

  private _sub:Subscription;
  get sub():Subscription{
    return this._sub;
  }

  set sub(subscription:Subscription){
    if(this._sub){
      this._sub.unsubscribe();
    }
    this._sub = subscription;
  }

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
      this.createNewField();
    }
    else{
      this.updateField();
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

  createNewField(){
    this.sub = this.formService.createNewField(this.field).subscribe({
      next:res => {
        if(!this.field.id){
          this.field.id = res.id;
        }
      }
    })
  }

  updateField(){
    this.sub = this.formService.updateField(this.field).subscribe({
      next:res => {
        return res;
      }
    })
  }
}
