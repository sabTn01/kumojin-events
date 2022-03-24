import { ChangeDetectorRef, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { KumojinEvent } from '../../../../foundation/mainstack/kumojin-events/models/kumojin-event';
import { KumojinEventHttpService } from '../../../../foundation/mainstack/kumojin-events/services/kumojin-event-http.service';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-kumojin-event-form',
  templateUrl: './kumojin-event-form.component.html'
})
export class KumojinEventFormComponent implements OnInit {
  @Output() saveComplete$ = new EventEmitter();

  public isLoading = false;
  public kumojinEvent = new KumojinEvent();
  public countries = ['Spain'];

  constructor(private _kumojinEventHttpService: KumojinEventHttpService,
              private _cdr: ChangeDetectorRef) {
  }

  public ngOnInit(): void {
    this.resetForm();
  }

  public onSaveClick(): void {
    this.isLoading = true;

    this._kumojinEventHttpService.create(this.kumojinEvent)
      .pipe(finalize(() => {
        this.isLoading = false;
        this._cdr.markForCheck();
      }))
      .subscribe(() => {
        this.resetForm()
        this.saveComplete$.emit()
      })
  }

  private resetForm(): void {
    this.kumojinEvent = new KumojinEvent();
  }
}
