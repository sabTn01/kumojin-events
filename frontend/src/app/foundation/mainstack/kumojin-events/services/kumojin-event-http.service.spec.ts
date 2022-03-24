import { TestBed } from '@angular/core/testing';

import { KumojinEventHttpService } from './kumojin-event-http.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { KumojinEvent } from '../models/kumojin-event';
import { HttpErrorResponse } from '@angular/common/http';

class ErrorDetails {
}

describe('KumojinEventHttpService', () => {
  let service: KumojinEventHttpService;
  let httpMock: HttpTestingController;

  let kumojinEventApiUrl = 'https://localhost:5001/api/events';
  let eventListMock = new Array<KumojinEvent>();
  let eventMock1 = new KumojinEvent();
  let eventMock2 = new KumojinEvent();

  eventMock1 = {
    guid: 'guid1',
    displayName: 'name1',
    description: 'description1',
    startAt: new Date(2022, 1, 1, 0, 0, 0),
    endAt: new Date(2022, 1, 1, 15, 0, 0),
    countryAt: 'Mexico'
  }

  eventMock2 = {
    guid: 'guid2',
    displayName: 'name2',
    description: 'description2',
    startAt: new Date(2022, 1, 1, 0, 0, 0),
    endAt: new Date(2022, 1, 1, 15, 0, 0),
    countryAt: 'Spain'
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [KumojinEventHttpService]
    });

    service = TestBed.inject(KumojinEventHttpService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('list, should return a list of events when request succeed', () => {
    // Arrange
    eventListMock.push(eventMock1);
    eventListMock.push(eventMock2);

    // Act
    service.list().subscribe(events => {
      // Assert
      expect(events.length).toEqual(2);
      expect(events[0].displayName).toEqual('name1');
      expect(events[1].displayName).toEqual('name2');
    });

    const request = httpMock.expectOne(kumojinEventApiUrl);
    expect(request.request.method).toBe('GET');

    request.flush(eventListMock);
  });

  it('list, should throw an error when request fail', () => {
    // Arrange
    let response: HttpErrorResponse | undefined;

    // Act
    service.list().subscribe(() => {
    }, resp=> {
      response = resp;
    });

    const expected = {
      status: 400,
      statusText: 'Bad Request'
    };

    const request = httpMock.expectOne(kumojinEventApiUrl);
    request.flush(expected, { status: 400, statusText: "Bad Request" });

    expect(response?.status).toEqual(expected.status)
    expect(response?.statusText).toEqual(expected.statusText)
  });
});
