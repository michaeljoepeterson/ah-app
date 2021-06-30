import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { FolderItem, IFolderItem } from '../models/folder-item';

@Injectable({
  providedIn: 'root'
})
export class FolderNavService {
  private _selectedFolder:BehaviorSubject<FolderItem> = new BehaviorSubject(null);
  selectedFolder:Observable<FolderItem> = this._selectedFolder.asObservable();

  constructor() { }

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
                date:new Date(),
                status:'Scan Taken'
              },
              {
                date:new Date(),
                status:'Approved'
              },
              {
                date:new Date(),
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
                date:new Date(),
                status:'Scan Taken'
              },
              {
                date:new Date(),
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
                date:new Date(),
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
                date:new Date(),
                status:'Scan Taken'
              },
              {
                date:new Date(),
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
                        date:new Date(),
                        status:'Scan Taken'
                      },
                      {
                        date:new Date(),
                        status:'Approved'
                      },
                      {
                        date:new Date(),
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

}
