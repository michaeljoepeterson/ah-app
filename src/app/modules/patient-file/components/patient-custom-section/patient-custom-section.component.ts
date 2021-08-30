import { Component, Input, OnInit } from '@angular/core';
import { CustomSection } from '../../../custom-forms/models/custom-section';

@Component({
  selector: 'app-patient-custom-section',
  templateUrl: './patient-custom-section.component.html',
  styleUrls: ['./patient-custom-section.component.css']
})
export class PatientCustomSectionComponent implements OnInit {
  @Input() section:CustomSection;
  fieldType:string = 'field';
  sectionType:string = 'section';

  constructor() { }

  ngOnInit(): void {
  }

}
