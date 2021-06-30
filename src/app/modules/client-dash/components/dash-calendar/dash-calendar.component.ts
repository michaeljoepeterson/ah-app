import { Component, OnInit, ViewChild } from '@angular/core';
import { CalendarOptions, FullCalendarComponent } from '@fullcalendar/angular';
import '@fullcalendar/core';
import { Subscription } from 'rxjs';
import { FolderItem } from '../../models/folder-item';
import { FolderNavService } from '../../services/folder-nav.service';

@Component({
  selector: 'app-dash-calendar',
  templateUrl: './dash-calendar.component.html',
  styleUrls: ['./dash-calendar.component.css']
})
export class DashCalendarComponent implements OnInit {
  @ViewChild('calendar') calendarComponent: FullCalendarComponent;
  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    dateClick: this.handleDateClick.bind(this),
    events: [

    ]
  };
  folder:FolderItem;
  folderSub:Subscription;

  constructor(
    private folderNavService:FolderNavService
  ) {

  }

  ngOnInit(): void {
    this.folderSub = this.folderNavService.selectedFolder.subscribe(folder => {
      if(folder){
        this.folder = folder;
        this.addFolderEvents();
      }
    });
  }

  ngOnDestroy(){
    try{
      this.folderSub.unsubscribe();
    }
    catch(e){
      console.warn(e);
    }
  }

  addFolderEvents(){
    let calendarEvents = this.folderNavService.getCalendarData(this.folder);
    this.calendarComponent.getApi().removeAllEvents();
    console.log(calendarEvents);
    calendarEvents.forEach((event:any) => {
      this.calendarComponent.getApi().addEvent(event);
    });
  }

  handleDateClick(event){
    console.log(event);
    //change view using this
    //this.calendarComponent.getApi().changeView('timeGridWeek');
  }
}
