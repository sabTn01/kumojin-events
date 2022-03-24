import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KumojinEventFormComponent } from './kumojin-event-form.component';
import { FormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { KumojinEventHttpService } from '../../../../foundation/mainstack/kumojin-events/services/kumojin-event-http.service';
import { of } from 'rxjs';
import { KumojinEvent } from '../../../../foundation/mainstack/kumojin-events/models/kumojin-event';

describe('KumojinEventFormComponent', () => {
  let component: KumojinEventFormComponent;
  let fixture: ComponentFixture<KumojinEventFormComponent>;
  let mockService: KumojinEventHttpService;

  beforeEach(async () => {
    mockService = jasmine.createSpyObj<KumojinEventHttpService>(
      'KumojinEventHttpService',
      {
        create: of(new KumojinEvent())
      }
    );

    await TestBed.configureTestingModule({
      declarations: [KumojinEventFormComponent],
      imports: [HttpClientTestingModule, FormsModule],
      providers: [{ provide: KumojinEventHttpService, useValue: mockService }],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KumojinEventFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('ngOnInit, should reset the event object', () => {
    // Arrange
    // Act
    component.ngOnInit();

    // Assert
    expect(component.isLoading).toBeFalsy();
    expect(component.kumojinEvent.startAt).toBeUndefined();
    expect(component.kumojinEvent.endAt).toBeUndefined();
    expect(component.kumojinEvent.displayName).toEqual('');
    expect(component.kumojinEvent.description).toEqual('');
  });

  it('onSaveClick, should save the event', () => {
    // Arrange
    const eventMock = {
      guid: 'guid',
      displayName: 'name',
      description: 'description',
      startAt: new Date(2022, 1, 1, 0, 0, 0),
      endAt: new Date(2022, 1, 1, 15, 0, 0),
      countryAt: 'Spain'
    }

    // Act
    mockService.create(eventMock).subscribe(() => {
      // Assert
      expect(component.saveComplete$).toBeDefined();
    });

    component.onSaveClick();

    // Assert
    expect(component.isLoading).toBeFalsy();
    expect(component.kumojinEvent.startAt).toBeUndefined();
    expect(component.kumojinEvent.endAt).toBeUndefined();
    expect(component.kumojinEvent.displayName).toEqual('');
    expect(component.kumojinEvent.description).toEqual('');
  });
});
