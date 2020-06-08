import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatIconModule, MatDialogModule } from '@angular/material';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { CalendarComponent } from './calendar.component';
import { Reminder } from '../models/reminder';

describe('CalendarComponent', () => {
  let component: CalendarComponent;
  let fixture: ComponentFixture<CalendarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatIconModule,
        MatDialogModule
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
      declarations: [ CalendarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should add as new reminder', () => {
    const newEventData: Reminder = {
      id: 12345,
      title: 'fake',
      date: new Date(),
      city: 'Fake City',
      color: 'default'
    };

    component.saveEvent(newEventData);
    expect(component.reminders.length).toEqual(1);
  });

  it('should update a reminder', () => {
    const eventData: Reminder = {
      id: 12345,
      title: 'fake',
      date: new Date(),
      city: 'fake city',
      color: 'default'
    };

    component.reminders = [eventData]

    const newEventData = {
      id: 12345,
      title: 'new fake title',
      date: new Date(),
      city: 'new fake city',
      color: 'new color'
    };

    component.saveEvent(newEventData);
    expect(component.reminders.length).toEqual(1);
    expect(component.reminders[0].title).toEqual('new fake title');
    expect(component.reminders[0].city).toEqual('new fake city');
    expect(component.reminders[0].color).toEqual('new color');
  });
});
