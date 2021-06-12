import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminPageComponent } from './components/admin-page/admin-page.component';
import { AdminRoutingModule } from './admin.routing';
import {SharedModule} from '../shared/shared.module';

@NgModule({
  declarations: [
    AdminPageComponent
  ],
  imports: [
    AdminRoutingModule,
    CommonModule,
    SharedModule
  ]
})
export class AdminModule { }
