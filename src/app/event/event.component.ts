import { FocusMonitor } from '@angular/cdk/a11y';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {FormBuilder, FormGroup, ControlValueAccessor, NgControl, Validators} from '@angular/forms';

import { Reminder } from '../models/reminder';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss']
})
export class EventComponent implements OnInit {
  form: FormGroup;
  submited: boolean;

  constructor(
    formBuilder: FormBuilder,
    private _focusMonitor: FocusMonitor,
    public dialogRef: MatDialogRef<EventComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Reminder
  ) { 
    this.form = formBuilder.group({
      title: [null, [Validators.required, Validators.maxLength(30)]],
      date: [null, [Validators.required]],
      color: ['default'],
      city: [null],
    });
    
    console.log(data, this.form.controls.title)


    // _focusMonitor.monitor(_elementRef, true).subscribe(origin => {
    //   if (this.focused && !origin) {
    //     this.onTouched();
    //   }
    //   this.focused = !!origin;
    //   this.stateChanges.next();
    // });
  }

  ngOnInit() {
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

  showHint(control: string) {
    if (this.submited) return true;
    if (this.form.controls[control].touched && this.form.controls[control].invalid) return true;

    return false;
  }

}
