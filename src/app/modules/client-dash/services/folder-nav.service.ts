import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { DateEvent } from '../models/date-event';
import { FileItem } from '../models/file-item';
import { FolderItem, IFolderItem } from '../models/folder-item';
import {GetCurrentStatusColorPipe} from '../pipes/folder-card.pipe';

@Injectable({
  providedIn: 'root'
})
export class FolderNavService {
  private _selectedFolder:BehaviorSubject<FolderItem> = new BehaviorSubject(null);
  selectedFolder:Observable<FolderItem> = this._selectedFolder.asObservable();

  private _selectedItem:BehaviorSubject<(FolderItem|FileItem)> = new BehaviorSubject(null);
  selectedItem:Observable<(FolderItem|FileItem)> = this._selectedItem.asObservable();

  constructor(
    private statusColorPipe: GetCurrentStatusColorPipe
  ) { }

  /**
   * get specifc folder data for a user
   * @param user 
   * @returns 
   */
  getUserFolders(user:string):Observable<FolderItem[]>{
    let folderData:IFolderItem[] = [
      {
        name:'Current Patients',
        files:[
          {
            name:'Patient 123-555',
            id:'1-1',
            dateEvents:[
              {
                date:new Date("2021-06-10"),
                status:'Scan Taken'
              },
              {
                date:new Date("2021-06-11"),
                status:'Approved'
              },
              {
                date:new Date("2021-06-11"),
                status:'Production'
              }
            ]
          },
          {
            name:'Patient 113-532',
            id:'1-2',
            details:'nothing on this file',
            dateEvents:[
              {
                date:new Date("2021-07-10"),
                status:'Scan Taken'
              },
              {
                date:new Date("2021-07-15"),
                status:'Approved'
              }
            ]
          }
        ],
        subFolders:[
          {
            name:'Patients 2021',
            id:'1-3'
          }
        ],
        id:'1',
        details:'This is my first folder details'
      },
      {
        name:'Previous Patients',
        customSort:true,
        files:[
          {
            name:'Patient 222-513',
            sortOrder:0,
            id:'2-1',
            details:'some details for this file',
            dateEvents:[
              {
                date:new Date("2021-06-01"),
                status:'Scan Taken'
              }
            ]
          },
          {
            name:'Patient 454-555',
            sortOrder:3,
            id:'2-2'
          }
        ],
        subFolders:[
          {
            name:'Patient Work in Progress',
            sortOrder:1,
            id:'2-3'
          },
          {
            name:'Patients Completed',
            sortOrder:2,
            id:'3',
            details:'Really important folder',
            dateEvents:[
              {
                date:new Date("2021-05-10"),
                status:'Scan Taken'
              },
              {
                date:new Date("2021-05-20"),
                status:'Approved'
              }
            ],
            subFolders:[
              {
                name:'Patients 2019',
                id:'3-1',
                details:'Also important folder',
                files:[
                  {
                    name:'Patient 456-123',
                    id:'3-2'
                  },
                  {
                    name:'Patient 111-525',
                    id:'3-3',
                    details:'Remember to work on this later',
                    dateEvents:[
                      {
                        date:new Date("2021-06-20"),
                        status:'Scan Taken'
                      },
                      {
                        date:new Date("2021-06-22"),
                        status:'Approved'
                      },
                      {
                        date:new Date("2021-07-10"),
                        status:'Production'
                      }
                    ],
                  }
                ],
                subFolders:[
                  {
                    name:'Patients 2021',
                    id:'3-4',
                    files:[
                      {
                        name:'Patient 222-565',
                        id:'3-5'
                      },
                      {
                        name:'Patient 959-678',
                        id:'3-6'
                      }
                    ]
                  }
                ]
              }
            ],
            files:[
              {
                name:'Patient 123-988',
                id:'3-7'
              }
            ]
          }
        ],
        id:'2'
      }
    ];

    let folders = folderData.map(folder => new FolderItem(folder));
    return of(folders);
  }

  selectFolder(folder:FolderItem){
    this._selectedFolder.next(folder);
    this._selectedItem.next(null);
  }

  selectItem(item:(FolderItem|FileItem)){
    this._selectedItem.next(item);
  }

  getCalendarData(folder:FolderItem){
    let items = folder.flattenItems();
    let events:DateEvent[] = [];
    items.forEach(item => {
      events = [...events,...item.dateEvents];
    });
    let calendarEvents = events.map(event => {
      let calEvent:any = {};
      calEvent.title = event.status;
      let day = ('0' + event.date.getDate()).slice(-2);
      let month = ('0' + (event.date.getMonth()+1)).slice(-2);
      let year = event.date.getFullYear()
      let date = `${year}-${month}-${day}`;
      calEvent.date = date;
      calEvent.color = this.statusColorPipe.transform(event.status);
      return calEvent;
    });

    return calendarEvents;
  }

}
