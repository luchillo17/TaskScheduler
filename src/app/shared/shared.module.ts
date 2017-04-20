import { NgModule }      from '@angular/core';
import { HttpModule }    from '@angular/http';
import { FormsModule }   from '@angular/forms';
import { CommonModule }  from '@angular/common';
import { RouterModule }  from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule }  from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';



import { MaterialModule } from '@angular/material';
import {
  ButtonModule,
  DialogModule,
  FieldsetModule,
  DataListModule,
  CalendarModule,
  InputSwitchModule,
  AutoCompleteModule,
  ToggleButtonModule,
  ConfirmDialogModule,
  ConfirmationService,
} from 'primeng/primeng';

import { ScheduleService, UtilService } from './';

// Components
@NgModule({
  imports:      [
    HttpModule,
    FormsModule,
    CommonModule,
    BrowserModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
  ],
  declarations: [
  ],
  exports:      [
    HttpModule,
    FormsModule,
    CommonModule,
    RouterModule,
    BrowserModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,

    MaterialModule,

    ButtonModule,
    DialogModule,
    FieldsetModule,
    DataListModule,
    CalendarModule,
    InputSwitchModule,
    AutoCompleteModule,
    ToggleButtonModule,
    ConfirmDialogModule,
  ],
  providers: [
    ConfirmationService,
    ScheduleService,
    UtilService,
  ]
})
export class SharedModule {}
