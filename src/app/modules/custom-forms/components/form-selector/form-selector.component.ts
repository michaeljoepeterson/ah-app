import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { NotificationsService } from '../../../notifications/services/notifications.service';
import { CustomForm } from '../../models/custom-form';
import { FormService } from '../../services/form.service';

@Component({
  selector: 'app-form-selector',
  changeDetection:ChangeDetectionStrategy.OnPush,
  templateUrl: './form-selector.component.html',
  styleUrls: ['./form-selector.component.css']
})
export class FormSelectorComponent implements OnInit {
  @Output() formSelected = new EventEmitter();
  
  forms:CustomForm[] = [];
  formSelectLabel:string = 'Select a custom form';
  selectedFormId:string = null;

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
          console.log('form',response);
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
        console.log(this.forms);
        this.ref.markForCheck();
      },
      error:err => {
        let message = 'Error getting forms';
        this.notificationService.displayErrorSnackBar(message,err);
      }
    });
  }

}
