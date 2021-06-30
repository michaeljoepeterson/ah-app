import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { ChartSummary } from '../../../models/chart-summary';

@Component({
  selector: 'app-chart-list-item',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './chart-list-item.component.html',
  styleUrls: ['./chart-list-item.component.css']
})
export class ChartListItemComponent implements OnInit {
  @Input() icon:string = 'line_chart';
  @Input() chartData:ChartSummary;

  constructor() { }

  ngOnInit(): void {
  }

}
