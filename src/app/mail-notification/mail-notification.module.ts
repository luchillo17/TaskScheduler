import { NgModule, ModuleWithProviders } from '@angular/core';

import { MailNotificationComponent } from '.';
import { SharedModule } from '../index';
import { RouterModule, Routes } from '@angular/router';

let routes: Routes = [
  { path: '', component: MailNotificationComponent },
]

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(routes),
  ],
  exports: [],
  declarations: [MailNotificationComponent],
  providers: [],
})
export class MailNotificationModule {}
