import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-note-options',
  templateUrl: './note-options.component.html',
  styleUrls: ['./note-options.component.css']
})
export class NoteOptionsComponent implements OnInit {
  selectedNote:string = "recent";

  constructor() { }

  ngOnInit(): void {
  }

}
