import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { NotificationsService } from '../../modules/notifications/services/notifications.service';
import { RouteData } from '../../models/route-data';
import { AuthModalComponent } from '../auth-modal/auth-modal.component';
import { Subscription } from 'rxjs';
import { AuthInfo } from 'src/app/models/users/authinfo';
import { AuthService } from 'src/app/services/auth.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-navbar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  routeData:RouteData[] = [
    {
      path:'/home',
      navName:'Home'
    }
  ];
  authSub:Subscription;
  authInfo:AuthInfo;
  loginModal:MatDialogRef<any>;
  initialLoad:boolean = true;
  //todo set this from activated route
  activeRoute:string = 'Home';

  constructor(
    private notificationService:NotificationsService,
    private authService:AuthService,
    private ref:ChangeDetectorRef
  ) { }

  ngOnInit(){
    this.authSub = this.authService.authInfo.subscribe(info => {
      if(info.token !== 'loading'){
        this.initialLoad = false;
        this.authInfo = info;
        if(this.authInfo.token && this.loginModal){
          this.loginModal.close();
        }
      }
      else if(info.token === null){
        this.authInfo = {};
        this.initialLoad = false;
      }
      this.ref.markForCheck();
    });
  }

  ngOnDestroy(){
    try{
      this.authSub.unsubscribe();
    }
    catch(e){
      console.warn('Error cleaning up nav', e);
    }
  }

  /**
   * open login modal
   */
  login(){
    this.loginModal = this.notificationService.openModal(AuthModalComponent,null,'400px');
  }

  /**
   * logout user
   */
  async logout(){
    try{
      await this.authService.logout();
    }
    catch(e){
      let message = 'Error logging out';
      console.warn(message,e);
      this.notificationService.displayErrorSnackBar(message,e);
    }
  }

  setActiveRoute(name:string){
    this.activeRoute = name;
    console.log(this.activeRoute);
  }
}
