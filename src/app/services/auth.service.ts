import { Injectable } from '@angular/core';
import 'firebase/auth';
import firebase from 'firebase';
import { AngularFireAuth } from "@angular/fire/auth";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { AuthInfo } from '../models/users/authinfo';
import { switchMap,map, concatMap, mergeMap } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  googleAuthProvider:any;
  facebookProvider:any;
  private _authInfo:BehaviorSubject<AuthInfo> = new BehaviorSubject({
    token:'loading'
  });
  authInfo:Observable<AuthInfo> = this._authInfo.asObservable();
  private _isLoggedIn:BehaviorSubject<boolean> = new BehaviorSubject(null);
  isLoggedIn:Observable<boolean> = this._isLoggedIn.asObservable();

  constructor(
    private http: HttpClient,
    private afAuth: AngularFireAuth
  ) { 
    this.googleAuthProvider = new firebase.auth.GoogleAuthProvider();
    this.facebookProvider = new firebase.auth.FacebookAuthProvider();
    this.afAuth.authState.pipe(
      mergeMap(async (user) => {
        let token = null;
        let email = null;
        if(user){
          email = user.email;
          token = await user.getIdToken();
        }
        return {token,email};
      })
    ).subscribe(response => {
      let auth:AuthInfo = {
        token:response.token,
        email:response.email
      };
      let isLoggedIn = false;
      if(response.token && response.email){
        isLoggedIn = true;
              
      }
      this._authInfo.next(auth);
      this._isLoggedIn.next(isLoggedIn);
    });
  }

  googleSignIn():Promise<any>{
    try{
      return this.afAuth.signInWithPopup(this.googleAuthProvider);
    }
    catch(e){
      throw e;
    }
  }

  logout():Promise<any>{
    return this.afAuth.signOut();
  }

  facebookSignIn():Promise<any>{
    try{
      return this.afAuth.signInWithPopup(this.facebookProvider);
    }
    catch(e){
      throw e;
    }
  }

  getToken():string{
    return this._authInfo.value.token ? this._authInfo.value.token : null;
  }

  createUserEmail(email:string,pass:string):Promise<any>{
    return this.afAuth.createUserWithEmailAndPassword(email,pass)
  }

  getAuthHeaders():HttpHeaders{
    let headers = new HttpHeaders();
    let token = this.getToken();
    headers = headers.append('authtoken',token);
    return headers;
  }

  /**
   * sign in using email and password auth
   * @param email 
   * @param pass 
   */
  signInEmail(email:string,pass:string){
    return this.afAuth.signInWithEmailAndPassword(email,pass);
  }

  createAppUser():Observable<any>{
    let url = `${environment.apiUrl}users`;
    let headers = this.getAuthHeaders();
    let options = {
      headers
    };
    //to do add model
    let user = {
      user:{
        email:this._authInfo.value.email
      }
    };
    return this.http.post(url,user,options);
  }

  checkAppUser(email:string,token?:string):Observable<any>{
    return this.getAppUser(email,token).pipe(
      switchMap(response => {
        console.log(response);
        if(response && response.user){
          return of(null);
        }
        else{
          return this.createAppUser();
        }
      })
    )
  }

  getAppUser(email?:string,token?:string):Observable<any>{
    email = email ? email : this._authInfo.value.email;
    let url = `${environment.apiUrl}users/${email}`;
    let headers:HttpHeaders;
    if(token){
      headers = new HttpHeaders();
      headers = headers.append('authtoken',token);
    }
    else{
      headers = this.getAuthHeaders();
    }
    let options = {
      headers
    };
    return this.http.get(url,options);
  }

}
