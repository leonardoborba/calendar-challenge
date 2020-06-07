import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  apiUrl: string;
  iconUrl: string;
  apiKey: string;

  constructor(
    private _http: HttpClient
  ) {
    this.apiUrl = 'http://api.openweathermap.org/data/2.5/forecast';
    this.iconUrl = 'http://openweathermap.org/img/wn/';
    this.apiKey = '527f58fb8686999421619d8696f99c0f';
  }

  getWeather(city: string) {
    const params = {
      appid: this.apiKey,
      q: city
    }
    return this._http.get(this.apiUrl, {params}).pipe(
      map(value => {
        value['list'].map(list => {
          list.dt = this.convertTimestamp(list.dt);
          return list
        })
        return value
      })
    );
  }

  convertTimestamp(timestamp: number): Date {
    return new Date(timestamp * 1000);
  }

  getIcon(icon) {
    return this.iconUrl + icon + '.png';
  }

}
