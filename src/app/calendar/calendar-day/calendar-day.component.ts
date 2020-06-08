import { Component, Input, OnChanges } from '@angular/core';
import { WeatherService } from 'src/app/services/weather/weather.service';
import { Reminder } from 'src/app/models/reminder';

@Component({
  selector: 'app-calendar-day',
  templateUrl: './calendar-day.component.html',
  styleUrls: ['./calendar-day.component.scss']
})
export class CalendarDayComponent implements OnChanges {
  @Input() currentDay: Date;
  @Input() selected: any;
  @Input() day: Date;
  @Input() reminders: Reminder[];
  weather: any;

  constructor(
    private _weatherService: WeatherService,
  ) { }

  ngOnChanges() {
    this.getWeather();
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
