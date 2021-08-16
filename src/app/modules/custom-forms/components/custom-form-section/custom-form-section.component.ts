import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { CustomSection } from '../../models/custom-section';
import { animate, style, transition, trigger } from '@angular/animations';
import { Subscription } from 'rxjs';
import { FormService } from '../../services/form.service';
import { CustomField } from '../../models/custom-field';
import { FieldTypes, fieldTypes } from '../../constants';

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
  fieldTypes:FieldTypes;
  isAdding:boolean = false;
  isNew:boolean = false;
  subs:Subscription[];

  constructor(
    private formService:FormService,
    private ref:ChangeDetectorRef
  ) {
    this.fieldTypes = this.formService.fieldTypes;
  }

  ngOnInit(): void {
    this.sectionSpace = this.sectionSpace ? this.sectionSpace : 0;
    this.childSpacing = this.sectionSpace + this.baseChildIncrement;
    let formSub = this.formService.isEditing.subscribe(isEditing => {
      this.isEditing = isEditing;
    });
    let updateSectionSub = this.formService.newFieldUpdated.subscribe(confirmed => {
      if(this.isAdding){
        if(!confirmed){
          this.section.combinedChildren = this.section.combinedChildren.filter(child => child.id);
          this.ref.markForCheck();
          this.isAdding = false;
        }
      }
    });

    if(!this.section.id){
      this.editMode = true;
      this.isNew = true;
    }

    this.subs = [formSub,updateSectionSub]
  }

  ngOnDestroy(){
    try{
      this.subs.forEach(sub => sub.unsubscribe());
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

  sectionAdded(){
    this.sectionExpanded = true;
    let originalCombinedSections = [...this.section.combinedChildren];
    let newCombinedSections = [...this.section.combinedChildren];
    let newSeciton = new CustomSection();
    newSeciton.name = 'New Section';
    newCombinedSections.push(newSeciton);
    this.section.combinedChildren = [...newCombinedSections];
    this.isAdding = true;
  }

  fieldAdded(){
    this.sectionExpanded = true;
    let originalCombinedSections = [...this.section.combinedChildren];
    let newCombinedSections = [...this.section.combinedChildren];
    let newField = new CustomField();
    newField.name = 'New Field';
    newField.fieldType = this.fieldTypes.text;
    newCombinedSections.push(newField);
    this.section.combinedChildren = [...newCombinedSections];
    this.isAdding = true;
  }

  confirmClicked(){
    this.setEditMode(false);
    if(this.isNew){
      this.formService.updateNewField(true);
      //temp until new id from server
      this.section.id = 'test' + new Date().valueOf();
    }
  }

  cancelClicked(){
    this.setEditMode(false);
    if(this.isNew){
      this.formService.updateNewField(false);
    }
  }
}
