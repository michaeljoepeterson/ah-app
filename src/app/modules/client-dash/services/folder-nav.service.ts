import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { FolderItem, IFolderItem } from '../models/folder-item';

@Injectable({
  providedIn: 'root'
})
export class FolderNavService {

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
            name:'file 2'
          },
          {
            name:'Couple files here'
          }
        ],
        subFolders:[
          {
            name:'my new sub folder'
          }
        ]
      },
      {
        name:'Second folder',
        customSort:true,
        files:[
          {
            name:'My file',
            sortOrder:0
          },
          {
            name:'My file 2',
            sortOrder:3
          }
        ],
        subFolders:[
          {
            name:'Folder with no children',
            sortOrder:1
          },
          {
            name:'Folder with children',
            sortOrder:2,
            subFolders:[
              {
                name:'A folder here',
                files:[
                  {
                    name:'Some file'
                  },
                  {
                    name:'Some file 2'
                  }
                ],
                subFolders:[
                  {
                    name:'Got a new sub folder here',
                    files:[
                      {
                        name:'Some file copy'
                      },
                      {
                        name:'Some file 2 copy'
                      }
                    ]
                  }
                ]
              }
            ],
            files:[
              {
                name:'Just one file here'
              }
            ]
          }
        ]
      }
    ];

    let folders = folderData.map(folder => new FolderItem(folder));
    return of(folders);
  }
}
