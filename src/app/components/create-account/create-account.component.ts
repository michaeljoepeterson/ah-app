import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.css']
})
export class CreateAccountComponent implements OnInit {
  email:string;
  password:string;
  confirmPass:string;

  constructor() { }

  ngOnInit(): void {
  }

  createAccount(event:any){
    console.log('create');
  }
}
