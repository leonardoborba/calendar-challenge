import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventComponent } from './event.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MatDatepickerModule, MatDialogRef, MAT_DIALOG_DATA, MatNativeDateModule } from '@angular/material';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('EventComponent', () => {
  let component: EventComponent;
  let fixture: ComponentFixture<EventComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        NgxMaterialTimepickerModule,
        MatDatepickerModule,
        MatNativeDateModule,
        ReactiveFormsModule,
        HttpClientTestingModule,
        FormsModule
      ],
      providers: [
        { provide: MatDialogRef, useValue: { } },
        { provide: MAT_DIALOG_DATA, useValue: null },
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
      declarations: [ EventComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should check title max 30 chars', () => {
    component.form.controls.title.setValue('Lorem ipsum dolor sit amet, consectetur adipiscing');
    expect(component.save()).toEqual(false);
    expect(component.showHint('title')).toEqual(true);
  });

  it('should return the event data updated', () => {
    const dateFake = new Date();
    component.eventData = {
      id: 12345,
      title: 'fake',
      date: dateFake,
      city: 'fake city',
      color: 'default'
    };

    component.populateFormData();

    component.form.controls.title.setValue('new fake title');
    component.form.controls.city.setValue('new fake city');
    component.form.controls.color.setValue('new fake color');

    const newEventData = {
      id: 12345,
      title: 'new fake title',
      date: dateFake,
      city: 'new fake city',
      color: 'new fake color'
    };

    expect(component.getEventData()).toEqual(newEventData);
  });
});
