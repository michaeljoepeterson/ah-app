import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Tag } from '../../../../models/tag';

@Component({
  selector: 'app-tag',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './tag.component.html',
  styleUrls: ['./tag.component.css']
})
export class TagComponent implements OnInit {
  @Input() tag:Tag

  constructor() { }

  ngOnInit(): void {
  }

}
