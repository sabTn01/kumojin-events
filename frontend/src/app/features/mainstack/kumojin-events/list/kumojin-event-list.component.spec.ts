import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KumojinEventListComponent } from './kumojin-event-list.component';
import { KumojinEventHttpService } from '../../../../foundation/mainstack/kumojin-events/services/kumojin-event-http.service';
import { KumojinEvent } from '../../../../foundation/mainstack/kumojin-events/models/kumojin-event';
import { of } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('KumojinEventListComponent', () => {
  let component: KumojinEventListComponent;
  let fixture: ComponentFixture<KumojinEventListComponent>;
  let mockService: KumojinEventHttpService;

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

  beforeEach(async () => {
    eventListMock = [];
    mockService = jasmine.createSpyObj<KumojinEventHttpService>(
      'KumojinEventHttpService',
      {
        list: of(eventListMock)
      }
    );

    await TestBed.configureTestingModule({
      declarations: [KumojinEventListComponent],
      imports: [HttpClientTestingModule],
      providers: [{ provide: KumojinEventHttpService, useValue: mockService }],
    })
      .compileComponents();

    fixture = TestBed.createComponent(KumojinEventListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('ngOnInit, should deactivate loading', () => {
    // Arrange
    // Act
    component.ngOnInit();

    // Assert
    expect(component.isLoading).toBeFalsy();
  });

  it('ngOnInit, should fetch a list of events', () => {
    // Arrange
    eventListMock.push(eventMock1);
    eventListMock.push(eventMock2);

    // Act
    component.ngOnInit();

    // Assert
    expect(component.events.length).toEqual(2);
    expect(component.isLoading).toBeFalsy();
  });

  it('onDisplayForm, should display the form', () => {
    // Arrange
    // Act
    component.onDisplayForm();

    // Assert
    expect(component.displayForm).toBeTruthy();
  });

  it('onSaveComplete, should fetch the events and hide the form', () => {
    // Arrange
    eventListMock.push(eventMock1);
    eventListMock.push(eventMock2);

    // Act
    mockService.list().subscribe(events => {
      // Assert
      expect(events.length).toEqual(2);
      expect(events[0].displayName).toEqual('name1');
      expect(events[1].displayName).toEqual('name2');
    });

    component.onSaveComplete();

    // Assert
    expect(component.isLoading).toBeFalsy();
    expect(component.displayForm).toBeFalsy();
  });
});
