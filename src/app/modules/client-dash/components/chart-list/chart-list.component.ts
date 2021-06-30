import { Component, OnInit } from '@angular/core';
import { NotificationsService } from '../../../notifications/services/notifications.service';
import { ChartSummary } from '../../models/chart-summary';
import { ChartDataService } from '../../services/chart-data.service';

@Component({
  selector: 'app-chart-list',
  templateUrl: './chart-list.component.html',
  styleUrls: ['./chart-list.component.css']
})
export class ChartListComponent implements OnInit {
  chartData:ChartSummary[] = [];

  constructor(
    private chartDataService:ChartDataService,
    private notificationService:NotificationsService
  ) { }

  ngOnInit(): void {
    this.chartDataService.getChartSummary().subscribe({
      next:response => {
        this.chartData = [...response];
      },
      error:err => {
        let message = 'Getting chart summary data';
        console.warn(message,err);
        this.notificationService.displayErrorSnackBar(message,err);
      }
    })
  }

}
