import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CustomForm } from '../../models/custom-form';
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
    }
    else{
      this.formHeader = 'Create a Custom Form';
    }
  }

  sectionAdded(){
    this.form.combinedChildren = this.formService.addNewSection(this.form.combinedChildren);
    this.isAdding = true;
  }

  fieldAdded(){
    this.form.combinedChildren = this.formService.addNewField(this.form.combinedChildren);
    this.isAdding = true;
  }
}
