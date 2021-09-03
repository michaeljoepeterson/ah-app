import { ChangeDetectorRef, Component, EventEmitter, OnInit, Output,Input } from '@angular/core';
import { of, Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { PatientFileService } from '../../../patient-file/services/patient-file.service';
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
  @Input() isEditing:boolean;
  @Output() formSelected:EventEmitter<CustomForm> = new EventEmitter();
  
  forms:CustomForm[] = [];
  formSelectLabel:string = 'Select a Form';
  selectedFormId:string = null;
  subs:Subscription[];

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
    private patientFileService:PatientFileService,
    private formService:FormService,
    private notificationService:NotificationsService,
    private ref:ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.initForms();
    let sub = this.formService.onFormAdded.subscribe(form => {
      this.selectedFormId = form ? form.id : null;
      if(form){
        this.getForms();
      }
    });

    let updatedSub = this.formService.onFormUpdated.subscribe(form => {
      this.selectedFormId = form ? form.id : null;
      if(form){
        this.getForms();
      }
    });

    let patientSub = this.patientFileService.selectedFile.subscribe(file => {
      if(file){
        this.selectedFormId = file.formType;
      }
    });

    let editSub = this.formService.isEditing.subscribe(edit => {this.isEditing = edit});

    this.subs = [sub,updatedSub,editSub,patientSub];
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

  hanldeFormSelect(response:CustomForm){
    this.formSelected.emit(response);
    this.formService.setSelectedForm(response);
    this.ref.markForCheck();
  }

  findForm(id:string):CustomForm{
    let form = this.forms.find(form => form.id === id);
    return form;
  }

  /**
   * get the selected form and populate with the data for the form
   */
  onFormSelected(){
    let form = this.findForm(this.selectedFormId);
    if(form){
      this.sub = this.formService.getSingleCustomForm(form.id).subscribe({
        next:response => {
          this.hanldeFormSelect(response);
        }
      })
    }
    else{
      this.formSelected.emit(null);
      this.formService.setSelectedForm(null);
    }

  }

  initForms(){
    this.sub = this.formService.getCustomForms().pipe(
      switchMap(response => {
        this.forms = [...response];
        return this.patientFileService.selectedFile
      }),
      switchMap(file => {
        if(file?.id){
          this.selectedFormId = file.formType;
          let form = this.findForm(this.selectedFormId);
          return this.formService.getSingleCustomForm(form.id);
        }
        else{
          return of(null);
        }
      })
    ).subscribe({
      next:response => {
        if(response){
          this.hanldeFormSelect(response);
        }
        this.ref.markForCheck();
      },
      error:err => {
        let message = 'Error initializing forms';
        this.notificationService.displayErrorSnackBar(message,err);
      }
    });
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
