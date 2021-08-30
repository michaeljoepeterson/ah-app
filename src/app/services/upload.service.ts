import { Injectable } from '@angular/core';
import firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class UploadService {
  private sotrageRef = firebase.storage().ref();

  constructor() { }

  async uploadImage(file:File){
    let fileRef = this.sotrageRef.child(file.name);
    await fileRef.put(file);
  }
}
