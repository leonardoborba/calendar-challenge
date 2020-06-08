import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { WeatherService } from 'src/app/services/weather/weather.service';
import { Reminder } from 'src/app/models/reminder';

@Component({
  selector: 'app-calendar-day',
  templateUrl: './calendar-day.component.html',
  styleUrls: ['./calendar-day.component.scss']
})
export class CalendarDayComponent implements OnChanges {
  @Input() currentDate: any;
  @Input() currentDay: Date;
  @Input() daySelected: Date;
  @Input() day: Date;
  @Input() reminders: Reminder[];
  weather: any;

  constructor(
    private _weatherService: WeatherService,
  ) { }

  ngOnChanges() {
    if (!!this.reminders.length) {
      this.getWeather();
    }
  }

  isDaySelected() {
    if (!!this.currentDate && this.currentDate.getValue() && this.daySelected) {
      return this.day.toISOString().substring(0, 10) ===
      this.daySelected.toISOString().substring(0, 10);
    }

    return false;
  }

  isCurrentDay(date: Date) {
    return !!this.currentDay && this.currentDay.toISOString() === date.toISOString();
  }

  get weatherIcon() {
    if (!!this.weather && this.weather.list) {
      return this._weatherService.getWeaterIconFromDate(this.weather, this.day);
    }
  }

  getWeather() {
    for (const reminder of this.reminders) {
      if (!!this.weather && !!this.weather.city && this.weather.city.name === reminder.city) {
        return;
      }

      if (!!reminder.city) {
        this.weather = {};
        return this._weatherService.getWeather(reminder.city).subscribe(weather => this.weather = weather);
      }
    }
  }

}
