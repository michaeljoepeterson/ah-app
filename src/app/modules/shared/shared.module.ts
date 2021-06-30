import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IsLoggedInDirective } from './directives/auth/is-logged-in.directive';
import { InputButtonComboComponent } from './components/input-button-combo/input-button-combo.component';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';


@NgModule({
  declarations: [
    IsLoggedInDirective, 
    InputButtonComboComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MatIconModule,
    MatButtonModule
  ],
  exports:[
    IsLoggedInDirective,
    InputButtonComboComponent
  ]
})
export class SharedModule { }
