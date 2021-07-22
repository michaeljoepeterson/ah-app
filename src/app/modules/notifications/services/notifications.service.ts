import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DynamicFormComponent } from '../components/dynamic-form/dynamic-form.component';
import { DynamicFormData } from '../models/dynamic-form-models';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {
  defaultDuration:number = 6000;
  defaultAction:string = 'Close';

  constructor(
    private _snackBar: MatSnackBar,
    private dialog: MatDialog
  ) { }

   /**
   * open a modal with the provided component
   * @returns 
   */
  openModal(component:any,height?:string,width?:string):MatDialogRef<any>{
    const modal = this.dialog.open(component,{
      width,
      height
    });
    
    return modal;
  }

  /**
   * display a error snack bar
   * @param message string message
   * @param error error object
   * @param action optional action for button
   * @param duration optional duration
   */
   displayErrorSnackBar(message:string, error:any, action?:string, duration?:number){
    action = action ? action : this.defaultAction;
    duration = duration ? duration : this.defaultDuration;
    const errorMessage = `Error: ${message.trim()} Message: ${error.message}`;
    this._snackBar.open(errorMessage, action, {
      duration: duration,
    });
  }

  /**
   * display a dynamic form within a modal
   */
  openDynamicFormModal(data:DynamicFormData,width?:string):MatDialogRef<DynamicFormComponent>{
    let formModal = this.dialog.open(DynamicFormComponent,{
      width
    });
    formModal.componentInstance.data = data;
    let sub = formModal.componentInstance.formCancelled.subscribe(resp => {
      formModal.close();
      try{
        sub.unsubscribe();
      }
      catch(e){
        console.warn(e);
      }
    });
    return formModal;
  }
}
