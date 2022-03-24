import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { KumojinEvent } from '../../../../foundation/mainstack/kumojin-events/models/kumojin-event';
import { KumojinEventHttpService } from '../../../../foundation/mainstack/kumojin-events/services/kumojin-event-http.service';
import { finalize } from 'rxjs';

@Component({
  templateUrl: './kumojin-event-list.component.html',
  styleUrls: ['kumojin-event-list.component.css']
})
export class KumojinEventListComponent implements OnInit {
  public isLoading = false;
  public displayForm = false;

  public events = new Array<KumojinEvent>();

  displayedColumns: string[] = ['displayName', 'description', 'startAt', 'endAt'];

  constructor(private _kumojinEventHttpService: KumojinEventHttpService,
              private _cdr: ChangeDetectorRef) {
  }

  public ngOnInit(): void {
    this.fetchData();
  }

  public onDisplayForm(): void {
    this.displayForm = !this.displayForm;
  }

  public onSaveComplete(): void {
    this.displayForm = false;
    this.fetchData();
  }

  private fetchData(): void {
    this.isLoading = true;

    this._kumojinEventHttpService.list()
      .pipe(finalize(() => {
        this.isLoading = false;
        this._cdr.markForCheck();
      }))
      .subscribe(events => {
        this.events = events;
      })
  }
}
