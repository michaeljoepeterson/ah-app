import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-search-input',
  templateUrl: './search-input.component.html',
  styleUrls: ['./search-input.component.css']
})
export class SearchInputComponent implements OnInit {
  @Input() search:string = '';

  constructor() { }

  ngOnInit(): void {
  }

  executeSearch(event:any){
    console.log(event);
  }

  inputChange(event:any){
    console.log(event);
  }
}
