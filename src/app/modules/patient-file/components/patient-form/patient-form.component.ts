import { Component, Input, OnInit } from '@angular/core';
import { FormService } from '../../../custom-forms/services/form.service';
import { PatientFile } from '../../../client-dash/models/patient-file';
import { PatientErrors } from '../../models/patient-errors';
import { FolderItem } from '../../../client-dash/models/folder-item';
import { Observable, Subscription } from 'rxjs';
import { FolderNavService } from '../../../client-dash/services/folder-nav.service';
import { CustomForm } from '../../../custom-forms/models/custom-form';
import { CustomFieldValue } from '../../../custom-forms/models/custom-field-value';
import { map, switchMap } from 'rxjs/operators';
import { PatientFileService } from '../../services/patient-file.service';
import { UploadRequest, UploadService } from '../../../../services/upload.service';
import { fieldTypes, FieldTypes } from '../../../custom-forms/constants';

@Component({
  selector: 'app-patient-form',
  templateUrl: './patient-form.component.html',
  styleUrls: ['./patient-form.component.css']
})
export class PatientFormComponent implements OnInit {
  @Input() patientFile:PatientFile = new PatientFile();
  @Input() parentFolder:FolderItem;
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

  formHeader:string = 'Create a New Patient File';
  formErrors:PatientErrors = new PatientErrors();
  selectedForm:CustomForm;
  customValues:CustomFieldValue[] = [];
  subs:Subscription[] = [];
  fieldTypes:FieldTypes = fieldTypes

  constructor(
    private formService:FormService,
    private folderService:FolderNavService,
    private patientFileService:PatientFileService,
    private uploadService:UploadService
  ) { }

  ngOnInit(): void {
    this.formService.setEditing(false);
    let sub = this.formService.currentCustomValues.subscribe(values => {
      this.customValues = values;
    });
    this.patientFileService.setFile(this.patientFile);
    this.subs.push(sub);
    if(this.patientFile.id){
      this.init();
    }
  }

  ngOnDestroy(){
    try{
      if(this._sub){
        this._sub.unsubscribe();
      }
      this.subs.forEach(s => s.unsubscribe());
      this.formService.resetCustomFieldValues();
      this.patientFileService.submitFile(null);
    }
    catch(e){
      console.warn(e);
    }
  }

  onSubmit(){
    let hasErrors = this.formErrors.checkErrors(this.patientFile);
    if(!hasErrors && this.parentFolder && !this.patientFile.id){
      this.createFile();
    }
    else if(!hasErrors && this.patientFile.id){
      this.updateFile();
    }
  }

  async runUploadRequests(uploads:UploadRequest[],patientId:string){
    let requests = uploads.map(upload => {
      if(upload.type === this.fieldTypes.file){
        this.uploadService.uploadFile(upload.file,patientId);
      }
      else if(upload.type === this.fieldTypes.image){
        return this.uploadService.uploadImage(upload.file,patientId);
      }
    });

    await Promise.all(requests);
  }

  async createFile(){
    this.sub = this.folderService.createFile(this.patientFile,this.parentFolder).subscribe({
      next:async (res) => {
        this.patientFile.id = res.file.id;
        let uploads = this.uploadService.getUploadRequests();
        if(uploads.length > 0){
          await this.runUploadRequests(this.uploadService.getUploadRequests(),this.patientFile.id);
        }
        this.patientFileService.submitFile(this.patientFile);
      }
    });
  }

  updateFile(){
    this.sub = this.folderService.updateFile(this.patientFile).subscribe({
      next:res => {
        this.patientFileService.submitFile(this.patientFile);
      }
    });
  }

  formSelected(form:CustomForm){
    this.selectedForm = form;
    this.formService.resetCustomFieldValues();
    this.patientFile.formType = this.selectedForm.id;
  }

  init(){
    debugger;
    this.sub = this.patientFileService.getFileValues(this.patientFile).subscribe({
      next:res => {
        console.log(res);
      }
    })
  }
}
