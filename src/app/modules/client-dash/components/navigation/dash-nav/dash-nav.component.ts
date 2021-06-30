import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { NotificationsService } from '../../../../notifications/services/notifications.service';
import { AuthService } from '../../../../../services/auth.service';

@Component({
  selector: 'app-dash-nav',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './dash-nav.component.html',
  styleUrls: ['./dash-nav.component.css']
})
export class DashNavComponent implements OnInit {

  constructor(
    private authService:AuthService,
    private notificationService:NotificationsService
  ) { }

  ngOnInit(): void {
  }

  async signOut(){
    try{
      await this.authService.logout();
    }
    catch(e){
      let message = 'Logging out';
      console.warn(message,e);
      this.notificationService.displayErrorSnackBar(message,e);
    }
  }
}
