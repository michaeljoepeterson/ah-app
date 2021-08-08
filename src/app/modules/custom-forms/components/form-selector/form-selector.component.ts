import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { NotificationsService } from '../../../notifications/services/notifications.service';
import { CustomForm } from '../../models/custom-form';
import { FormService } from '../../services/form.service';

@Component({
  selector: 'app-form-selector',
  templateUrl: './form-selector.component.html',
  styleUrls: ['./form-selector.component.css']
})
export class FormSelectorComponent implements OnInit {
  forms:CustomForm[] = [];
  sub:Subscription;

  constructor(
    private formService:FormService,
    private notificationService:NotificationsService
  ) { }

  ngOnInit(): void {
    this.getForms();
  }

  getForms(){
    //move to setter?
    if(this.sub){
      this.sub.unsubscribe();
    }

    this.sub = this.formService.getCustomForms().pipe(
      switchMap(response => {
        this.forms = [...response];
        console.log(this.forms);
        return this.formService.getSingleCustomForm(this.forms[0].id)
      })
    ).subscribe({
      next:response => {
        console.log('form',response);
      },
      error:err => {
        let message = 'Error getting forms';
        this.notificationService.displayErrorSnackBar(message,err);
      }
    })
  }
}
