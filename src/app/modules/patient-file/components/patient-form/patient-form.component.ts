import { Component, Input, OnInit } from '@angular/core';
import { FormService } from '../../../custom-forms/services/form.service';
import { PatientFile } from '../../../client-dash/models/patient-file';
import { PatientErrors } from '../../models/patient-errors';

@Component({
  selector: 'app-patient-form',
  templateUrl: './patient-form.component.html',
  styleUrls: ['./patient-form.component.css']
})
export class PatientFormComponent implements OnInit {
  @Input() patientFile:PatientFile = new PatientFile();

  formHeader:string = 'Create a New Patient File';
  formErrors:PatientErrors = new PatientErrors();

  constructor(
    private formService:FormService
  ) { }

  ngOnInit(): void {
    this.formService.setEditing(false);
  }

  onSubmit(){
    let hasErrors = this.formErrors.checkErrors(this.patientFile);
    console.log(hasErrors);
    console.log(this.patientFile);
  }
}
