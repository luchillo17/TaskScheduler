import { NgModule, ModuleWithProviders } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { NgxErrorsModule } from '@ultimate/ngxerrors';

import { MaterialModule } from '@angular/material';
import {
  PanelModule,
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
  InputTextareaModule,
  ConfirmDialogModule,
  ConfirmationService,
} from 'primeng/primeng';

import {
  ScheduleService,
  WebNotificationService,
  MailNotificationService,
} from './';

const sharedProviders = [
  MailNotificationService,
  WebNotificationService,
  ConfirmationService,
  ScheduleService,
];

// Components
@NgModule({
  imports:      [],
  declarations: [],
  exports:      [
    HttpModule,
    FormsModule,
    CommonModule,
    RouterModule,
    ReactiveFormsModule,

    NgxErrorsModule,

    MaterialModule,

    PanelModule,
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
    InputTextareaModule,
    ConfirmDialogModule,
  ],
})
export class SharedModule {
  public static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: sharedProviders,
    }
  }
}
