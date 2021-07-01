import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { DateEvent } from '../models/date-event';
import { FolderItem, IFolderItem } from '../models/folder-item';
import {GetCurrentStatusColorPipe} from '../pipes/folder-card.pipe';

@Injectable({
  providedIn: 'root'
})
export class FolderNavService {
  private _selectedFolder:BehaviorSubject<FolderItem> = new BehaviorSubject(null);
  selectedFolder:Observable<FolderItem> = this._selectedFolder.asObservable();

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
        name:'First folder',
        files:[
          {
            name:'file 2',
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
            name:'Couple files here',
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
            name:'my new sub folder',
            id:'1-3'
          }
        ],
        id:'1',
        details:'This is my first folder details'
      },
      {
        name:'Second folder',
        customSort:true,
        files:[
          {
            name:'My file',
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
            name:'My file 2',
            sortOrder:3,
            id:'2-2'
          }
        ],
        subFolders:[
          {
            name:'Folder with no children',
            sortOrder:1,
            id:'2-3'
          },
          {
            name:'Folder with children',
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
                name:'A folder here',
                id:'3-1',
                details:'Also important folder',
                files:[
                  {
                    name:'Some file',
                    id:'3-2'
                  },
                  {
                    name:'Some file 2',
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
                    name:'Got a new sub folder here',
                    id:'3-4',
                    files:[
                      {
                        name:'Some file copy',
                        id:'3-5'
                      },
                      {
                        name:'Some file 2 copy',
                        id:'3-6'
                      }
                    ]
                  }
                ]
              }
            ],
            files:[
              {
                name:'Just one file here',
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
