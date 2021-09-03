import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { fieldTypes, FieldTypes } from 'src/app/modules/custom-forms/constants';
import { CustomField } from 'src/app/modules/custom-forms/models/custom-field';
import { CustomFieldValue } from '../../../custom-forms/models/custom-field-value';
import { PatientFileService } from '../../services/patient-file.service';

@Component({
  selector: 'app-patient-custom-value',
  changeDetection:ChangeDetectionStrategy.OnPush,
  templateUrl: './patient-custom-value.component.html',
  styleUrls: ['./patient-custom-value.component.css']
})
export class PatientCustomValueComponent implements OnInit {
  @Input() field:CustomField;
  @Input() fieldValue:CustomFieldValue = null;
  subs:Subscription[];
  value:any;
  arrayValue:any[];
  fieldTypes:FieldTypes = fieldTypes;
  
  constructor(
    private patientFileService:PatientFileService
  ) { }

  ngOnInit(): void {
    let patientSub = this.patientFileService.currentCustomValues.subscribe(values => {
      if(values){
        this.fieldValue = this.patientFileService.findValue(this.field);
        if(this.fieldValue){
          this.initValue();
        }
      }
    });

    this.subs = [patientSub];
  }

  ngOnDestroy(){
    try{
      this.subs.forEach(sub => sub.unsubscribe());
    }
    catch(e){
      console.warn(e);
    }
  }

  initValue(){
    if(this.fieldValue.fieldType === this.fieldTypes.date){
      this.value = new Date(this.fieldValue.value.dateValue);
    }
    else if(this.fieldValue.fieldType === this.fieldTypes.dropdown || this.fieldValue.fieldType === this.fieldTypes.radio || this.fieldValue.fieldType === this.fieldTypes.text){
      this.value = this.fieldValue.value.stringValue;
    }
    else if(this.fieldValue.fieldType === this.fieldTypes.checkbox){
      this.arrayValue = this.fieldValue.value.arrayValue;
    }
    else if(this.fieldValue.fieldType === this.fieldTypes.image || this.fieldValue.fieldType === this.fieldTypes.file){
      this.value = this.fieldValue.value.filePath;
    }
    else if(this.fieldValue.fieldType === this.fieldTypes.number){
      this.value = this.fieldValue.value.numberValue;
    }
  }
}
