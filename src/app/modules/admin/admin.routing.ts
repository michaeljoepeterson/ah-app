import { AdminPageComponent } from './components/admin-page/admin-page.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

export const routes: Routes = [
  { path: '', component: AdminPageComponent },
  { path: '**', redirectTo: '/admin' }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class AdminRoutingModule { }
  