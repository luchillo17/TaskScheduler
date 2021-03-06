/*
 * Angular 2 decorators and services
 */
import {
  Component,
} from '@angular/core';
import { Store } from '@ngrx/store';

import {
  ScheduleService,
  WebNotificationService,
} from './shared';

import {
  MailNotificationService,
} from './shared/mail-notification-service';

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
export class AppComponent {
  public angularclassLogo = 'assets/img/angularclass-avatar.png';
  public name = 'Angular 2 Webpack Starter';

  constructor(
    private scheduleService: ScheduleService,
    private notificationService: WebNotificationService,
    private mailService: MailNotificationService,
  ) {
  }
}

/*
 * Please review the https://github.com/AngularClass/angular2-examples/ repo for
 * more angular app examples that you may copy/paste
 * (The examples may not be updated as quickly. Please open an issue on github for us to update it)
 * For help or questions please contact us at @AngularClass on twitter
 * or our chat on Slack at https://AngularClass.com/slack-join
 */
