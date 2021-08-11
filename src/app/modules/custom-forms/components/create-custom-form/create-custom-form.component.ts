import { Component, OnInit } from '@angular/core';
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

  constructor(
    private formService:FormService
  ) { }

  ngOnInit(): void {
  }
  
  formSelected(form:CustomForm){
    this.form = form;
  }
}
