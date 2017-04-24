import { NgModule }      from '@angular/core';
import { HttpModule }    from '@angular/http';
import { FormsModule }   from '@angular/forms';
import { CommonModule }  from '@angular/common';
import { RouterModule }  from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule }  from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';

import { NgxErrorsModule } from "@ultimate/ngxerrors";

import { MaterialModule } from '@angular/material';
import {
  ButtonModule,
  DialogModule,
  FieldsetModule,
  DataListModule,
  CalendarModule,
  DropdownModule,
  InputTextModule,
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

    NgxErrorsModule,

    MaterialModule,

    ButtonModule,
    DialogModule,
    FieldsetModule,
    DataListModule,
    CalendarModule,
    DropdownModule,
    InputTextModule,
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
