import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { PatientFile } from '../../../client-dash/models/patient-file';

@Component({
  selector: 'app-base-patient-details',
  changeDetection:ChangeDetectionStrategy.OnPush,
  templateUrl: './base-patient-details.component.html',
  styleUrls: ['./base-patient-details.component.css']
})
export class BasePatientDetailsComponent implements OnInit {
  @Input() file:PatientFile;

  constructor() { }

  ngOnInit(): void {
    console.log(this.file);
  }

}
