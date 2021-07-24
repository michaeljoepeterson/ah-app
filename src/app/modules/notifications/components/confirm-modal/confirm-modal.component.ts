import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ConfirmModalData } from '../../models/confirm-modal-data';

@Component({
  selector: 'app-confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.css']
})
export class ConfirmModalComponent implements OnInit {
  defaultCancelText:string = 'Cancel';
  defaultConfirmText:string = 'Confirm';

  constructor(
    public dialogRef: MatDialogRef<ConfirmModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ConfirmModalData
  ) { }

  ngOnInit(): void {
  }

  cancel(){
    this.dialogRef.close(false);
  }

  confirm(){
    this.dialogRef.close(true);
  }
}
