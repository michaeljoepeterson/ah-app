import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginModalComponent } from './components/login-modal/login-modal.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
  declarations: [LoginModalComponent],
  imports: [
    CommonModule,
    MatDialogModule,
    MatSnackBarModule
  ]
})
export class NotificationsModule { }
