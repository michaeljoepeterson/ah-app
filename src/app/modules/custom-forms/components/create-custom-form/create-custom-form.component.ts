import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { CustomForm } from '../../models/custom-form';
import { CustomSection } from '../../models/custom-section';
import { FormService } from '../../services/form.service';

@Component({
  selector: 'app-create-custom-form',
  templateUrl: './create-custom-form.component.html',
  styleUrls: ['./create-custom-form.component.css']
})
export class CreateCustomFormComponent implements OnInit {
  customForms:CustomForm[] = [];
  formHeader:string = 'Create a custom form';
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

  form:CustomForm;
  isAdding:boolean = false;
  subs:Subscription[] = [];
  formName:string;
  editMode:boolean = false;

  constructor(
    private formService:FormService,
    private ref:ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.formService.setEditing(true);
    let updateSectionSub = this.formService.newFieldUpdated.subscribe(confirmed => {
      if(this.isAdding){
        if(!confirmed){
          this.form.combinedChildren = this.form.combinedChildren.filter(child => child.id);
          this.isAdding = false;
          this.form.combinedChildren = this.formService.removeNewItems(this.form.combinedChildren);
          this.ref.markForCheck()
        }
      }
    });
    this.formName = this.form?.name;
    this.subs = [updateSectionSub];
  }

  ngOnDestroy(){
    this.formService.setEditing(false);
    try{
      this.subs.forEach(sub => sub.unsubscribe());
    }
    catch(e){
      console.warn(e);
    }
  }
  
  formSelected(form:CustomForm){
    this.form = form;
    if(this.form){
      this.formHeader = `Editing: ${this.form.name}`;
      this.formName = this.form.name;
    }
    else{
      this.formHeader = 'Create a Custom Form';
      this.formName = '';
    }
  }

  sectionAdded(){
    let newSection = this.formService.generateNewSectionFromForm(this.form);
    this.form.combinedChildren = [...this.form.combinedChildren,newSection];
    this.isAdding = true;
    this.ref.detectChanges();
  }

  fieldAdded(){
    let newField = this.formService.generateNewFieldFromForm(this.form);
    this.form.combinedChildren = [...this.form.combinedChildren,newField];
    this.isAdding = true;
  }

  setEditMode(editMode:boolean){
    this.editMode = editMode;
  }

  onCancelClicked(){
    this.formName = this.form.name;
    this.setEditMode(false);
  }

  onConfirmClicked(){
    if(this.formName && !this.form){
      this.createNewForm();
    }
    else{
      this.form.name = this.formName;
    }
    this.formHeader = `Editing: ${this.form.name}`;
    this.setEditMode(false);
  }

  createNewForm(){
    this.form = new CustomForm();
    this.form.name = this.formName;
    this.sub = this.formService.createNewForm(this.form).subscribe({
      next:response => {
        this.form = new CustomForm(response);
      }
    });
  }
}
