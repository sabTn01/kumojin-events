import { Injectable } from '@angular/core';
import { KumojinEventHttpClient } from '../http-clients/kumojin-event.http-client';
import { KumojinEvent } from '../models/kumojin-event';
import { map, Observable } from 'rxjs';
import { Deserialize, Serialize } from 'cerialize';

@Injectable({
  providedIn: 'root'
})
export class KumojinEventHttpService {
  private _baseEndpoint = 'events';

  constructor(private _http: KumojinEventHttpClient) {
  }

  public list(): Observable<KumojinEvent[]> {
    return this._http.get(`${ this._baseEndpoint }`)
      .pipe(map(response => {
        return Deserialize(response, KumojinEvent);
      }));
  }

  public create(event: KumojinEvent): Observable<KumojinEvent> {
    const serialized = Serialize(event, KumojinEvent);

    return this._http.post(this._baseEndpoint, serialized).pipe(
      map(response => Deserialize(response, KumojinEvent))
    );
  }

}
