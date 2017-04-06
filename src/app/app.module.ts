import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {
  NgModule,
  ApplicationRef,
  HostListener,
} from '@angular/core';
import {
  removeNgStyles,
  createNewHosts,
  createInputTransfer
} from '@angularclass/hmr';
import {
  RouterModule,
  PreloadAllModules
} from '@angular/router';

import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/debounceTime';

/*
 * Platform and Environment providers/directives/pipes
 */
import { ENV_PROVIDERS } from './environment';
import { ROUTES } from './app.routes';
// App is our top level component
import { AppComponent } from './app.component';
import { APP_RESOLVER_PROVIDERS } from './app.resolver';
import {
  AppState,
  InternalStateType
} from './app.service';

import {
  ScheduleComponent,
  ScheduleListComponent,
  TaskListComponent,
} from './';
import { NoContentComponent } from './no-content';
import { SharedModule } from './shared';

import '../styles/core.scss';
// import '../styles/headings.css';

// Application wide providers
const APP_PROVIDERS = [
  ...APP_RESOLVER_PROVIDERS,
  AppState
];

type StoreType = {
  state: InternalStateType,
  restoreInputValues: () => void,
  disposeOldHosts: () => void
};

/**
 * `AppModule` is the main entry point into Angular2's bootstraping process
 */
@NgModule({
  bootstrap: [ AppComponent ],
  declarations: [
    AppComponent,
    ScheduleComponent,
    ScheduleListComponent,
    TaskListComponent,
    NoContentComponent,
  ],
  imports: [ // import Angular's modules
    SharedModule,
    RouterModule.forRoot(ROUTES, { useHash: true, preloadingStrategy: PreloadAllModules }),
  ],
  providers: [ // expose our Services and Providers into Angular's dependency injection
    ENV_PROVIDERS,
    APP_PROVIDERS
  ]
})
export class AppModule {
  private storeSubscription: Subscription;

  @HostListener('window:beforeunload')
  public onBeforeUnload($event) {
    console.log('Saving state to DB');
    this.setStateToDB();
  }

  constructor(
    public appRef: ApplicationRef,
    public store: Store<any>,
  ) {
    let state = localStorage.getItem('state');

    if (state) {
      store.dispatch({
        type: 'SET_ROOT_STATE',
        payload: JSON.parse(state),
      });
    }

    this.storeSubscription = store
      .debounceTime(3500)
      .subscribe((state) => localStorage.setItem('state', JSON.stringify(state)));

    // window.onbeforeunload = ($event) => {
    //   console.log('onBeforeUnload')
    //   return false;
    // };

    // Save state before reload, close
    window.addEventListener('beforeunload', ($event) => {
      this.setStateToDB()
    });
  }

  public onDestroy() {
    this.storeSubscription.unsubscribe();
  }

  public setStateToDB() {
    this.store.take(1).subscribe((state) => {
      localStorage.setItem('state', JSON.stringify(state));
    });
  }

  public hmrOnInit(store: StoreType) {
    if (!store || !store.state) {
      return;
    }
    // console.log('HMR store', JSON.stringify(store, null, 2));
    // set state
    if (store.state) {
      this.store.dispatch({
        type: 'SET_ROOT_STATE',
        payload: store.state,
      });
    }
    // set input values
    if ('restoreInputValues' in store) {
      let restoreInputValues = store.restoreInputValues;
      setTimeout(restoreInputValues);
    }

    this.appRef.tick();
    Object.keys(store).forEach(prop => delete store[prop]);
  }

  public hmrOnDestroy(store: StoreType) {
    const cmpLocation = this.appRef.components.map((cmp) => cmp.location.nativeElement);
    // save state
    this.store.take(1).subscribe(s => store.state = s);
    // recreate root elements
    store.disposeOldHosts = createNewHosts(cmpLocation);
    // save input values
    store.restoreInputValues  = createInputTransfer();
    // remove styles
    removeNgStyles();
  }

  public hmrAfterDestroy(store: StoreType) {
    // display new elements
    store.disposeOldHosts();
    delete store.disposeOldHosts;
  }

}
