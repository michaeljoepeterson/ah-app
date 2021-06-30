import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientDashRoutingModule } from './client-dash-routing.module';
import { ActionBarComponent } from './components/navigation/action-bar/action-bar.component';
import { MainNavComponent } from './components/navigation/main-nav/main-nav.component';
import { FolderNavComponent } from './components/navigation/folder-nav/folder-nav.component';
import { EventListComponent } from './components/file-item-list/event-list.component';
import { EventCardComponent } from './components/file-item-list/event-card/event-card.component';
import { EventDetailsComponent } from './components/file-item-details/event-details.component';
import { MainDashComponent } from './pages/main-dash/main-dash.component';
import {SharedModule} from '../shared/shared.module';
import { FolderNavItemComponent } from './components/navigation/folder-nav/folder-nav-item/folder-nav-item.component';
import { FolderItemComponent } from './components/navigation/folder-nav/folder-item/folder-item.component';
import { FileItemComponent } from './components/navigation/folder-nav/file-item/file-item.component';
import { FolderNavListComponent } from './components/navigation/folder-nav/folder-nav-list/folder-nav-list.component';
import { MatIconModule } from '@angular/material/icon';
import { MatRippleModule } from '@angular/material/core';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FileManagerComponent } from './components/navigation/file-manager/file-manager.component';
import { TagsComponent } from './components/navigation/tags/tags.component';
import { TrashComponent } from './components/navigation/trash/trash.component';

@NgModule({
  declarations: [
    ActionBarComponent, 
    MainNavComponent, 
    FolderNavComponent, 
    EventListComponent, 
    EventCardComponent, 
    EventDetailsComponent, 
    MainDashComponent, FolderNavItemComponent, FolderItemComponent, FileItemComponent, FolderNavListComponent, FileManagerComponent, TagsComponent, TrashComponent],
  imports: [
    CommonModule,
    ClientDashRoutingModule,
    SharedModule,
    MatIconModule,
    MatRippleModule,
    MatTooltipModule
  ]
})
export class ClientDashModule { }
