import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../../services/auth.service';

@Component({
  selector: 'app-main-dash',
  templateUrl: './main-dash.component.html',
  styleUrls: ['./main-dash.component.css']
})
export class MainDashComponent implements OnInit {

  constructor(
    private authService:AuthService
  ) { 
    //this.authService.setDashboardView(true);
  }

  ngOnInit(): void {

  }

  ngOnDestroy(){
    //this.authService.setDashboardView(false);
  }

}
