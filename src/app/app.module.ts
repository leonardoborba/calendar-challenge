import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CalendarComponent } from './calendar/calendar.component';
import { EventComponent } from './event/event.component';
import { MaterialModule } from './shared/material/material.module';
import { CalendarDayComponent } from './calendar/calendar-day/calendar-day.component';
import { EventItemComponent } from './calendar/event-item/event-item.component';

@NgModule({
  declarations: [
    AppComponent,
    CalendarComponent,
    EventComponent,
    CalendarDayComponent,
    EventItemComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule
  ],
  providers: [],
  entryComponents: [
    EventComponent
  ],
  exports: [
    CalendarDayComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
