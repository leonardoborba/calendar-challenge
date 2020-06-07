import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BehaviorSubject } from 'rxjs';

import { Reminder } from '../models/reminder';
import { EventComponent } from '../event/event.component';
import { WeatherService } from '../services/weather/weather.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {
  weekDays: string[];
  currentDate = new BehaviorSubject<Date>(new Date());
  currentDay: Date;
  daysOfMonth: Date[] = [];
  reminders: Reminder[] = []
  daySelected: Date;

  constructor(
    public dialog: MatDialog,
  ) {
    this.weekDays = [
      'sanday',
      'monday',
      'tuesday',
      'wednesday',
      'thusday',
      'friday',
      'saturday',
    ];

    this.currentDay = this.resetDateTime(new Date());
    this.currentDate.subscribe(date => {
      console.log(date)
      this.daysOfMonth = this.getDays(date);
    })

    this.reminders = [
      {title: 'Teste', date: new Date(), color: 'yellow'},
      {title: 'Teste-1 hduawhd asdjaw aowpdkaw dahwuhawud', date: new Date()},
      {title: 'Teste-2', date: new Date(), city: 'São Paulo'},
      {title: 'Teste-3', date: new Date()},
      {title: 'Teste-4', date: new Date()},
      {title: 'Teste-5', date: new Date()},
      {title: 'Teste-6', date: new Date()}
    ]
  }

  ngOnInit() {
    // this.getDayWeather(new Date()).then(value => {console.log(value)})
  }

  selectDay(day: Date) {
    this.daySelected = day;
  }

  openEvent(eventIndex?: number) {
    const dialogRef = this.dialog.open(EventComponent, {
      data: this.reminders[eventIndex] || null
    });

    dialogRef.afterClosed().subscribe(newEventData => {
      if (!!newEventData) {
        if (!!this.reminders[eventIndex]) {
          this.reminders[eventIndex] = newEventData;

        } else {
          this.reminders.push(newEventData)
        }
      }
    });
  }

  getEvents(date: Date) {
    return this.reminders.filter(reminder => {
      return reminder.date.toISOString().substring(0, 10) === date.toISOString().substring(0, 10);
    }).sort((ac, next) => {
      return ac.date < next.date ? -1 : 1;
    })
  }

  getDays(currentDate: Date):Date[] {
    const daysOnMounth = (new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0)).getDate();
    const daysOfMonth = Array(...(Array(daysOnMounth + 1).keys())).slice(1);
    const days = daysOfMonth.map(day => {
      return this.resetDateTime(new Date(currentDate.setDate(day)));
    });

    const daysBefore = this.handleDaysBeforeCurrentMonth(days[0])
    const daysAfter = this.handleDaysAfterCurrentMonth(days[days.length - 1])
    
    return [...daysBefore, ...days, ...daysAfter]
  }

  handleDaysBeforeCurrentMonth(date: Date) {
    const currentDate = new Date(date);
    const daysBefore = [];
    while (currentDate.getDay() > 0) {
      currentDate.setDate(currentDate.getDate() - 1)
      daysBefore.unshift(new Date(currentDate));
    }

    return daysBefore;
  }


  handleDaysAfterCurrentMonth(date: Date) {
    const currentDate = new Date(date);
    const daysAfter = [];
    while (currentDate.getDay() < 6) {
      currentDate.setDate(currentDate.getDate() + 1)
      daysAfter.push(new Date(currentDate));
    }

    return daysAfter;
  }

  resetDateTime(date: Date) {
    date.setHours(0);
    date.setMinutes(0);
    date.setSeconds(0);
    date.setMilliseconds(0);

    return date
  }

  previusMonth() {
    const newDate = this.currentDate.getValue();
    newDate.setDate(1);
    newDate.setMonth(newDate.getMonth() - 1);
    this.currentDate.next(newDate)
  }

  nextMonth() {
    const newDate = this.currentDate.getValue();
    newDate.setDate(1);
    newDate.setMonth(newDate.getMonth() + 1);
    this.currentDate.next(newDate)
  }

  resetCurrentDate() {
    this.currentDate.next(new Date(this.currentDay));
  }

}
