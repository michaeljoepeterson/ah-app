import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PatientFormComponent } from './components/patient-form/patient-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CustomFormsModule } from '../custom-forms/custom-forms.module';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [
    PatientFormComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    CustomFormsModule,
    ReactiveFormsModule,
    MatButtonModule
  ],
  exports:[
    PatientFormComponent,
  ]
})
export class PatientFileModule { }
