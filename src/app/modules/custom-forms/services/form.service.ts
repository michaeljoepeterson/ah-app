import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';
import { AuthService } from '../../../services/auth.service';
import { NotificationsService } from '../../notifications/services/notifications.service';
import { CustomForm } from '../models/custom-form';

@Injectable({
  providedIn: 'root'
})
export class FormService {

  private _forms:BehaviorSubject<CustomForm[]> = new BehaviorSubject(null);
  forms:Observable<CustomForm[]> = this._forms.asObservable();

  endpoint:string = 'form';

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
        console.log('forms',response);
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
        console.log('form',response);
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
}
