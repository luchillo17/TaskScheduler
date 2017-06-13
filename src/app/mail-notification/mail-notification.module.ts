import { NgModule } from '@angular/core';

import { MailNotificationComponent } from './mail-notification.component';
import { SharedModule } from '../shared/shared.module';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', component: MailNotificationComponent },
]

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(routes),
  ],
  declarations: [MailNotificationComponent],
})
export class MailNotificationModule {}
