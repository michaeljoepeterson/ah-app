import { Component, OnInit } from '@angular/core';
import { NotificationsService } from '../../modules/notifications/services/notifications.service';
import { RouteData } from '../../models/route-data';

@Component({
  selector: 'app-navbar',
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

  constructor(
    private notificationService:NotificationsService
  ) { }

  ngOnInit(): void {
  }

  login(){
    let loginModal = this.notificationService.openLoginModal();
  }

  logout(){

  }
}
