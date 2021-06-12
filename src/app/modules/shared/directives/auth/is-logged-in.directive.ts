import { Directive, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../../../../services/auth.service';

@Directive({
  selector: '[appIsLoggedIn]'
})
export class IsLoggedInDirective implements OnInit, OnDestroy{
  authSub:Subscription;

  constructor(
    private authService:AuthService,
    private router:Router
  ) { 

  }

  ngOnInit(){
    this.authSub = this.authService.isLoggedIn.subscribe(loggedIn => {
      if(typeof loggedIn === 'boolean'){
        if(!loggedIn){
          this.router.navigate(['/home']);
        }
      }
    });
  }

  ngOnDestroy(){
    try{
      this.authSub.unsubscribe();
    }
    catch(e){
      console.warn(e);
    }
  }
}
