import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { DynamicFormComponent } from './components/dynamic-form/dynamic-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [DynamicFormComponent],
  imports: [
    CommonModule,
    MatDialogModule,
    MatSnackBarModule,
    FormsModule,
    ReactiveFormsModule,
    CKEditorModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule
  ]
})
export class NotificationsModule { }
