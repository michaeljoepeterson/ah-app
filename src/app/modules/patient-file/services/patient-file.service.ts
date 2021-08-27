import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { PatientFile } from '../../client-dash/models/patient-file';

@Injectable({
  providedIn: 'root'
})
export class PatientFileService {
  private _selectedFile:BehaviorSubject<PatientFile> = new BehaviorSubject(null);
  /**
   * currently selected form
   */
  selectedFile:Observable<PatientFile> = this._selectedFile.asObservable();

  constructor() { }

  setFile(file:PatientFile){
    this._selectedFile.next(file);
  }
}
