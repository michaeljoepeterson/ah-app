import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainDashComponent } from './pages/main-dash/main-dash.component';

const routes: Routes = [
  { path: '', component: MainDashComponent },
  { path: '**', redirectTo: '/dashboard' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientDashRoutingModule { }
