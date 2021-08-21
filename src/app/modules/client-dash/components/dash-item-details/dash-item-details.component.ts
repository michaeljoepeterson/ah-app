import { Component, Input, OnInit } from '@angular/core';
import { PatientFile } from '../../models/patient-file';
import { FolderItem } from '../../models/folder-item';

@Component({
  selector: 'app-dash-item-details',
  templateUrl: './dash-item-details.component.html',
  styleUrls: ['./dash-item-details.component.css']
})
export class DashItemDetailsComponent implements OnInit {
  @Input() item:(FolderItem|PatientFile);

  constructor() { }

  ngOnInit(): void {
  }

}
