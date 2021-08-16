import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CustomField } from '../../models/custom-field';
import { CustomForm } from '../../models/custom-form';
import { CustomSection } from '../../models/custom-section';
import { FormService } from '../../services/form.service';

@Component({
  selector: 'app-custom-form',
  changeDetection:ChangeDetectionStrategy.OnPush,
  templateUrl: './custom-form.component.html',
  styleUrls: ['./custom-form.component.css']
})
export class CustomFormComponent implements OnInit {
  @Input() form:CustomForm;
  @Input() children:(CustomField|CustomSection)[];
  isAdding:boolean = false;
  subs:Subscription[] = [];

  constructor(
    private formService:FormService,
    private ref:ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    
  }
}
