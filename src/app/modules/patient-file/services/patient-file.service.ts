import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { AuthService } from '../../../services/auth.service';
import { PatientFile } from '../../client-dash/models/patient-file';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { CustomFieldValue } from '../../custom-forms/models/custom-field-value';
import { NotificationsService } from '../../notifications/services/notifications.service';
import { CustomForm } from '../../custom-forms/models/custom-form';
import { FormService } from '../../custom-forms/services/form.service';
import { CustomField } from '../../custom-forms/models/custom-field';

@Injectable({
  providedIn: 'root'
})
export class PatientFileService {
  private _selectedFile:BehaviorSubject<PatientFile> = new BehaviorSubject(null);
  /**
   * currently selected form
   */
  selectedFile:Observable<PatientFile> = this._selectedFile.asObservable();

  private _onFileSubmitted:Subject<PatientFile> = new Subject();
  /**
   * currently selected form
   */
  onFileSubmitted:Observable<PatientFile> = this._onFileSubmitted.asObservable();
  private _currentCustomValues:BehaviorSubject<CustomFieldValue[]> = new BehaviorSubject([]);
  /**
   * currently selected form
   */
   currentCustomValues:Observable<CustomFieldValue[]> = this._currentCustomValues.asObservable();
   endpoint:string = 'files';
  
   private _patientForm:Subject<CustomForm> = new Subject();
   /**
    * currently selected form
    */
   patientForm:Observable<CustomForm> = this._patientForm.asObservable();
   

  constructor(
    private http: HttpClient,
    private authService:AuthService,
    private notificationService:NotificationsService,
    private formService:FormService
  ) { }

  setFile(file:PatientFile){
    this._selectedFile.next(file);
  }

  submitFile(file:PatientFile){
    this._onFileSubmitted.next(file);
  }
  
  setValues(values:CustomFieldValue[]){
    this._currentCustomValues.next(values);
  }

  setPatientForm(form:CustomForm){
    this._patientForm.next(form);
  }

  findValue(field:CustomField):CustomFieldValue{
    let values = this._currentCustomValues.value;
    let value = values.find(val => val.parentField === field.id);
    return value;
  }

  getFileValues(file:PatientFile):Observable<CustomFieldValue>{
    let headers = this.authService.getAuthHeaders();
    let options = {
      headers
    };
    let url = `${environment.apiUrl}${this.endpoint}/values/${file.id}`;
    return this.http.get(url,options).pipe(
      map((response:any) => {
        let values = response.fieldValues.map(val => new CustomFieldValue(val));
        this.setValues(values);
        return values;
      }),
      catchError(err => {
        let message = 'Error getting values';
        console.warn(err);
        this.notificationService.displayErrorSnackBar(message,err);
        throw err;
      })
    );
  }

  getFileForm(file:PatientFile):Observable<CustomForm>{
    let headers = this.authService.getAuthHeaders();
    let options = {
      headers
    };
    let url = `${environment.apiUrl}${this.endpoint}/form/values/${file.id}`;
    return this.http.get(url,options).pipe(
      map((response:any) => {
        let form = new CustomForm(response.form);
        console.log('form with vals:',form);
        return form;
      }),
      catchError(err => {
        let message = 'Error getting values';
        console.warn(err);
        this.notificationService.displayErrorSnackBar(message,err);
        throw err;
      })
    );
  }

  getFileData(file:PatientFile):Observable<any>{
    return this.getFileValues(file).pipe(
      switchMap(response => {
        if(file.formType){
          return this.formService.getSingleCustomForm(file.formType);
        }
        else{
          return of(null);
        }
      }),
      tap(response => {
        this.setPatientForm(response);
        return response;
      })
    );
  }

  cleanupPatientDetails(){
    this.setValues([]);
    this.formService.setForm(null);
  }
}
