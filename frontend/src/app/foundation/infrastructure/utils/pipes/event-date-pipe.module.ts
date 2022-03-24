import { NgModule } from '@angular/core';
import { EventDatePipe } from './event-date.pipe';
import { CommonModule, DatePipe } from '@angular/common';

@NgModule({
  declarations: [
    EventDatePipe
  ],
  exports: [
    EventDatePipe
  ],
  imports: [
    CommonModule
  ],
  providers: [
    DatePipe
  ]
})
export class EventDatePipeModule {
}
