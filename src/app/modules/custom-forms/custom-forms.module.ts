import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomFieldComponent } from './components/custom-field/custom-field.component';
import { CustomFormComponent } from './components/custom-form/custom-form.component';
import { CustomFormSectionComponent } from './components/custom-form-section/custom-form-section.component';
import { HttpClientModule } from '@angular/common/http';
import { FormSelectorComponent } from './components/form-selector/form-selector.component';



@NgModule({
  declarations: [
    CustomFieldComponent, 
    CustomFormComponent, 
    CustomFormSectionComponent, 
    FormSelectorComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  exports:[
    FormSelectorComponent
  ]
})
export class CustomFormsModule { }
