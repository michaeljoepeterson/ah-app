import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmModalComponent } from '../components/confirm-modal/confirm-modal.component';
import { DynamicFormComponent } from '../components/dynamic-form/dynamic-form.component';
import { ConfirmModalData } from '../models/confirm-modal-data';
import { DynamicFormData } from '../models/dynamic-form-models';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {
  defaultDuration:number = 6000;
  defaultAction:string = 'Close';
  defaultWidth:string = '500px';

  constructor(
    private _snackBar: MatSnackBar,
    private dialog: MatDialog
  ) { }

   /**
   * open a modal with the provided component
   * @returns 
   */
  openModal(component:any,height?:string,width?:string):MatDialogRef<any>{
    width = width ? width : this.defaultWidth;
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
    width = width ? width : this.defaultWidth;
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

  /**
   * display generic snack bar message
   * @param message string message
   * @param action optional action for button
   * @param duration optional duration
   */
  displaySnackBar(message:string, action?:string, duration?:number){
    action = action ? action : this.defaultAction;
    duration = duration ? duration : this.defaultDuration;
    this._snackBar.open(message, action, {
      duration: duration,
    });
  }

  openConfirmModal(confirmData:ConfirmModalData,width?:string):MatDialogRef<ConfirmModalComponent>{
    width = width ? width : this.defaultWidth;
    let confirmModal = this.dialog.open(ConfirmModalComponent,{
      width,
      data:confirmData
    });

    return confirmModal;
  }
}
