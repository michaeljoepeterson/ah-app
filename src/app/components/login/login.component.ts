import { Component, OnInit } from '@angular/core';
import { NotificationsService } from 'src/app/modules/notifications/services/notifications.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email:string;
  password:string;

  constructor(
    private authService:AuthService,
    private notificationService:NotificationsService
  ) { }

  ngOnInit(): void {
  }

  async emailLogin(event:any){
    try{
      await this.authService.signInEmail(this.email,this.password);
    }
    catch(e){
      if(e.code !== 'auth/popup-closed-by-user'){
        let message = 'Error logging in with goolge';
        console.warn(message,e);
        this.notificationService.displayErrorSnackBar(message,e);
      }
    }
  }

  async loginWithGoogle(){
    try{
      await this.authService.googleSignIn();
    }
    catch(e){
      if(e.code !== 'auth/popup-closed-by-user'){
        let message = 'Error logging in with goolge';
        console.warn(message,e);
        this.notificationService.displayErrorSnackBar(message,e);
      }
    }
  }

  async loginWithFacebook(){
    try{
      await this.authService.facebookSignIn();
    }
    catch(e){
      if(e.code !== 'auth/popup-closed-by-user'){
        let message = 'Error logging in with goolge';
        console.warn(message,e);
        this.notificationService.displayErrorSnackBar(message,e);
      }
    }
  }

}
