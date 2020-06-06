import { FocusMonitor } from '@angular/cdk/a11y';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {FormBuilder, FormGroup, ControlValueAccessor, NgControl, Validators} from '@angular/forms';
import { Observable } from 'rxjs';
import {map, startWith} from 'rxjs/operators';

import { Reminder } from '../models/reminder';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss']
})
export class EventComponent implements OnInit {
  form: FormGroup;
  colors: string[] = [];
  submited: boolean;
  filteredOptions: Observable<string[]>;
  options: string[] = ['One', 'Two', 'Three'];

  constructor(
    formBuilder: FormBuilder,
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
    ]
    this.form = formBuilder.group({
      title: [null, [Validators.required, Validators.maxLength(30)]],
      date: [null, [Validators.required]],
      color: ['default'],
      city: [null],
    });
    
    console.log(eventData, this.form.value.color)

    // _focusMonitor.monitor(_elementRef, true).subscribe(origin => {
    //   if (this.focused && !origin) {
    //     this.onTouched();
    //   }
    //   this.focused = !!origin;
    //   this.stateChanges.next();
    // });
  }

  ngOnInit() {
    this.filteredOptions = this.form.controls.city.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  save() {
    this.submited = true;
    console.log(this.form.value)
    if (this.form.valid) {
      console.log('VALID')
    }
  }

  selectColor(color: string) {
    this.form.controls.color.setValue(color);
  }

  showHint(control: string) {
    if (this.submited) return true;
    if (this.form.controls[control].touched && this.form.controls[control].invalid) return true;

    return false;
  }

}
