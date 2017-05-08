/*
 * Angular 2 decorators and services
 */
import {
  Component,
  OnInit,
  ViewEncapsulation
} from '@angular/core';
import { Store } from '@ngrx/store';

import { ScheduleService } from "./shared";

/*
 * App Component
 * Top Level Component
 */
@Component({
  selector: 'app',
  styleUrls: [
    './app.component.css'
  ],
  template: `
    <main>
      <router-outlet></router-outlet>
    </main>
    <p-confirmDialog></p-confirmDialog>
  `
})
export class AppComponent implements OnInit {
  public angularclassLogo = 'assets/img/angularclass-avatar.png';
  public name = 'Angular 2 Webpack Starter';

  constructor(
    scheduleService: ScheduleService
  ) {
    // if (window.Notification && Notification.permission !== "granted") {
    //   Notification.requestPermission((status) => {
    //     if (Notification.permission !== status) {
    //       Notification.permission = status;
    //     }
    //   });
    // }
  }

  public ngOnInit() {
  }

}

/*
 * Please review the https://github.com/AngularClass/angular2-examples/ repo for
 * more angular app examples that you may copy/paste
 * (The examples may not be updated as quickly. Please open an issue on github for us to update it)
 * For help or questions please contact us at @AngularClass on twitter
 * or our chat on Slack at https://AngularClass.com/slack-join
 */
