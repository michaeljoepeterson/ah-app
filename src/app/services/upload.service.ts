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
        let path = `images/${file.name}_${patientId}`;
        let fileRef = this.sotrageRef.child(path);
        await fileRef.put(file);
        this.notificationService.displaySnackBar('File Uploaded!');
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
}
