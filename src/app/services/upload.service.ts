import { Injectable } from '@angular/core';
import firebase from 'firebase';
import { PatientFile } from '../modules/client-dash/models/patient-file';
import { NotificationsService } from '../modules/notifications/services/notifications.service';

export interface UploadRequest{
  fileName:string;
  type:string;
  file:File;
}

@Injectable({
  providedIn: 'root'
})
export class UploadService {
  private sotrageRef = firebase.storage().ref();
  imagePath:string = 'images';
  filesPath:string = 'files';
  
  private _uploadRequests:UploadRequest[] = [];

  constructor(
    private notificationService:NotificationsService
  ) { }

  async uploadImage(file:File,patientId:string){
    console.log(file);
    try{
      let imageType = 'image';
      if(file.type.includes(imageType)){
        let path = `${this.imagePath}/${patientId}_${file.name}`;
        let fileRef = this.sotrageRef.child(path);
        await fileRef.put(file);
        this.notificationService.displaySnackBar('Image Uploaded!');
      }
      else{
        const message = 'Please provide an image to upload';
        this.notificationService.displaySnackBar(message);
        throw {
          message
        };
      }
    }
    catch(e){
      let message = 'Error uploading image'
      console.warn(message,e);
      this.notificationService.displayErrorSnackBar(message,e);
      throw e;
    }
  }

  async uploadFile(file:File,patientId:string){
    try{
      let path = `${this.filesPath}/${patientId}_${file.name}`;
      let fileRef = this.sotrageRef.child(path);
      await fileRef.put(file);
      this.notificationService.displaySnackBar('File Uploaded!');
    }
    catch(e){
      let message = 'Error uploading file'
      console.warn(message,e);
      this.notificationService.displayErrorSnackBar(message,e);
      throw e;
    }
  }

  async getImage(filePath:string,patientId:string){
    let path = `${this.imagePath}/${patientId}_${filePath}`;
    try{
      let url = await this.sotrageRef.child(path).getDownloadURL();
      return url;
    }
    catch(e){
      let message = 'Error getting image'
      console.warn(message,e);
      this.notificationService.displayErrorSnackBar(message,e);
      throw e;
    }
  }

  async getFile(filePath:string,patientId:string){
    let path = `${this.filesPath}/${patientId}_${filePath}`;
    try{
      let url = await this.sotrageRef.child(path).getDownloadURL();
      return url;
    }
    catch(e){
      let message = 'Error getting file'
      console.warn(message,e);
      this.notificationService.displayErrorSnackBar(message,e);
      throw e;
    }
  }

  async deleteImage(filePath:string,patientId:string){
    try{
      let imageRef = this.sotrageRef.child(`${this.imagePath}/${patientId}_${filePath}`);
      await imageRef.delete();
    }
    catch(e){
      console.warn(e);
      let message = 'Error deleting file'
      console.warn(message,e);
      this.notificationService.displayErrorSnackBar(message,e);
      throw e;
    }
  }

  async deleteFile(filePath:string,patientId:string){
    try{
      let fileRef = this.sotrageRef.child(`${this.filesPath}/${patientId}_${filePath}`);
      await fileRef.delete();
    }
    catch(e){
      console.warn(e);
      let message = 'Error deleting file'
      console.warn(message,e);
      this.notificationService.displayErrorSnackBar(message,e);
      throw e;
    }
  }

  registerUploadRequest(fileName:string,type:string,file:File){
    this._uploadRequests.push({
      fileName,
      type,
      file
    });
  }

  getUploadRequests(){
    return this._uploadRequests;
  }

  requestsFinished(){
    this._uploadRequests = [];
  }
}
