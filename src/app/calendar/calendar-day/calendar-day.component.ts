import { Component, OnInit, Input } from '@angular/core';
import { WeatherService } from 'src/app/services/weather/weather.service';
import { Reminder } from 'src/app/models/reminder';

@Component({
  selector: 'app-calendar-day',
  templateUrl: './calendar-day.component.html',
  styleUrls: ['./calendar-day.component.scss']
})
export class CalendarDayComponent implements OnInit {
  @Input() currentMonth: number;
  @Input() day: Date;
  @Input() reminders: Reminder[];
  weatherIcon: string;
  currentDay = new Date();

  constructor(
    private _weatherService: WeatherService,
  ) { }

  ngOnInit() {
    this.getDayWeather();
  }

  isCurrentDay(date: Date) {
    return this.currentDay.toISOString() === date.toISOString();
  }

  getDayWeather() {
    this.reminders.forEach(event => {
      if (event.city) {
        return this._weatherService.getWeather(event.city).subscribe(weather => {
          if (!!weather) {
            this.weatherIcon = this._weatherService.getWeaterIconFromDate(weather, this.day)
          }
        });
      }
    })
  }

}
