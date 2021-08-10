import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomFieldComponent } from './components/custom-field/custom-field.component';
import { CustomFormComponent } from './components/custom-form/custom-form.component';
import { CustomFormSectionComponent } from './components/custom-form-section/custom-form-section.component';
import { HttpClientModule } from '@angular/common/http';
import { FormSelectorComponent } from './components/form-selector/form-selector.component';
import { CreateCustomFormComponent } from './components/create-custom-form/create-custom-form.component';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    CustomFieldComponent, 
    CustomFormComponent, 
    CustomFormSectionComponent, 
    FormSelectorComponent, 
    CreateCustomFormComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    MatSelectModule,
    FormsModule
  ],
  exports:[
    FormSelectorComponent,
    CreateCustomFormComponent,
  ]
})
export class CustomFormsModule { }
