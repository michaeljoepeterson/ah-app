import { Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CustomField } from '../../models/custom-field';
import { CustomSection } from '../../models/custom-section';
import { FormService } from '../../services/form.service';

@Component({
  selector: 'app-form-child',
  templateUrl: './form-child.component.html',
  styleUrls: ['./form-child.component.css']
})
export class FormChildComponent implements OnInit {
  @Input() combinedChildren:(CustomSection|CustomField)[] = [];
  @Input() sectionSpace:number = 0;
  fieldType:string = 'field';
  sectionType:string = 'section';
  isEditing:boolean = false;
  editSub:Subscription;

  constructor(
    private formService:FormService
  ) { }

  ngOnInit(): void {
    this.editSub = this.formService.isEditing.subscribe(isEditing => this.isEditing = isEditing);
  }

  ngOnDestroy(){
    try{
      this.editSub.unsubscribe();
    }
    catch(e){
      console.warn(e);
    }
  }

}
