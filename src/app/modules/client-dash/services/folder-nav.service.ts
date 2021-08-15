import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { AuthService } from '../../../services/auth.service';
import { DateEvent } from '../models/date-event';
import { FileItem } from '../models/file-item';
import { FolderItem, IFolderItem } from '../models/folder-item';
import {GetCurrentStatusColorPipe} from '../pipes/folder-card.pipe';
import { environment } from '../../../../environments/environment';
import { User } from '../../../models/users/user';
import { catchError, map } from 'rxjs/operators';
import { NotificationsService } from '../../notifications/services/notifications.service';

@Injectable({
  providedIn: 'root'
})
export class FolderNavService {
  private _selectedFolder:BehaviorSubject<FolderItem> = new BehaviorSubject(null);
  /**
   * currently selectd folder
   */
  selectedFolder:Observable<FolderItem> = this._selectedFolder.asObservable();

  private _selectedItem:BehaviorSubject<(FolderItem|FileItem)> = new BehaviorSubject(null);
  /**
   * currently selected item to populate details section, selected item from the folder nav
   */
  selectedItem:Observable<(FolderItem|FileItem)> = this._selectedItem.asObservable();

  /**
   * current user folders
   */
  private _currentFolders:BehaviorSubject<FolderItem[]> = new BehaviorSubject(null);
  /**
   * currently loaded folders
   */
  currentFolders:Observable<FolderItem[]> = this._currentFolders.asObservable();

  private _editFolder:BehaviorSubject<FolderItem> = new BehaviorSubject(null);
  /**
   * folder for editing
   */
  editFolder:Observable<FolderItem> = this._editFolder.asObservable();

  endpoint:string = 'folders';

  constructor(
    private statusColorPipe: GetCurrentStatusColorPipe,
    private authService:AuthService,
    private http: HttpClient,
    private notificationService:NotificationsService
  ) { }

