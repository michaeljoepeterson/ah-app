import { Pipe, PipeTransform } from '@angular/core';
import { DateEvent } from '../models/date-event';

@Pipe({
  name: 'getCurrentStatus'
})
export class GetCurrentStatusPipe implements PipeTransform {

  transform(dateEvents:DateEvent[]): string {
    if(dateEvents.length > 0){
        let {status} = dateEvents[dateEvents.length - 1];
        return status;
    }
  }

}

@Pipe({
  name: 'getStatusColor'
})
export class GetCurrentStatusColorPipe implements PipeTransform {
  statusColors:any = {
    'Scan Taken':'scan-taken',
    'Approved':'approved',
    'Production':'production'
  }

  transform(status:string): string {
    return this.statusColors[status];
  }

}

