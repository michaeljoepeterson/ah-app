import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { CustomForm } from '../../models/custom-form';

@Component({
  selector: 'app-custom-form',
  changeDetection:ChangeDetectionStrategy.OnPush,
  templateUrl: './custom-form.component.html',
  styleUrls: ['./custom-form.component.css']
})
export class CustomFormComponent implements OnInit {
  @Input() form:CustomForm;

  constructor() { }

  ngOnInit(): void {
  }

}
