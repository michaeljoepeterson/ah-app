import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IsLoggedInDirective } from './directives/auth/is-logged-in.directive';



@NgModule({
  declarations: [IsLoggedInDirective],
  imports: [
    CommonModule
  ],
  exports:[IsLoggedInDirective]
})
export class SharedModule { }
