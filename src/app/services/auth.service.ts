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
      }
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
}
