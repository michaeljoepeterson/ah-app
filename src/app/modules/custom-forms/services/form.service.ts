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
   * emitter when new form is added
   */
  onFormAdded:Observable<CustomForm> = this._onFormAdded.asObservable();

  private _onSectionAdded:BehaviorSubject<CustomSection> = new BehaviorSubject(null);
  /**
   * forms for the project
   */
  onSectionAdded:Observable<CustomSection> = this._onSectionAdded.asObservable();

  private _onFieldAdded:BehaviorSubject<CustomField> = new BehaviorSubject(null);
  /**
   * forms for the project
   */
  onFieldAdded:Observable<CustomField> = this._onFieldAdded.asObservable();

  private _onFormUpdated:BehaviorSubject<CustomForm> = new BehaviorSubject(null);
  /**
   * forms for the project
   */
  onFormUpdated:Observable<CustomForm> = this._onFormUpdated.asObservable();

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

  setForm(form:CustomForm){
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
        this.setForm(form);
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

  /**
   * create a new form
   * @param form 
   * @returns 
   */
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

  /**
   * create a new section
   * @param section 
   * @returns 
   */
  createNewSection(section:CustomSection):Observable<CustomSection>{
    let headers = this.authService.getAuthHeaders();
    let url = `${environment.apiUrl}${this.endpoint}/section`;
    let options = {
      headers
    };
    let sectionData = section.serialize();
    sectionData.createdAt = new Date();
    let body = {
      section:sectionData
    };

    return this.http.post(url,body,options).pipe(
      map((response:any) => {
        let newSection = new CustomSection(response.section);
        this._onSectionAdded.next(newSection);
        return newSection;
      }),
      catchError(err => {
        let message = 'Error creating section';
        this.notificationService.displayErrorSnackBar(message,err);
        throw err;
      })
    )
  }

  /**
   * generate generic empty section
   * @returns 
   */
  generateNewSection(parentSection:CustomSection):CustomSection{
    let newSection = new CustomSection();
    newSection.name = 'New Section';
    newSection.createdAt = new Date();
    newSection.ancestorSections = parentSection.ancestorSections;
    newSection.ancestorSections.push(parentSection.id);
    newSection.parentSection = parentSection.id;
    newSection.parentForm = parentSection.parentForm;

    return newSection;
  }

  /**
   * generate generic empty section
   * @returns 
   */
  generateNewSectionFromForm(form:CustomForm):CustomSection{
    let newSection = new CustomSection();
    newSection.name = 'New Section';
    newSection.createdAt = new Date();
    newSection.parentForm = form;

    return newSection;
  }

  generateNewField(parentSection:CustomSection):CustomField{
    let newField = new CustomField();
    newField.name = 'New Field';
    newField.createdAt = new Date();
    newField.ancestorSections = parentSection.ancestorSections;
    newField.ancestorSections.push(parentSection.id);
    newField.parentSection = parentSection.id;
    newField.parentForm = parentSection.parentForm;

    return newField;
  }

  /**
   * generate generic empty section
   * @returns 
   */
  generateNewFieldFromForm(form:CustomForm):CustomField{
    let newField = new CustomField();
    newField.name = 'New Field';
    newField.createdAt = new Date();
    newField.parentForm = form;

    return newField;
  }

  /**
   * create a new field
   * @param field 
   * @returns 
   */
  createNewField(field:CustomField):Observable<CustomField>{
    let headers = this.authService.getAuthHeaders();
    let url = `${environment.apiUrl}${this.endpoint}/field`;
    let options = {
      headers
    };
    let fieldData = field.serialize();
    fieldData.createdAt = new Date();
    let body = {
      field:fieldData
    };

    return this.http.post(url,body,options).pipe(
      map((response:any) => {
        let newfield = new CustomField(response.field);
        this._onFieldAdded.next(newfield);
        return newfield;
      }),
      catchError(err => {
        let message = 'Error creating field';
        this.notificationService.displayErrorSnackBar(message,err);
        throw err;
      })
    )
  }

  /**
   * update a form
   * @param form 
   */
  updateForm(form:CustomForm):Observable<CustomForm>{
    let headers = this.authService.getAuthHeaders();
    let url = `${environment.apiUrl}${this.endpoint}/${form.id}`;
    let options = {
      headers
    };

    let formData = form.serialize();
    let body = {
      form:formData
    };

    return this.http.put(url,body,options).pipe(
      map((response:any) => {
        let newForm = new CustomForm(response.form);
        this._onFormUpdated.next(newForm);
        return newForm;
      }),
      catchError(err => {
        let message = 'Error updating form';
        this.notificationService.displayErrorSnackBar(message,err);
        throw err;
      })
    )
  }

    /**
     * update a section
     * @param section 
     * @returns 
     */
    updateSection(section:CustomSection):Observable<CustomSection>{
      let headers = this.authService.getAuthHeaders();
      let url = `${environment.apiUrl}${this.endpoint}/section/${section.id}`;
      let options = {
        headers
      };
      let sectionData = section.serialize();
      let body = {
        section:sectionData
      };

      return this.http.put(url,body,options).pipe(
        map((response:any) => {
          let newSection = new CustomSection(response.section);
          return newSection;
        }),
        catchError(err => {
          let message = 'Error updating section';
          this.notificationService.displayErrorSnackBar(message,err);
          throw err;
        })
      )
  }
}
