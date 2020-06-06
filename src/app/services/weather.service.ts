import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  apiKey: string;
  constructor() {
    this.apiKey = '527f58fb8686999421619d8696f99c0f'
  }
}
