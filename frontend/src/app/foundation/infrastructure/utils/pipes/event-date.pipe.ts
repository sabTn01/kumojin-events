import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';

@Pipe({
  name: 'eventDatePipe'
})
export class EventDatePipe implements PipeTransform {
  constructor(private _datePipe: DatePipe) {
  }

  public transform(date: Date | undefined): any {
    if (date) {
      return this._datePipe.transform(date, 'yyyy-MM-dd H:mm', 'system')
    } else {
      return 'N/A';
    }
  }
}
