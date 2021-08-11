import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { CustomSection } from '../../models/custom-section';

@Component({
  selector: 'app-custom-form-section',
  changeDetection:ChangeDetectionStrategy.OnPush,
  templateUrl: './custom-form-section.component.html',
  styleUrls: ['./custom-form-section.component.css']
})
export class CustomFormSectionComponent implements OnInit {
  @Input() section:CustomSection;

  constructor() { }

  ngOnInit(): void {
  }

}
