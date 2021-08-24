import { Component, Input, OnInit } from '@angular/core';
import { FormService } from '../../../custom-forms/services/form.service';
import { PatientFile } from '../../../client-dash/models/patient-file';
import { PatientErrors } from '../../models/patient-errors';
import { FolderItem } from '../../../client-dash/models/folder-item';
import { Subscription } from 'rxjs';
import { FolderNavService } from '../../../client-dash/services/folder-nav.service';

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

  constructor(
    private formService:FormService,
    private folderService:FolderNavService
  ) { }

  ngOnInit(): void {
    this.formService.setEditing(false);
  }

  onSubmit(){
    let hasErrors = this.formErrors.checkErrors(this.patientFile);
    console.log(hasErrors);
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
}
