import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoginModalComponent } from '../components/login-modal/login-modal.component'

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
   * open the login modal
   * @returns 
   */
  openLoginModal():MatDialogRef<any>{
    const loginModal = this.dialog.open(LoginModalComponent);
    return loginModal;
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
}
