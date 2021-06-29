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
            name:'Couple files here'
          },
          {
            name:'file 2'
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
        files:[
          {
            name:'My file'
          },
          {
            name:'My file 2'
          }
        ],
        subFolders:[
          {
            name:'Folder with no children'
          },
          {
            name:'Folder with children',
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
