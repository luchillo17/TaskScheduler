import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { HttpModule }    from '@angular/http';

// import { StoreModule } from '@ngrx/store';
import { Store, StoreModule, ActionReducer, combineReducers } from '@ngrx/store'
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { compose} from '@ngrx/core/compose'

import { AppReducers } from './store.reducers';

function stateSetter(reducer: ActionReducer<any>): ActionReducer<any> {
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
    StoreModule.provideStore(rootReducer),
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
