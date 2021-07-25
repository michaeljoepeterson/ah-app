import { Component, OnInit } from '@angular/core';
import { of, Subscription } from 'rxjs';
import { NotificationsService } from '../../../../../notifications/services/notifications.service';
import { FolderItem,baseFolderFormData } from '../../../../models/folder-item';
import { FolderNavService } from '../../../../services/folder-nav.service';
import { DynamicFormData } from '../../../../../notifications/models/dynamic-form-models';
import { switchMap } from 'rxjs/operators';
import { baseFileFormData, FileItem } from '../../../../models/file-item';

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
  newFolderData:DynamicFormData = baseFolderFormData;
  newFileData:DynamicFormData = baseFileFormData;
  formWidth:string = '30%';
  selectedItem:(FolderItem|FileItem);

  constructor(
    private folderService:FolderNavService,
    private notificationService:NotificationsService
  ) { }

  ngOnInit(): void {
    let sub = this.folderService.selectedFolder.subscribe(folder => {
      this.selectedFolder = folder;
    });
    let itemSub = this.folderService.selectedItem.subscribe(item => {
      this.selectedItem = item;
    })
    this.subscriptions = [sub,itemSub];
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
    let formModal = this.notificationService.openDynamicFormModal(this.newFolderData,this.formWidth);
    console.log(this.selectedFolder);
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
    if(!this.selectedFolder){
      this.notificationService.displaySnackBar('Please select a folder before creating a file');
      return;
    }
    let formModal = this.notificationService.openDynamicFormModal(this.newFileData,this.formWidth);
    let sub = formModal.componentInstance.formSubmit.pipe(
      switchMap(response => {
        if(response[0].value){
          let file = new FileItem();
          file.name = response[0].value;
          return this.folderService.createFile(file,this.selectedFolder);
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

  deleteItem(){
    if(this.selectedItem instanceof FolderItem){
      this.deleteFolder(this.selectedItem);
    }
    else if(this.selectedItem instanceof FileItem){
      this.deleteFile(this.selectedItem);
    }
    else{
      return;
    }
  }

  deleteFolder(folder:FolderItem){
    let message = 'Are you sure you want to delete this folder? This will delete the folder and all patient files within it.';
    let confirmation = this.notificationService.openConfirmModal({
      message
    });

    let sub = confirmation.afterClosed().pipe(
      switchMap(response => {
        if(response){
          return this.folderService.deleteFolder(folder);
        }
        else{
          return of(null);
        }
      })
    ).subscribe(resp => {
      this.folderService.selectFolder(null);
      this.folderService.selectItem(null);
      try{
        sub.unsubscribe();
      }
      catch(e){
        console.warn(e);
      }
    });
  }

  deleteFile(file:FileItem){
    let message = 'Are you sure you want to delete this file?';
    let confirmation = this.notificationService.openConfirmModal({
      message
    });

    let sub = confirmation.afterClosed().pipe(
      switchMap(response => {
        if(response){
          return this.folderService.deleteFile(file);
        }
        else{
          return of(null);
        }
      })
    ).subscribe(resp => {
      try{
        sub.unsubscribe();
      }
      catch(e){
        console.warn(e);
      }
    });
  }

  editFolder(){
    if(this.selectedItem instanceof FolderItem){
      this.updateFolder(this.selectedItem);
    }
    else if(this.selectedItem instanceof FileItem){
      this.updateFile(this.selectedItem);
    }
    else{
      return;
    }
  }

  updateFolder(newFolder:FolderItem){
    let formData = {...this.newFolderData};
    formData.formTitle = 'Update Folder';
    let formModal = this.notificationService.openDynamicFormModal(formData,this.formWidth);
    let sub = formModal.componentInstance.formSubmit.pipe(
      switchMap(response => {
        if(response[0].value){
          let folder = new FolderItem(newFolder);
          folder.name = response[0].value;
          return this.folderService.updateFolder(folder);
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

  updateFile(newFile:FileItem){
    let fileFormData = {...this.newFileData};
    fileFormData.formTitle = 'Update Patient File'
    let formModal = this.notificationService.openDynamicFormModal(fileFormData,this.formWidth);
    let sub = formModal.componentInstance.formSubmit.pipe(
      switchMap(response => {
        if(response[0].value){
          let file = new FileItem(newFile);
          file.name = response[0].value;
          return this.folderService.updateFile(file);
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
}
