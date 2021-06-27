import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientDashRoutingModule } from './client-dash-routing.module';
import { ActionBarComponent } from './components/navigation/action-bar/action-bar.component';
import { MainNavComponent } from './components/navigation/main-nav/main-nav.component';
import { FolderNavComponent } from './components/navigation/folder-nav/folder-nav.component';
import { EventListComponent } from './components/event-list/event-list.component';
import { EventCardComponent } from './components/event-list/event-card/event-card.component';
import { EventDetailsComponent } from './components/event-details/event-details.component';
import { MainDashComponent } from './pages/main-dash/main-dash.component';


@NgModule({
  declarations: [ActionBarComponent, MainNavComponent, FolderNavComponent, EventListComponent, EventCardComponent, EventDetailsComponent, MainDashComponent],
  imports: [
    CommonModule,
    ClientDashRoutingModule
  ]
})
export class ClientDashModule { }
