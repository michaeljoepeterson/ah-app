import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-auth-modal',
  templateUrl: './auth-modal.component.html',
  styleUrls: ['./auth-modal.component.css']
})
export class AuthModalComponent implements OnInit {
  isCreating:boolean = false;

  constructor(
    public dialogRef: MatDialogRef<AuthModalComponent>
  ) { }

  ngOnInit(): void {
  }

  createAccountClicked(){
    this.isCreating = true;
  }

  loginClicked(){
    this.isCreating = false;
  }
}
