import { Component, Input, OnInit } from '@angular/core';
import { FormService } from '../../../custom-forms/services/form.service';
import { PatientFile } from '../../../client-dash/models/patient-file';
import { PatientErrors } from '../../models/patient-errors';
import { FolderItem } from '../../../client-dash/models/folder-item';
import { Subscription } from 'rxjs';
import { FolderNavService } from '../../../client-dash/services/folder-nav.service';
import { CustomForm } from 'src/app/modules/custom-forms/models/custom-form';
import { CustomFieldValue } from 'src/app/modules/custom-forms/models/custom-field-value';

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

  constructor(
    private formService:FormService,
    private folderService:FolderNavService
  ) { }

  ngOnInit(): void {
    this.formService.setEditing(false);
    let sub = this.formService.currentCustomValues.subscribe(values => {
      this.customValues = values;
      console.log('vals:',this.customValues);
    });

    this.subs.push(sub);
  }

  ngOnDestroy(){
    try{
      if(this._sub){
        this._sub.unsubscribe();
      }
      this.subs.forEach(s => s.unsubscribe());
      this.formService.resetCustomFieldValues();
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

  createFile(){
    this.sub = this.folderService.createFile(this.patientFile,this.parentFolder).subscribe({
      next:res => {
        console.log(res);
      }
    });
  }

  updateFile(){
    this.sub = this.folderService.updateFile(this.patientFile).subscribe({
      next:res => {
        console.log(res);
      }
    });
  }

  formSelected(form:CustomForm){
    this.selectedForm = form;
    this.formService.resetCustomFieldValues();
  }
}
