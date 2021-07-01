import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientDashRoutingModule } from './client-dash-routing.module';
import { ActionBarComponent } from './components/navigation/action-bar/action-bar.component';
import { MainNavComponent } from './components/navigation/main-nav/main-nav.component';
import { FolderNavComponent } from './components/navigation/folder-nav/folder-nav.component';
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
import { MatButtonModule } from '@angular/material/button';
import { TagComponent } from './components/navigation/tags/tag/tag.component';
import { DashNavComponent } from './components/navigation/dash-nav/dash-nav.component';
import { ChartListComponent } from './components/chart-list/chart-list.component';
import { ChartListItemComponent } from './components/chart-list/chart-list-item/chart-list-item.component';
import { SearchContainerComponent } from './components/search-container/search-container.component';
import { SearchInputComponent } from './components/search-container/search-input/search-input.component';
import { NoteOptionsComponent } from './components/search-container/note-options/note-options.component';
import { FolderCardListComponent } from './components/folder-card-list/folder-card-list.component';
import { FolderCardComponent } from './components/folder-card-list/folder-card/folder-card.component';
import { FolderCardDetailsComponent } from './components/folder-card-details/folder-card-details.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';
import { GetCurrentStatusColorPipe, GetCurrentStatusPipe, GetCurrentStatusColorClassPipe } from './pipes/folder-card.pipe';
import { DashCommentsComponent } from './components/dash-comments/dash-comments.component';
import { DashCommentComponent } from './components/dash-comments/dash-comment/dash-comment.component';
import { DashCalendarComponent } from './components/dash-calendar/dash-calendar.component';
import { FullCalendarModule } from '@fullcalendar/angular'; 
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';

FullCalendarModule.registerPlugins([
  dayGridPlugin,
  interactionPlugin,
  timeGridPlugin
]);

@NgModule({
  declarations: [
    ActionBarComponent, 
    MainNavComponent, 
    FolderNavComponent, 
    MainDashComponent, 
    FolderNavItemComponent, 
    FolderItemComponent, 
    FileItemComponent, 
    FolderNavListComponent, 
    FileManagerComponent, 
    TagsComponent, 
    TrashComponent, 
    TagComponent, 
    DashNavComponent, 
    ChartListComponent, 
    ChartListItemComponent, 
    SearchContainerComponent, 
    SearchInputComponent, 
    NoteOptionsComponent, 
    FolderCardListComponent, 
    FolderCardComponent, 
    FolderCardDetailsComponent, 
    GetCurrentStatusPipe,
    GetCurrentStatusColorPipe,
    DashCommentsComponent,
    DashCommentComponent,
    DashCalendarComponent,
    GetCurrentStatusColorClassPipe
  ],
  imports: [
    CommonModule,
    ClientDashRoutingModule,
    SharedModule,
    MatIconModule,
    MatRippleModule,
    MatTooltipModule,
    MatButtonModule,
    ReactiveFormsModule,
    FormsModule,
    MatSelectModule,
    FullCalendarModule
  ]
})
export class ClientDashModule { }
