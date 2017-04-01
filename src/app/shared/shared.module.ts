import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { HttpModule }    from '@angular/http';

import {
  StoreModule,
  ActionReducer,
  combineReducers,
} from '@ngrx/store';
import { compose } from '@ngrx/core/compose'
import { RouterStoreModule } from '@ngrx/router-store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreLogMonitorModule, useLogMonitor } from '@ngrx/store-log-monitor';

import { DataListModule } from 'primeng/primeng';
import { MaterialModule } from '@angular/material';

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
    CommonModule,
    BrowserModule,
    FormsModule,
    HttpModule,
    MaterialModule,

    StoreModule.provideStore(rootReducer),
    RouterStoreModule.connectRouter(),
    StoreDevtoolsModule.instrumentOnlyWithExtension(),
    StoreLogMonitorModule,

  ],
  declarations: [
  ],
  exports:      [
    CommonModule,
    BrowserModule,
    FormsModule,
    HttpModule,

    MaterialModule,
    DataListModule,
  ]
})
export class SharedModule {}
