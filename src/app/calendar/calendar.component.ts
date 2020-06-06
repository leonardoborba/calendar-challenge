import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { Reminder } from '../models/reminder';
import { EventComponent } from '../event/event.component';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {
  weekDays: string[];
  currentDate: Date;
  currentDay: Date;
  daysOfMonth: Date[] = [];
  reminders: Reminder[] = []

  constructor(
    public dialog: MatDialog
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

    this.currentDate = new Date();
    this.currentDay = new Date();
    this.daysOfMonth = this.getDays(this.currentDate);
    this.getDays(this.currentDate);
  }

  ngOnInit() {
  }

  newEvent() {
    console.log('new event')
    const dialogRef = this.dialog.open(EventComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
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

}
