import { Injectable } from '@angular/core';
import 'firebase/auth';
import firebase from 'firebase';
import { AngularFireAuth } from "@angular/fire/auth";
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthInfo } from '../models/users/authinfo';
import { switchMap,map, concatMap, mergeMap } from 'rxjs/operators';

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
    console.log('auth')
    this.afAuth.authState.pipe(
      mergeMap(async (user) => {
        let token = null;
        if(user){
          token = await user.getIdToken();
        }
        return token;
      })
    ).subscribe(response => {
      let auth:AuthInfo = {
        token:response
      };
      let isLoggedIn = false;
      if(response){
        isLoggedIn = true;        
      }
      this._isLoggedIn.next(isLoggedIn);
      this._authInfo.next(auth);
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

  createUserEmail(email:string,pass:string):Promise<any>{
    return this.afAuth.createUserWithEmailAndPassword(email,pass)
  }

  /**
   * sign in using email and password auth
   * @param email 
   * @param pass 
   */
  signInEmail(email:string,pass:string){
    return this.afAuth.signInWithEmailAndPassword(email,pass);
  }
}
