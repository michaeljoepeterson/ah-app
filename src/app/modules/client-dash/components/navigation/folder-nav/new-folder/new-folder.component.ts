import { Component, OnInit } from '@angular/core';
import { of, Subscription } from 'rxjs';
import { NotificationsService } from '../../../../../notifications/services/notifications.service';
import { FolderItem } from '../../../../../client-dash/models/folder-item';
import { FolderNavService } from '../../../../../client-dash/services/folder-nav.service';
import { DynamicFormData } from '../../../../../../modules/notifications/models/dynamic-form-models';
import { switchMap } from 'rxjs/operators';

/**
 * folder controls
 */
@Component({
  selector: 'app-new-folder',
  templateUrl: './new-folder.component.html',
  styleUrls: ['./new-folder.component.css']
})
export class NewFolderComponent implements OnInit {
  subscriptions:Subscription[] = [];
  selectedFolder:FolderItem;
  newFolderData:DynamicFormData = {
    formTitle:'Create a New Folder',
    fields:[
      {
        label:'Folder Name'
      }
    ]
  };

  constructor(
    private folderService:FolderNavService,
    private notificationService:NotificationsService
  ) { }

  ngOnInit(): void {
    let sub = this.folderService.selectedFolder.subscribe(folder => {
      this.selectedFolder = folder;
    });
    this.subscriptions.push(sub);
  }

  ngOnDestroy(){
    try{
      this.subscriptions.forEach(sub => sub.unsubscribe());
    }
    catch(e){
      console.warn(e);
    }
  }

  createFolder(){
    this.folderService.setEditFolder(this.selectedFolder);
    let formModal = this.notificationService.openDynamicFormModal(this.newFolderData);
    let sub = formModal.componentInstance.formSubmit.pipe(
      switchMap(response => {
        if(response[0].value){
          let folder = new FolderItem();
          folder.name = response[0].value;
          if(!this.selectedFolder){
            return this.folderService.createRootFolder(folder);
          }
          else{
            return this.folderService.createSubFolder(folder,this.selectedFolder);
          }
        }
        else{
          return of(null);
        }
      })
    ).subscribe(resp => {
      formModal.close();
      try{
        sub.unsubscribe();
      }
      catch(e){
        console.warn(e);
      }
    });
  }

  createPatientFile(){

  }

  deleteItem(){

  }
}
