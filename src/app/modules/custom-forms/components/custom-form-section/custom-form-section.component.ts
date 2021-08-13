import { ChangeDetectionStrategy, Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { CustomSection } from '../../models/custom-section';
import { animate, style, transition, trigger } from '@angular/animations';
import { Subscription } from 'rxjs';
import { FormService } from '../../services/form.service';

@Component({
  selector: 'app-custom-form-section',
  changeDetection:ChangeDetectionStrategy.OnPush,
  templateUrl: './custom-form-section.component.html',
  styleUrls: ['./custom-form-section.component.css'],
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
export class CustomFormSectionComponent implements OnInit {
  @Input() section:CustomSection;
  @Input() sectionSpace:number = 0;
  /**
   * track if section is edit mode
   */
  @Input() isEditing:boolean = false;

  baseChildIncrement:number = 4;
  sectionExpanded:boolean = false;

  formSub:Subscription;
  childSpacing:number;
  overSection:boolean = false;
  editMode:boolean = false;

  constructor(
    private formService:FormService
  ) { }

  ngOnInit(): void {
    this.sectionSpace = this.sectionSpace ? this.sectionSpace : 0;
    this.childSpacing = this.sectionSpace + this.baseChildIncrement;
    this.formSub = this.formService.isEditing.subscribe(isEditing => {
      this.isEditing = isEditing;
    });
  }

  ngOnDestroy(){
    try{
      this.formSub.unsubscribe();
    }
    catch(e){
      console.warn(e);
    }
  }

  expandSection(){
    this.sectionExpanded = !this.sectionExpanded;
  }

  mouseOverSection(){
    this.overSection = true;
  }

  mouseLeaveSection(){
    this.overSection = false;
  }

  setEditMode(edit:boolean){
    this.editMode = edit;
  }
}
