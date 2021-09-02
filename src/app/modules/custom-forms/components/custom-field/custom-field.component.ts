import { Component, OnInit, Input, SimpleChanges, ChangeDetectorRef } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { forkJoin, Subscription } from 'rxjs';
import { PatientFileService } from '../../../patient-file/services/patient-file.service';
import { PatientFile } from '../../../client-dash/models/patient-file';
import { FieldTypes } from '../../constants';
import { CustomField } from '../../models/custom-field';
import { CustomFieldValue } from '../../models/custom-field-value';
import { FormService } from '../../services/form.service';
import { UploadService } from 'src/app/services/upload.service';

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


  fieldTypes:FieldTypes;
  valueControl = new FormControl();
  subs:Subscription[] = [];
  selectedPatient:PatientFile;
  downloadUrl:string;

  constructor(
    private formService:FormService,
    private patientFileService:PatientFileService,
    private uploadService:UploadService,
    private ref:ChangeDetectorRef
  ) { 
    this.fieldTypes = this.formService.fieldTypes;
  }

  ngOnInit(): void {
    this.initFieldValue();
    this.registerCustomFieldValue();
    let sub = this.valueControl.valueChanges.subscribe(val => {
      this.valueChanged(val);
    });

    let valSub = this.patientFileService.currentCustomValues.subscribe(vals => {
      this.findVal(vals);
    });

    let fileSub = this.patientFileService.onFileSubmitted.subscribe(file => {
      if(file){
        this.onFormSubmit(file);
      }
    });

    let patientSub = this.patientFileService.selectedFile.subscribe(file =>{
      this.selectedPatient = file;
    })


    this.subs = [sub,fileSub,valSub,patientSub];
  }

  ngOnDestroy(){
    try{
      this.subs.forEach(s => s.unsubscribe());
      this.formService.removeCustomFieldValue(this.fieldValue);
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

  async onFileSelected(files:FileList){
    let file:File = files.item(0);
    if(this.selectedPatient){
      try{
        if(this.fieldValue?.value?.filePath){
          await this.uploadService.deleteFile(this.fieldValue.value.filePath,this.selectedPatient.id);
        }
        await this.uploadService.uploadFile(file,this.selectedPatient.id);
        this.fieldValue.value.filePath = file.name;
        this.onFormSubmit(this.selectedPatient);
      }
      catch(e){
        
      }
    }
  }

  
  async onImageSelected(files:FileList){
    let file:File = files.item(0);
    if(this.selectedPatient){
      try{
        if(this.fieldValue?.value?.filePath){
          await this.uploadService.deleteImage(this.fieldValue.value.filePath,this.selectedPatient.id);
        }
        await this.uploadService.uploadImage(file,this.selectedPatient.id);
        this.fieldValue.value.filePath = file.name;
        this.onFormSubmit(this.selectedPatient);
      }
      catch(e){
        
      }
    }
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

  onFormSubmit(patientFile:PatientFile){
    if(!this.fieldValue.id){
      this.createValue(patientFile);
    }
    else{
      this.updateValue(patientFile);
    }
  }

  createValue(parentFile:PatientFile){
    this.fieldValue.parentFile = parentFile;
    this.sub = this.formService.createFieldValue(this.fieldValue).subscribe({
      next:res => {
        this.fieldValue.id = res.id;
      }
    });
  }

  updateValue(parentFile:PatientFile){
    this.fieldValue.parentFile = parentFile;
    this.sub = this.formService.updateFieldValue(this.fieldValue).subscribe({
      next:res => {
        return res;
      }
    });
  }

  setInitialValue(){
    if(this.fieldValue.fieldType === this.fieldTypes.date){
      this.valueControl.setValue(this.fieldValue.value.dateValue);
    }
    else if(this.fieldValue.fieldType === this.fieldTypes.dropdown || this.fieldValue.fieldType === this.fieldTypes.text || this.fieldValue.fieldType === this.fieldTypes.radio){
      this.valueControl.setValue(this.fieldValue.value.stringValue);
    }
  }

  findVal(vals:CustomFieldValue[]){
    let foundVal = vals.find(val => val.parentField === this.fieldValue.parentField);
    if(foundVal){
      this.fieldValue = foundVal;
      this.formService.updateCustomFieldValue(this.fieldValue);
      this.setInitialValue();
    }
  }
}
