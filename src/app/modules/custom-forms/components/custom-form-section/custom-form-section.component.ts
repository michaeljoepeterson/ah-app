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

  private _sub:Subscription;
  get sub():Subscription{
    return this._sub;
  }

  set sub(subscription:Subscription){
    if(this._sub){
      this._sub.unsubscribe();
    }
    this._sub = subscription;
  }

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
  newSection:CustomSection;

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
          this.section.removeNewItems();
          this.ref.markForCheck();
          this.isAdding = false;
        }
      }
    });

    //update with new section when section added
    let newSectionSub = this.formService.onSectionAdded.subscribe(section => {
      if(this.section.id && section?.parentSection === this.section.id){
        this.section.removeNewItems();
        this.section.addSection(section);
      }
    });

    let newFieldSub = this.formService.onFieldAdded.subscribe(field => {
      if(field?.parentSection === this.section.id){
        this.section.removeNewItems();
        this.section.addField(field);
      }
    });

    if(!this.section.id){
      this.editMode = true;
      this.isNew = true;
    }

    this.subs = [formSub,updateSectionSub,newFieldSub,newSectionSub]
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
    this.newSection = this.formService.generateNewSection(this.section);
    this.section.addSection(this.newSection);
    this.isAdding = true;
  }

  fieldAdded(){
    this.sectionExpanded = true;
    let field = this.formService.generateNewField(this.section);
    this.section.addField(field);
    this.isAdding = true;
  }

  confirmClicked(){
    this.setEditMode(false);
    if(this.isNew){
      this.formService.updateNewField(true);
      //temp until new id from server
      this.createNewSection();
    }
    else{
      this.updateSection();
    }
  }

  cancelClicked(){
    this.setEditMode(false);
    if(this.isNew){
      this.formService.updateNewField(false);
    }
  }

  createNewSection(){
    let section =  this.section;
    this.sub = this.formService.createNewSection(section).subscribe({
      next:res => {
        if(!this.section.id){
          this.section.id = res.id;
        }
        this.ref.markForCheck();
      }
    })
  }

  updateSection(){
    this.sub = this.formService.updateSection(this.section).subscribe({
      next:res => {
        this.ref.markForCheck();
      }
    })
  }
}
