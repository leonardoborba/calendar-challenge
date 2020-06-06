import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule, MatNativeDateModule} from '@angular/material';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatButtonModule} from '@angular/material/button';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormsModule,
    MatInputModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatIconModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatAutocompleteModule,
    MatFormFieldModule
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatAutocompleteModule,
    MatFormFieldModule
  ]
})
export class MaterialModule { }
