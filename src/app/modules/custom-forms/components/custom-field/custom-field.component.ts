import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { forkJoin, Subscription } from 'rxjs';
import { FieldTypes } from '../../constants';
import { CustomField } from '../../models/custom-field';
import { CustomFieldValue } from '../../models/custom-field-value';
import { FormService } from '../../services/form.service';

@Component({
  selector: 'app-custom-field',
  //changeDetection:ChangeDetectionStrategy.OnPush,
  templateUrl: './custom-field.component.html',
  styleUrls: ['./custom-field.component.css']
})
export class CustomFieldComponent implements OnInit {
  @Input() field:CustomField;
  @Input() fieldValue:CustomFieldValue = null;
  @Input() fieldType:string;

  fieldTypes:FieldTypes;
  valueControl = new FormControl();
  subs:Subscription[] = [];

  constructor(
    private formService:FormService,
    //private ref:ChangeDetectorRef
  ) { 
    this.fieldTypes = this.formService.fieldTypes;
  }

  ngOnInit(): void {
    this.initFieldValue();
    this.registerCustomFieldValue();
    let sub = this.valueControl.valueChanges.subscribe(val => {
      this.valueChanged(val);
    });
    
    this.subs.push(sub);
  }

  ngOnDestroy(){
    try{
      this.subs.forEach(s => s.unsubscribe());
    }
    catch(e){
      console.warn(e);
    }
  }

  ngOnChanges(changes:SimpleChanges){
    if(changes?.fieldType?.currentValue){
      this.handleTypeChange();
    }
  }

  registerCustomFieldValue(){
    this.formService.addCustomFieldValue(this.fieldValue);
  }

  initFieldValue(){
    if(!this.fieldValue){
      this.fieldValue = new CustomFieldValue(this.field);
    }
  }

  /**
   * handle type changes when editing fields
   */
  handleTypeChange(){
    this.initFieldValue();
    this.fieldValue.fieldType = this.fieldType;
    if(this.fieldType === this.fieldTypes.checkbox){
      this.fieldValue.initCheckboxValues();
    }

    if(this.fieldType === this.fieldTypes.date){
      this.fieldValue.initDate();
    }
  }

  onFileSelected(event:any){
    console.log(event);
  }

  valueChanged(value:any){
    this.fieldValue.setValue(value);
    this.formService.updateCustomFieldValue(this.fieldValue);
  }

  checkboxChanged(event:MatCheckboxChange,index:number){
    let {checked} = event;
    this.fieldValue.setArrayValue(checked,index);
    this.formService.updateCustomFieldValue(this.fieldValue);
  }
}
