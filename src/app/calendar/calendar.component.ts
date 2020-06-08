import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BehaviorSubject } from 'rxjs';

import { Reminder } from '../models/reminder';
import { EventComponent } from '../event/event.component';

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
  reminders: Reminder[] = [];
  daySelected: Date;
  deleteItems: number[] = [];
  selectAllCheckbox: boolean;

  constructor(
    public dialog: MatDialog,
  ) { }

  ngOnInit() {
    this.weekDays = ['sanday','monday','tuesday','wednesday','thusday','friday','saturday'];

    this.currentDay = this.resetDateTime(new Date());
    this.currentDate.subscribe(date => {
      this.daysOfMonth = this.getDaysOfMonth(date);
    });

    this.getStorageReminders();
    this.selectDay(this.currentDay);
  }

  getStorageReminders() {
    const storageReminders = JSON.parse(localStorage.getItem('reminders')) || [];
    this.reminders = storageReminders.map(reminder => {
      reminder.date = new Date(reminder.date);
      return reminder;
    });
  }

  updateStorageReminders() {
    localStorage.setItem('reminders', JSON.stringify(this.reminders));
  }

  selectDay(day: Date) {
    this.selectAllCheckbox = false;
    this.deleteItems = [];
    this.daySelected = day;
  }

  selectItemToDelete(checkboxEvent, id) {
    if (!!checkboxEvent.checked) {
      this.deleteItems.push(id);
    } else {
      this.deleteItems.splice(this.deleteItems.indexOf(id), 1);
    }

    this.selectAllCheckbox = this.deleteItems.length === this.getEventsByDay(this.daySelected).length;
  }
  selectAllItems(checkboxEvent) {
    if (!!checkboxEvent.checked) {
      this.deleteItems = this.getEventsByDay(this.daySelected).map((item) => item.id);
    } else {
      this.deleteItems = [];
    }
  }

  deleteEvents() {
    this.reminders = this.reminders.filter((reminder) => this.deleteItems.indexOf(reminder.id) < 0);
    this.updateStorageReminders();

    this.deleteItems = [];
    this.selectAllCheckbox = false;
  }

  openEvent(event?: number) {
    const dialogRef = this.dialog.open(EventComponent, {
      data: event || null
    });

    dialogRef.afterClosed().subscribe(newEventData => this.saveEvent(newEventData));
  }

  saveEvent(eventData: Reminder) {
    if (!!eventData) {
      for (const reminderId in this.reminders) {
        if (eventData.id === this.reminders[reminderId].id) {
          return this.reminders[reminderId] = eventData;
        }
      }

      this.reminders.push(eventData);
    }
    this.updateStorageReminders();
  }

  getEventsByDay(date: Date) {
    return this.reminders.filter(reminder => {
      return reminder.date.toISOString().substring(0, 10) === date.toISOString().substring(0, 10);
    }).sort((ac, next) => {
      return ac.date < next.date ? -1 : 1;
    });
  }

  getDaysOfMonth(currentDate: Date): Date[] {
    const daysOnMounth = (new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0)).getDate();
    const daysOfMonth = Array(...(Array(daysOnMounth + 1).keys())).slice(1);
    const days = daysOfMonth.map(day => {
      return this.resetDateTime(new Date(currentDate.setDate(day)));
    });

    const daysBefore = this.handleDaysBeforeCurrentMonth(days[0]);
    const daysAfter = this.handleDaysAfterCurrentMonth(days[days.length - 1]);

    return [...daysBefore, ...days, ...daysAfter];
  }

  handleDaysBeforeCurrentMonth(date: Date) {
    const currentDate = new Date(date);
    const daysBefore = [];
    while (currentDate.getDay() > 0) {
      currentDate.setDate(currentDate.getDate() - 1);
      daysBefore.unshift(new Date(currentDate));
    }

    return daysBefore;
  }


  handleDaysAfterCurrentMonth(date: Date) {
    const currentDate = new Date(date);
    const daysAfter = [];
    while (currentDate.getDay() < 6) {
      currentDate.setDate(currentDate.getDate() + 1);
      daysAfter.push(new Date(currentDate));
    }

    return daysAfter;
  }

  resetDateTime(date: Date) {
    date.setHours(0);
    date.setMinutes(0);
    date.setSeconds(0);
    date.setMilliseconds(0);

    return date;
  }

  previusMonth() {
    const newDate = this.currentDate.getValue();
    newDate.setDate(1);
    newDate.setMonth(newDate.getMonth() - 1);
    this.currentDate.next(newDate);
  }

  nextMonth() {
    const newDate = this.currentDate.getValue();
    newDate.setDate(1);
    newDate.setMonth(newDate.getMonth() + 1);
    this.currentDate.next(newDate);
  }

  resetCurrentDate() {
    this.currentDate.next(new Date(this.currentDay));
  }

  isDaySelected(day) {
    if (!!this.currentDate && this.currentDate.getValue() && this.daySelected) {
      return day.toISOString().substring(0, 10) === this.daySelected.toISOString().substring(0, 10);
    }

    return false;
  }

}
