import { Component, Input, OnInit } from '@angular/core';
import { CustomForm } from '../../../custom-forms/models/custom-form';

@Component({
  selector: 'app-patient-details',
  templateUrl: './patient-details.component.html',
  styleUrls: ['./patient-details.component.css']
})
export class PatientDetailsComponent implements OnInit {
  @Input() form:CustomForm
  constructor() { }

  ngOnInit(): void {
  }

}
