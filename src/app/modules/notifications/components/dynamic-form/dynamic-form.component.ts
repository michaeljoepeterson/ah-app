import { Component, Inject, Input, OnInit, Output,EventEmitter } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DynamicFieldResponses, DynamicFormData,formTypes } from '../../models/dynamic-form-models';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.css']
})
export class DynamicFormComponent implements OnInit {
  @Input() data:DynamicFormData;

  @Output() formSubmit:EventEmitter<DynamicFieldResponses[]> = new EventEmitter();
  @Output() formCancelled:EventEmitter<any> = new EventEmitter();

  editor = ClassicEditor;
  responses:DynamicFieldResponses[] = [];
  type:any = {...formTypes};
  editorConfig:any = {
    toolbar:{
      items:['heading', 'bold', 'italic', 'numberedList', 'bulletedList','insertTable', 'blockQuote','undo', 'redo',  ] ,
      shouldNotGroupWhenFull: true
    }
  };

  constructor(

  ) { }

  ngOnInit(): void {
    this.initResponses();
  }
  
  ngOnDestroy(){
    try{
 
    }
    catch(e){
      console.warn(e);
    }
  }

  initResponses(){
    this.data.fields.forEach((d) => {
      this.responses.push(new DynamicFieldResponses(d.value));
    });
  }

  submitForm(){
    this.formSubmit.emit(this.responses);
  }

  cancelForm(){
    this.formCancelled.emit();
  }
  //to do custom component for text editor
  onEditorReady(editor:any){
    editor.editing.view.change( writer => {
      writer.setStyle( 'height', '200px', editor.editing.view.document.getRoot() );
      writer.setStyle( 'width ', '800px', editor.editing.view.document.getRoot() );
    } );
  }


}
