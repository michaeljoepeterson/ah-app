import { animate, style, transition, trigger } from '@angular/animations';
import { Component, Input, OnInit } from '@angular/core';
import { CustomSection } from '../../../custom-forms/models/custom-section';

@Component({
  selector: 'app-patient-custom-section',
  templateUrl: './patient-custom-section.component.html',
  styleUrls: ['./patient-custom-section.component.css'],
  animations: [
    trigger(
      'enterAnimation', [
        transition(':enter', [
          style({
            overflow: 'hidden',
            height: '0px',
          }),
          animate('300ms ease-in-out', style({
            overflow: 'hidden',
            height: '*',
          })),
        ]),
        transition(':leave', [
          style({
            overflow: 'hidden',
            height: '*',
          }),
          animate('300ms ease-in-out', style({
            overflow: 'hidden',
            height: '0px',
          }))
        ])
      ]
    )
  ]
})
export class PatientCustomSectionComponent implements OnInit {
  @Input() section:CustomSection;
  @Input() sectionSpace:number = 0;
  fieldType:string = 'field';
  sectionType:string = 'section';
  sectionExpanded:boolean = false;
  baseChildIncrement:number = 4;
  childSpacing:number;

  constructor() { }

  ngOnInit(): void {
    this.sectionSpace = this.sectionSpace ? this.sectionSpace : 0;
    this.childSpacing = this.sectionSpace + this.baseChildIncrement;
  }

  expandSection(){
    this.sectionExpanded = !this.sectionExpanded;
  }
}
