import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-patient-custom-values',
  templateUrl: './patient-custom-values.component.html',
  styleUrls: ['./patient-custom-values.component.css']
})
export class PatientCustomValuesComponent implements OnInit {
  @Input() combinedChildren:any[] = [];
  @Input() sectionSpace:number = 0;
  fieldType:string = 'field';
  sectionType:string = 'section';
  constructor() { }

  ngOnInit(): void {
  }

}
