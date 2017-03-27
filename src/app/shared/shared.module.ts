import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { HttpModule }    from '@angular/http';

import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { AppReducers } from './store.reducers';

// Components

@NgModule({
  imports:      [
    CommonModule,
    BrowserModule,
    FormsModule,
    HttpModule,
    StoreModule.provideStore(AppReducers),
    StoreDevtoolsModule.instrumentOnlyWithExtension(),
  ],
  declarations: [
  ],
  exports:      [
    CommonModule,
    BrowserModule,
    FormsModule,
    HttpModule,
  ]
})
export class SharedModule {}
