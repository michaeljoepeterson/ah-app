import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CustomSection } from '../../models/custom-section';

@Component({
  selector: 'app-edit-form-section',
  templateUrl: './edit-form-section.component.html',
  styleUrls: ['./edit-form-section.component.css']
})
export class EditFormSectionComponent implements OnInit {
  @Input() section:CustomSection;

  @Output() cancelClicked = new EventEmitter();
  @Output() confirmClicked = new EventEmitter();
  sectionName:string;
  
  constructor() { }

  ngOnInit(): void {
    this.sectionName = this.section.name;
  }

  onCancelClicked(){
    this.cancelClicked.emit();
  }

  onConfirmClicked(){
    this.section.name = this.sectionName;
    this.confirmClicked.emit();
  }
}
