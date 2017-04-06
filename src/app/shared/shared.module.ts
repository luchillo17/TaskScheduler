import { NgModule }      from '@angular/core';
import { HttpModule }    from '@angular/http';
import { FormsModule }   from '@angular/forms';
import { CommonModule }  from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule }  from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';

import {
  StoreModule,
  ActionReducer,
  combineReducers,
} from '@ngrx/store';
import { compose } from '@ngrx/core/compose'
import { RouterStoreModule } from '@ngrx/router-store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreLogMonitorModule, useLogMonitor } from '@ngrx/store-log-monitor';

import { MaterialModule } from '@angular/material';
import {
  ButtonModule,
  DialogModule,
  FieldsetModule,
  DataListModule,
  CalendarModule,
  InputSwitchModule,
  ToggleButtonModule,
} from 'primeng/primeng';

import { AppReducers } from './store.reducers';

export function stateSetter(reducer: ActionReducer<any>): ActionReducer<any> {
  return function (state, action ) {
    if (action.type === 'SET_ROOT_STATE') {
      return action.payload
    }
    return reducer(state, action)
  }
}

export const rootReducer = compose(stateSetter, combineReducers)(AppReducers)

// Components
@NgModule({
  imports:      [
    HttpModule,
    FormsModule,
    CommonModule,
    BrowserModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,

    StoreModule.provideStore(rootReducer),
    RouterStoreModule.connectRouter(),
    StoreDevtoolsModule.instrumentOnlyWithExtension(),
    StoreLogMonitorModule,

  ],
  declarations: [
  ],
  exports:      [
    HttpModule,
    FormsModule,
    CommonModule,
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
    ToggleButtonModule
  ]
})
export class SharedModule {}
