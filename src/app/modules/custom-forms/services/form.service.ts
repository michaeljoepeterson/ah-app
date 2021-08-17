import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';
import { AuthService } from '../../../services/auth.service';
import { NotificationsService } from '../../notifications/services/notifications.service';
import { fieldTypes, FieldTypes } from '../constants';
import { CustomField } from '../models/custom-field';
import { CustomForm } from '../models/custom-form';
import { CustomSection } from '../models/custom-section';

@Injectable({
  providedIn: 'root'
})
export class FormService {

    
  private _selectedForm:BehaviorSubject<CustomForm> = new BehaviorSubject(null);
  /**
   * currently selected form
   */
  selectedForm:Observable<CustomForm> = this._selectedForm.asObservable();

  private _isEditing:BehaviorSubject<boolean> = new BehaviorSubject(null);
  /**
   * track if form is in editing mode
   */
  isEditing:Observable<boolean> = this._isEditing.asObservable();

  private _forms:BehaviorSubject<CustomForm[]> = new BehaviorSubject(null);
  /**
   * forms for the project
   */
  forms:Observable<CustomForm[]> = this._forms.asObservable();
  private _newFieldUpdated:BehaviorSubject<boolean> = new BehaviorSubject(null);
  /**
   * emit changes when new section updated
   */
  newFieldUpdated:Observable<boolean> = this._newFieldUpdated.asObservable();
  private _onFormAdded:BehaviorSubject<CustomForm> = new BehaviorSubject(null);
  /**
   * forms for the project
   */
   onFormAdded:Observable<CustomForm> = this._onFormAdded.asObservable();

  endpoint:string = 'form';
  fieldTypes:FieldTypes = fieldTypes;

  constructor(
    private authService:AuthService,
    private http: HttpClient,
    private notificationService:NotificationsService
  ) { }

  setForms(forms:CustomForm[]){
    this._forms.next(forms);
  }

  updateForm(form:CustomForm){
    let currentForms = this._forms.value;
    let index = currentForms.findIndex(f => f.id === form.id);
    currentForms[index] = form;
    this.setForms(currentForms);
  }

  /**
   * get all custom forms for a project
   */
  getCustomForms():Observable<CustomForm[]>{
    let headers = this.authService.getAuthHeaders();
    let url = `${environment.apiUrl}${this.endpoint}`;
    let options = {
      headers
    };
    return this.http.get(url,options).pipe(
      map((response:any) => {
        let forms = response.forms.map(form => new CustomForm(form));
        this.setForms(forms);
        return forms;
      })
    );
  }

  /**
   * get a single custom form
   * @param id 
   * @returns 
   */
  getSingleCustomForm(id:string):Observable<CustomForm>{
    let headers = this.authService.getAuthHeaders();
    let url = `${environment.apiUrl}${this.endpoint}/${id}`;
    let options = {
      headers
    };
    return this.http.get(url,options).pipe(
      map((response:any) => {
        let form = new CustomForm(response.form);
        this.updateForm(form);
        return form;
      }),
      catchError(err => {
        let message = 'Error getting forms';
        this.notificationService.displayErrorSnackBar(message,err);
        throw err;
      })
    );
  }

  setSelectedForm(form:CustomForm){
    this._selectedForm.next(form);
  }

  setEditing(isEditing:boolean){
    this._isEditing.next(isEditing);
  }

  updateNewField(confirmField:boolean){
    this._newFieldUpdated.next(confirmField);
  }

  addNewSection(combinedChildren:(CustomField|CustomSection)[]){
    let newCombinedSections = [...combinedChildren];
    let newField = new CustomSection();
    newField.name = 'New Section';
    newCombinedSections.push(newField);
    return newCombinedSections;
}

  addNewField(combinedChildren:(CustomField|CustomSection)[]){
    let newCombinedSections = [...combinedChildren];
    let newField = new CustomField();
    newField.name = 'New Field';
    newField.fieldType = fieldTypes.text;
    newCombinedSections.push(newField);
    return newCombinedSections;
  }

  removeNewItems(combinedChildren:(CustomField|CustomSection)[]){
    return combinedChildren.filter(child => child.id);
  }

  createNewForm(form:CustomForm):Observable<CustomForm>{
    let headers = this.authService.getAuthHeaders();
    let url = `${environment.apiUrl}${this.endpoint}`;
    let options = {
      headers
    };

    let formData = form.serialize();
    formData.createdAt = new Date();
    let body = {
      form:formData
    };

    return this.http.post(url,body,options).pipe(
      map((response:any) => {
        let newForm = new CustomForm(response.form);
        this._onFormAdded.next(newForm);
        return newForm;
      }),
      catchError(err => {
        let message = 'Error creating form';
        this.notificationService.displayErrorSnackBar(message,err);
        throw err;
      })
    )
  }
}
