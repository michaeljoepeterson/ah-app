import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
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
  @Input() fieldValue:CustomFieldValue;
  @Input() fieldType:string;

  fieldTypes:FieldTypes;

  constructor(
    private formService:FormService,
    //private ref:ChangeDetectorRef
  ) { 
    this.fieldTypes = this.formService.fieldTypes;
  }

  ngOnInit(): void {
    if(!this.fieldValue){
      this.initValue();
    }
  }

  ngOnChanges(changes:SimpleChanges){
    if(changes?.fieldType?.currentValue){
      this.initValue();
    }
  }

  initValue(){
    this.fieldValue = new CustomFieldValue({
      customFieldId:this.field.id,
      customField:this.field
    });
    if(this.fieldType === this.fieldTypes.checkbox){
      this.fieldValue.initCheckboxValues();
    }
  }
}
