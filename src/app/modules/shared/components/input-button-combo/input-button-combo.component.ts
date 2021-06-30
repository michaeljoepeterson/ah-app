import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-input-button-combo',
  templateUrl: './input-button-combo.component.html',
  styleUrls: ['./input-button-combo.component.css']
})
export class InputButtonComboComponent implements OnInit {
  @Input() icon:string = 'search';
  @Input() required:boolean = false;
  @Output() buttonClicked = new EventEmitter();
  @Output() inputChanged = new EventEmitter();
  textInput:string = '';
  constructor() { }

  ngOnInit(): void {
  }

  onClick(){
    this.buttonClicked.emit({
      textInput:this.textInput
    });
  }

  onChange(value:string){
    this.inputChanged.emit(value);
  }
}
