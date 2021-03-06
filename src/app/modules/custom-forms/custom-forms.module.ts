import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomFieldComponent } from './components/custom-field/custom-field.component';
import { CustomFormComponent } from './components/custom-form/custom-form.component';
import { CustomFormSectionComponent } from './components/custom-form-section/custom-form-section.component';
import { HttpClientModule } from '@angular/common/http';
import { FormSelectorComponent } from './components/form-selector/form-selector.component';
import { CreateCustomFormComponent } from './components/create-custom-form/create-custom-form.component';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormChildComponent } from './components/form-child/form-child.component';
import { MatIconModule } from '@angular/material/icon';
import { MatNativeDateModule, MatRippleModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { EditFieldComponent } from './components/edit-field/edit-field.component';
import { EditFormSectionComponent } from './components/edit-form-section/edit-form-section.component';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatRadioModule } from '@angular/material/radio';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { FormEditControlsComponent } from './components/form-edit-controls/form-edit-controls.component';
import { MatMenuModule } from '@angular/material/menu';

@NgModule({
  declarations: [
    CustomFieldComponent, 
    CustomFormComponent, 
    CustomFormSectionComponent, 
    FormSelectorComponent, 
    CreateCustomFormComponent, 
    FormChildComponent,
    EditFieldComponent,
    EditFormSectionComponent,
    FormEditControlsComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    MatSelectModule,
    FormsModule,
    MatIconModule,
    MatRippleModule,
    MatButtonModule,
    MatTooltipModule,
    MatInputModule,
    MatCardModule,
    MatRadioModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatMenuModule,
    ReactiveFormsModule
  ],
  exports:[
    FormSelectorComponent,
    CreateCustomFormComponent,
    CustomFormComponent
  ]
})
export class CustomFormsModule { }
