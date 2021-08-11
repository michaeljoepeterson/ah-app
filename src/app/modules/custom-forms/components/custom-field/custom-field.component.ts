import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { CustomField } from '../../models/custom-field';

@Component({
  selector: 'app-custom-field',
  changeDetection:ChangeDetectionStrategy.OnPush,
  templateUrl: './custom-field.component.html',
  styleUrls: ['./custom-field.component.css']
})
export class CustomFieldComponent implements OnInit {
  @Input() field:CustomField;

  constructor() { }

  ngOnInit(): void {
  }

}
