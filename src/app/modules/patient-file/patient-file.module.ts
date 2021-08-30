import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PatientFormComponent } from './components/patient-form/patient-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CustomFormsModule } from '../custom-forms/custom-forms.module';
import { MatButtonModule } from '@angular/material/button';
import { PatientDetailsComponent } from './components/patient-details/patient-details.component';
import { BasePatientDetailsComponent } from './components/base-patient-details/base-patient-details.component';
import { PatientCustomValuesComponent } from './components/patient-custom-values/patient-custom-values.component';
import { PatientCustomFormComponent } from './components/patient-custom-form/patient-custom-form.component';
import { PatientCustomSectionComponent } from './components/patient-custom-section/patient-custom-section.component';
import { PatientCustomValueComponent } from './components/patient-custom-value/patient-custom-value.component';
import { ImageSlideshowComponent } from './components/details/image-slideshow/image-slideshow.component';

@NgModule({
  declarations: [
    PatientFormComponent,
    PatientDetailsComponent,
    BasePatientDetailsComponent,
    PatientCustomValuesComponent,
    PatientCustomFormComponent,
    PatientCustomSectionComponent,
    PatientCustomValueComponent,
    ImageSlideshowComponent
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
    PatientDetailsComponent
  ]
})
export class PatientFileModule { }
