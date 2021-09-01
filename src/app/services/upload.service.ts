import { Injectable } from '@angular/core';
import firebase from 'firebase';
import { NotificationsService } from '../modules/notifications/services/notifications.service';

@Injectable({
  providedIn: 'root'
})
export class UploadService {
  private sotrageRef = firebase.storage().ref();

  constructor(
    private notificationService:NotificationsService
  ) { }

  async uploadImage(file:File,patientId:string){
    console.log(file);
    try{
      let imageType = 'image';
      if(file.type.includes(imageType)){
        let path = `images/${patientId}_${file.name}`;
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
      this.notificationService.displayErrorSnackBar(message,message);
      throw e;
    }
  }

  async uploadFile(file:File,patientId:string){
    try{
      let path = `files/${patientId}_${file.name}`;
      let fileRef = this.sotrageRef.child(path);
      await fileRef.put(file);
      this.notificationService.displaySnackBar('File Uploaded!');
    }
    catch(e){
      let message = 'Error uploading file'
      console.warn(message,e);
      this.notificationService.displayErrorSnackBar(message,message);
      throw e;
    }
  }

  async getImage(filePath:string){
    let path = `images/${filePath}`;
    try{
      let url = await this.sotrageRef.child(path).getDownloadURL();
      return url;
    }
    catch(e){
      let message = 'Error getting image'
      console.warn(message,e);
      this.notificationService.displayErrorSnackBar(message,message);
      throw e;
    }
  }

  async getFile(filePath:string){
    let path = `files/${filePath}`;
    try{
      let url = await this.sotrageRef.child(path).getDownloadURL();
      return url;
    }
    catch(e){
      let message = 'Error getting file'
      console.warn(message,e);
      this.notificationService.displayErrorSnackBar(message,message);
      throw e;
    }
  }
}
