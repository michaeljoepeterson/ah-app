import { Component, OnInit, Input, ChangeDetectionStrategy, SimpleChanges, ChangeDetectorRef } from '@angular/core';
import { FieldTypes,fieldTypes } from '../../constants';
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

  fieldTypes:FieldTypes;

  constructor(
    private formService:FormService,
    //private ref:ChangeDetectorRef
  ) { 
    this.fieldTypes = this.formService.fieldTypes;
  }

  ngOnInit(): void {
    if(!this.fieldValue){
      this.fieldValue = new CustomFieldValue({
        customFieldId:this.field.id,
        customField:this.field
      });
    }
  }

}
