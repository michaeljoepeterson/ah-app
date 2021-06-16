import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { NotificationsService } from '../../../notifications/services/notifications.service';
import { AuthInfo } from '../../../../models/users/authinfo';
import { AuthService } from '../../../../services/auth.service';

@Component({
  selector: 'app-admin-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.css']
})
export class AdminPageComponent implements OnInit {
  authInfo:AuthInfo;
  cleanUpSub:Subscription;
  user:any;

  constructor(
    private authService:AuthService,
    private notificationService:NotificationsService,
    private ref:ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.cleanUpSub = this.authService.isLoggedIn.subscribe(loggedIn => {
      if(typeof loggedIn === 'boolean'){
        if(loggedIn){
          this.getTest();
        }
      }
    });
  }

  ngOnDestroy(){
    try{
      this.cleanUpSub.unsubscribe();
    }
    catch(e){
      let message = 'Error cleaningup';
      console.warn(message,e);
    }
  }

  getTest(){
    if(this.cleanUpSub){
      this.cleanUpSub.unsubscribe();
    }
    this.cleanUpSub = this.authService.getAppUser().subscribe({
      next:resp => {
        let {user} = resp;
        this.user = user;
        this.ref.markForCheck();
      },
      error:error => {
        let message = 'Error getting data';
        console.warn(message,error);
        this.notificationService.displayErrorSnackBar(message,error);
      },
      complete:() => {
        this.cleanUpSub.unsubscribe();
      }
    });
  }
}
