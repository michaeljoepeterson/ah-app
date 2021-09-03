import { Component, Input, OnInit } from '@angular/core';
import { PatientFile } from '../../../client-dash/models/patient-file';
import { CustomForm } from '../../../custom-forms/models/custom-form';
import { PatientFileService } from '../../services/patient-file.service';

@Component({
  selector: 'app-patient-details',
  templateUrl: './patient-details.component.html',
  styleUrls: ['./patient-details.component.css']
})
export class PatientDetailsComponent implements OnInit {
  @Input() form:CustomForm;
  @Input() file:PatientFile;
  
  constructor(
    private patientFileService:PatientFileService
  ) { }

  ngOnInit(): void {
  }

  ngOnDestroy(){
    try{
      this.patientFileService.cleanupPatientDetails();
    }
    catch(e){
      console.warn(e);
    }
  }
}
