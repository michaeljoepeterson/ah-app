import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { CustomForm } from '../../../custom-forms/models/custom-form';

@Component({
  selector: 'app-patient-custom-form',
  changeDetection:ChangeDetectionStrategy.OnPush,
  templateUrl: './patient-custom-form.component.html',
  styleUrls: ['./patient-custom-form.component.css']
})
export class PatientCustomFormComponent implements OnInit {
  @Input() form:CustomForm;
  fieldType:string = 'field';
  sectionType:string = 'section';

  constructor() { }

  ngOnInit(): void {
  }

}
