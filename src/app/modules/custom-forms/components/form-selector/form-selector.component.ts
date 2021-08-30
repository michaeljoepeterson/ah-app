import { ChangeDetectorRef, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { NotificationsService } from '../../../notifications/services/notifications.service';
import { CustomForm } from '../../models/custom-form';
import { FormService } from '../../services/form.service';

@Component({
  selector: 'app-form-selector',
  //changeDetection:ChangeDetectionStrategy.OnPush,
  templateUrl: './form-selector.component.html',
  styleUrls: ['./form-selector.component.css']
})
export class FormSelectorComponent implements OnInit {
  @Output() formSelected:EventEmitter<CustomForm> = new EventEmitter();
  
  forms:CustomForm[] = [];
  formSelectLabel:string = 'Select a Form';
  selectedFormId:string = null;
  subs:Subscription[];
  isEditing:boolean;

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

  constructor(
    private formService:FormService,
    private notificationService:NotificationsService,
    private ref:ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.getForms();
    let sub = this.formService.onFormAdded.subscribe(form => {
      this.selectedFormId = form ? form.id : null;
      this.getForms();
    });

    let updatedSub = this.formService.onFormUpdated.subscribe(form => {
      this.selectedFormId = form ? form.id : null;
      this.getForms();
    });

    let editSub = this.formService.isEditing.subscribe(edit => {this.isEditing = edit});

    this.subs = [sub,updatedSub,editSub];
  }

  trackByFn(index:number,form:CustomForm){
    return form.id;
  }
  
  ngOnDestroy(){
    try{
      if(this._sub){
        this._sub.unsubscribe(); 
      }
    }
    catch(e){
      console.warn(e);
    }
  }

  /**
   * get the selected form and populate with the data for the form
   */
  onFormSelected(){
    let form = this.forms.find(form => form.id === this.selectedFormId);
    if(form){
      this.sub = this.formService.getSingleCustomForm(form.id).subscribe({
        next:response => {
          this.formSelected.emit(response);
          this.formService.setSelectedForm(response);
          this.ref.markForCheck();
        }
      })
    }
    else{
      this.formSelected.emit(null);
      this.formService.setSelectedForm(null);
    }

  }

  /**
   * get all possible forms
   */
  getForms(){
    this.sub = this.formService.getCustomForms().subscribe({
        next:response => {
        this.forms = [...response];
        this.ref.markForCheck();
      },
      error:err => {
        let message = 'Error getting forms';
        this.notificationService.displayErrorSnackBar(message,err);
      }
    });
  }

}
