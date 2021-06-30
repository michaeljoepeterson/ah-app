import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ChartSummary } from '../models/chart-summary';

@Injectable({
  providedIn: 'root'
})
export class ChartDataService {

  constructor() { }

  getChartSummary():Observable<ChartSummary[]>{
    let chartSummary:ChartSummary[] = [
      {
        title:'16 Devices',
        status:'In Production',
        icon:'stacked_line_chart'
      },
      {
        title:'52 Patients',
        status:'On File',
        icon:'bar_chart'
      },
      {
        title:'3 Designs',
        status:'In Development',
        icon:'stacked_line_chart'
      },
      {
        title:'2 Days',
        status:'Until Next Shipment',
        icon:'bar_chart'
      }
    ];

    return of(chartSummary);
  }
}
