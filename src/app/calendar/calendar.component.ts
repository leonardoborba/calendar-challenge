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
  deleteItems: number[] = [];
  selectAllCheckbox: boolean;

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
      {id: 1, title: 'Teste', date: new Date(), color: 'yellow'},
      {id: 2, title: 'Teste-1 hduawhd asdjaw aowpdkaw dahwuhawud', date: new Date()},
      {id: 3, title: 'Teste-2', date: new Date(), city: 'São Paulo'},
      {id: 4, title: 'Teste-3', date: new Date()},
      {id: 5, title: 'Teste-4', date: new Date()},
      {id: 6, title: 'Teste-5', date: new Date()},
      {id: 7, title: 'Teste-6', date: new Date()}
    ]
  }

  ngOnInit() {
    // this.getDayWeather(new Date()).then(value => {console.log(value)})
  }

  selectDay(day: Date) {
    this.daySelected = day;
    this.deleteItems = [];
  }

  selectItemToDelete(event, id) {
    if (!!event.checked) {
      this.deleteItems.push(id);
    } else {
      this.deleteItems.splice(this.deleteItems.indexOf(id), 1);
    }

    this.selectAllCheckbox = this.deleteItems.length === this.getEvents(this.daySelected).length;
  }

  selectAll(event) {
    if (!!event.checked) {
      this.deleteItems = this.getEvents(this.daySelected).map((item) => item.id)
    }else {
      this.deleteItems = [];
    }
  }

  deleteEvents() {
    this.reminders = this.reminders.filter((reminder) => this.deleteItems.indexOf(reminder.id) < 0)

    this.deleteItems = [];
    this.selectAllCheckbox = false;
  }

  openEvent(event?: number) {
    const dialogRef = this.dialog.open(EventComponent, {
      data: event || null
    });

    dialogRef.afterClosed().subscribe(newEventData => {
      if (!!newEventData) {
        for (let reminderId in this.reminders) {
          if (newEventData.id === this.reminders[reminderId].id) {
            return this.reminders[reminderId] = newEventData
          }
        }
     
        this.reminders.push(newEventData)
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
