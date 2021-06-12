import { Component, OnInit } from '@angular/core';
import { NotificationsService } from 'src/app/modules/notifications/services/notifications.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private authService:AuthService,
    private notificationService:NotificationsService
  ) { }

  ngOnInit(): void {
  }

  emailLogin(event:any){
    console.log('login email');
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
