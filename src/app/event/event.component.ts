import { FocusMonitor } from '@angular/cdk/a11y';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, ControlValueAccessor, NgControl, Validators } from '@angular/forms';
import { Observable, Subject, Subscription } from 'rxjs';
import { map, startWith, debounceTime } from 'rxjs/operators';

import { Reminder } from '../models/reminder';
import { WeatherService } from '../services/weather/weather.service';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss']
})
export class EventComponent implements OnInit {
  form: FormGroup;
  colors: string[] = [];
  weatherIcon: string;
  submited: boolean;
  inputCityChanged: Subject<string> = new Subject<string>();
  subscription: Subscription;
  debounceTime = 500;
  weather: any;
  weatherError: any;
  loadingCity: boolean;

  filteredOptions: Observable<string[]>;
  options: string[] = ['One', 'Two', 'Three'];

  constructor(
    formBuilder: FormBuilder,
    private _weatherService: WeatherService,
    private _focusMonitor: FocusMonitor,
    public dialogRef: MatDialogRef<EventComponent>,
    @Inject(MAT_DIALOG_DATA) public eventData: Reminder
  ) {
    this.colors = [
      'default',
      'yellow',
      'blue',
      'green',
      'red',
      'purple'
    ];
    this.form = formBuilder.group({
      id: [(new Date()).getTime()],
      title: [null, [Validators.required, Validators.maxLength(30)]],
      date: [null, [Validators.required]],
      time: [null, [Validators.required]],
      color: ['default'],
      city: [null],
    });

    if (!!eventData) {
      this.populateFormData();
    }
  }

  ngOnInit() {
    this.filteredOptions = this.form.controls.city.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );

    this.subscription = this.inputCityChanged.pipe(
      debounceTime(this.debounceTime),
    ).subscribe(value => {
      this.searchCity(value);
    });
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
  }

  populateFormData() {
    this.form.controls.id.setValue(this.eventData.id);
    this.form.controls.title.setValue(this.eventData.title);
    this.form.controls.date.setValue(this.eventData.date);
    this.form.controls.color.setValue(this.eventData.color || 'default');
    this.form.controls.city.setValue(this.eventData.city);
    this.form.controls.time.setValue(`${this.eventData.date.getHours()}:${this.eventData.date.getMinutes()}`);
    if (!!this.eventData.city) {
      this.searchCity(this.eventData.city);
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  save() {
    this.submited = true;
    if (this.form.valid) {
      this.dialogRef.close(this.getEventData());
    }
  }

  getEventData() {
    const [hours, minutes] = this.form.value.time.split(':');
    const eventDate: Date = this.form.value.date;
    eventDate.setHours(hours);
    eventDate.setMinutes(minutes);

    return {
      id: this.form.value.id,
      title: this.form.value.title,
      date: eventDate,
      color: this.form.value.color,
      city: this.form.value.city
    };
  }

  selectColor(color: string) {
    this.form.controls.color.setValue(color);
  }

  showHint(control: string) {
    if (this.submited && this.form.controls[control].invalid) {
      return true;
    }
    if (this.form.controls[control].touched && this.form.controls[control].invalid) {
      return true;
    }

    return false;
  }

  searchCity(city: string) {
    this._weatherService.getWeather(city).subscribe((cityWeather: any) => {
      if (!!cityWeather) {
        this.weather = cityWeather;
        this.weatherError = null;
        this.form.controls.city.setValue(cityWeather.city.name);
      }
    }, error => {
      this.weather = null;
      this.weatherError = error.error;
      this.loadingCity = false;
    });
  }

  getWeaterIcon() {
    if (this.weather) {
      const date = this.form.value.date || new Date();
      return this._weatherService.getWeaterIconFromDate(this.weather, date);
    }
  }

  inputChanged(value) {
    this.weather = null;

    if (!!value) {
      this.loadingCity = true;
      this.inputCityChanged.next(value);
    }
  }

}
