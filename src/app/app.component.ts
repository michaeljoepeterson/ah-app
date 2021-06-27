import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ah-app';
  dashSub:Subscription;
  isDash:boolean = false;
  dashIdentifier:string = 'dashboard';
  routeLoading:boolean = true;

  constructor(
    private router:Router
  ){

  }

  ngOnInit(){
    this.router.events
    .pipe(
      filter(e => e instanceof NavigationEnd)
    )
    .subscribe((navEnd:NavigationEnd) => {
      console.log(navEnd.urlAfterRedirects);
      if(navEnd.urlAfterRedirects.toLowerCase().includes(this.dashIdentifier)){
        this.isDash = true;
      }
      else{
        this.isDash = false;
      }
      this.routeLoading = false;
    });
  }
}