  /**
   * get specifc folder data for a user
   * @param user 
   * @returns 
   */
  getUserFolders():Observable<FolderItem[]>{
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
    //this._selectedItem.next(folder);
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

  /**
   * get folder data from the provided id
   * @param id 
   */
  getFolderData(id:string):Observable<FolderItem[]>{
    let headers = this.authService.getAuthHeaders();
    let url = `${environment.apiUrl}${this.endpoint}/${id}`;
    let options = {
      headers
    };
    return this.http.get(url,options).pipe(
      map((response:any) => {
        let folders = response.folders.map(folder => new FolderItem(folder));
        this.setFolders(folders);
        return folders;
      })
    );
  }

  setEditFolder(folder:FolderItem){
    this._editFolder.next(folder);
  }

  /**
   * set the current folders
   * @param folders 
   */
  setFolders(folders:FolderItem[]){
    this._currentFolders.next(folders);
  }

  /**
   * find a specific folder from a list of folders
   * @param folders 
   * @param targetFolderId 
   * @returns 
   */
  findFolder(folders:FolderItem[],targetFolderId:string):FolderItem{
    for(let folder of folders){
      if(folder.id === targetFolderId){
        return folder;
      }

      if(folder.subFolders.length > 0){
        let foundFolder = this.findFolder(folder.subFolders,targetFolderId);
        if(foundFolder){
          return foundFolder;
        } 
      }
    }

    return null;
  }

  /**
   * create a root folder and update front end with new folder
   * @param folder 
   */
  createRootFolder(folder:FolderItem):Observable<any>{
    let headers = this.authService.getAuthHeaders();
    let url = `${environment.apiUrl}${this.endpoint}/folder`;
    let body ={
      folder:folder.serialize()
    };

    let options = {
      headers
    };
    return this.http.post(url,body,options).pipe(
      map((response:any) => {
        this.notificationService.displaySnackBar('Folder Created!');
        let currentFolders = this._currentFolders.value;
        folder.id = response.folder.id;
        currentFolders.push(folder);
        this.setFolders(currentFolders);
        return response;
      }),
      catchError(err => {
        this.notificationService.displayErrorSnackBar('Error creating folder',err);
        throw err;
      })
    );
  }

  /**
   * create a root folder and update front end with new folder
   * @param folder 
   */
   createSubFolder(folder:FolderItem,parentFolder:FolderItem):Observable<any>{
    let headers = this.authService.getAuthHeaders();
    let url = `${environment.apiUrl}${this.endpoint}/subfolder`;
    folder.ancestors = [...parentFolder.ancestors];
    folder.ancestors.push(parentFolder.id);
    folder.parent = parentFolder.id;

    let body ={
      folder:folder.serialize()
    };

    let options = {
      headers
    };
    
    return this.http.post(url,body,options).pipe(
      map((response:any) => {
        let newFolder:FolderItem = response.folder;
        this.notificationService.displaySnackBar('Sub Folder Created!');
        let currentFolders = this._currentFolders.value;
        folder.id = newFolder.id;
        let foundFolder = this.findFolder(currentFolders,parentFolder.id);
        foundFolder.subFolders.push(folder);
        this.setFolders(currentFolders);
        return response;
      }),
      catchError(err => {
        this.notificationService.displayErrorSnackBar('Error creating folder',err);
        throw err;
      })
    );
  }

  createFile(file:FileItem,parentFolder:FolderItem):Observable<any>{
    let headers = this.authService.getAuthHeaders();
    let url = `${environment.apiUrl}${this.endpoint}/file`;
    file.ancestors = [...parentFolder.ancestors];
    file.ancestors.push(parentFolder.id);
    file.parent = parentFolder.id;

    let body ={
      file
    };

    let options = {
      headers
    };

    return this.http.post(url,body,options).pipe(
      map((response:any) => {
        let newFile:FileItem = response.file;
        this.notificationService.displaySnackBar('File Created!');
        let currentFolders = this._currentFolders.value;
        file.id = newFile.id;
        let foundFolder = this.findFolder(currentFolders,parentFolder.id);
        foundFolder.files.push(file);
        this.setFolders(currentFolders);
        return response;
      }),
      catchError(err => {
        this.notificationService.displayErrorSnackBar('Error creating file',err);
        throw err;
      })
    );
  }

  /**
   * remove the target folder from the passed folders sub folder lists 
   * @param folders 
   * @param targetFolderId 
   */
  removeFolder(folders:FolderItem[],targetFolderId:string){
    for(let folder of folders){
      let hasFolder = folder.subFolders.find(f => f.id === targetFolderId);
      if(hasFolder){
        folder.subFolders = folder.subFolders.filter(f => f.id !== targetFolderId);
        return;
      }
      else{
        this.removeFolder(folder.subFolders,targetFolderId);
      }
    }
  }

  /**
   * remove the target file from the folder tree
   * @param folders 
   * @param targetFileId 
   * @returns 
   */
  removeFile(folders:FolderItem[],targetFileId:string){
    for(let folder of folders){
      let hasFile = folder.files.find(f => f.id === targetFileId);
      if(hasFile){
        folder.files = folder.files.filter(f => f.id !== targetFileId);
        return;
      }
      else{
        this.removeFile(folder.subFolders,targetFileId);
      }
    }
  }

  /**
   * remove a root folder
   * @param folders 
   * @param targetFolderId 
   */
  removeRootFolder(folders:FolderItem[],targetFolderId:string):FolderItem[]{
    return folders.filter(f => f.id !== targetFolderId);
  }

  /**
   * delete the provided folder and all child elements and update internal 
   * folders property
   * @param folder 
   * @returns 
   */
  deleteFolder(folder:FolderItem):Observable<any>{
    let headers = this.authService.getAuthHeaders();
    let url = `${environment.apiUrl}${this.endpoint}/folder/${folder.id}`;
    let options = {
      headers
    };

    return this.http.delete(url,options).pipe(
      map((response:any) => {
        this.notificationService.displaySnackBar('Folder Deleted!');
        let currentFolders = [...this._currentFolders.value];
        currentFolders = this.removeRootFolder(currentFolders,folder.id);
        //if root folder not removed then search tree for sub folder to remove
        if(currentFolders.length === this._currentFolders.value.length){
          this.removeFolder(currentFolders,folder.id);
        }
        this.setFolders(currentFolders);
        return response;
      }),
      catchError(err => {
        this.notificationService.displayErrorSnackBar('Error deleting folder',err);
        throw err;
      })
    );
  }

  /**
   * delete the provided file and update folders prop
   * @param file 
   * @returns 
   */
  deleteFile(file:FileItem):Observable<any>{
    let headers = this.authService.getAuthHeaders();
    let url = `${environment.apiUrl}${this.endpoint}/file/${file.id}`;
    let options = {
      headers
    };

    return this.http.delete(url,options).pipe(
      map((response:any) => {
        this.notificationService.displaySnackBar('Folder Deleted!');
        let currentFolders = [...this._currentFolders.value];
        this.removeFile(currentFolders,file.id);
        this.setFolders(currentFolders);
        return response;
      }),
      catchError(err => {
        this.notificationService.displayErrorSnackBar('Error deleting folder',err);
        throw err;
      })
    );
  }

  updateFolder(folder:FolderItem):Observable<any>{
    if(folder.parent){
      return this.updateSubFolder(folder);
    }
    else{
      return this.updateRootFolder(folder);
    }
  }

  updateRootFolder(folder:FolderItem):Observable<any>{
    let headers = this.authService.getAuthHeaders();
    let url = `${environment.apiUrl}${this.endpoint}/folder/${folder.id}`;

    let body ={
      folder:folder.serialize()
    };

    let options = {
      headers
    };
    
    return this.http.put(url,body,options).pipe(
      map((response:any) => {
        let newFolder:FolderItem = response.folder;
        this.notificationService.displaySnackBar('Folder Updated!');
        let currentFolders = this._currentFolders.value;
        let foundFolder = this.findFolder(currentFolders,folder.id);
        foundFolder.init(newFolder);
        this.setFolders(currentFolders);
        return response;
      }),
      catchError(err => {
        this.notificationService.displayErrorSnackBar('Error creating folder',err);
        throw err;
      })
    );
  }

  updateSubFolder(folder:FolderItem):Observable<any>{
    let headers = this.authService.getAuthHeaders();
    let url = `${environment.apiUrl}${this.endpoint}/subfolder/${folder.id}`;

    let body ={
      folder:folder.serialize()
    };

    let options = {
      headers
    };
    
    return this.http.put(url,body,options).pipe(
      map((response:any) => {
        let newFolder:FolderItem = response.folder;
        this.notificationService.displaySnackBar('Folder Updated!');
        let currentFolders = this._currentFolders.value;
        let foundFolder = this.findFolder(currentFolders,folder.id);
        foundFolder.init(newFolder);
        this.setFolders(currentFolders);
        return response;
      }),
      catchError(err => {
        this.notificationService.displayErrorSnackBar('Error creating folder',err);
        throw err;
      })
    );
  }

  updateFile(file:FileItem):Observable<any>{
    let headers = this.authService.getAuthHeaders();
    let url = `${environment.apiUrl}${this.endpoint}/file/${file.id}`;

    let body ={
      file:file.serialize()
    };

    let options = {
      headers
    };
    
    return this.http.put(url,body,options).pipe(
      map((response:any) => {
        let newFile:FileItem = response.file;
        this.notificationService.displaySnackBar('Folder Updated!');
        let currentFolders = this._currentFolders.value;
        let foundFile = this.findFile(currentFolders,file.id);
        foundFile.init(newFile);
        this.setFolders(currentFolders);
        return response;
      }),
      catchError(err => {
        this.notificationService.displayErrorSnackBar('Error creating folder',err);
        throw err;
      })
    );
  }

  findFile(folders:FolderItem[],targetFileId:string):FileItem{
    for(let folder of folders){
      let foundFile = folder.files.find(file => file.id === targetFileId);
      if(foundFile){
        return foundFile
      }
      if(folder.subFolders.length > 0){
        let foundFile = this.findFile(folder.subFolders,targetFileId);
        if(foundFile){
          return foundFile;
        } 
      }
    }

    return null;
  }
}
