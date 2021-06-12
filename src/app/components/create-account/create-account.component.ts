import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { NotificationsService } from '../../modules/notifications/services/notifications.service';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.css']
})
export class CreateAccountComponent implements OnInit {
  email:string;
  password:string;
  confirmPass:string;

  emailError:string;
  passwordError:string;
  confrimPassError:string;

  constructor(
    private notificationService:NotificationsService,
    private authService:AuthService
  ) { }

  ngOnInit(): void {
  }

  handleFormErrors():boolean{
    let hasError = false;
    if(!this.email){
      this.emailError = 'Please Enter a Valid Email'; 
      hasError = true;
    }

    if(!this.password){
      this.passwordError = 'Please Enter a Valid Password'; 
      hasError = true;
    }

    if(!this.confirmPass){
      this.confrimPassError = 'Please Enter a Valid Password'; 
      hasError = true;
    }

    if(this.confirmPass !== this.password){
      this.confrimPassError = 'Passwords Do Not Match';
      this.passwordError = 'Passwords Do Not Match';
      hasError = true;
    }
    return hasError;
  }

  resetErrors(){
    this.emailError = null;
    this.passwordError = null;
    this.confrimPassError = null;
  }

  async createAccount(event:any){
    let hasErrors = this.handleFormErrors();
    if(hasErrors){
      return;
    }
    this.resetErrors();
    try{
      await this.authService.createUserEmail(this.email,this.password);
    }
    catch(e){
      const message = "Error creating account";
      this.notificationService.displayErrorSnackBar(message,e);
    }
  }
}
