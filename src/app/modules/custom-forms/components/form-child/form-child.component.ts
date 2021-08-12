import { Component, Input, OnInit } from '@angular/core';
import { CustomField } from '../../models/custom-field';
import { CustomSection } from '../../models/custom-section';

@Component({
  selector: 'app-form-child',
  templateUrl: './form-child.component.html',
  styleUrls: ['./form-child.component.css']
})
export class FormChildComponent implements OnInit {
  @Input() combinedChildren:(CustomSection|CustomField)[] = [];
  @Input() sectionSpace:number = 0;
  fieldType:string = 'field';
  sectionType:string = 'section';

  constructor() { }

  ngOnInit(): void {
  }

}
