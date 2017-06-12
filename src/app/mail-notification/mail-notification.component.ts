import { Component, OnDestroy } from '@angular/core';
import { Location } from '@angular/common';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';

import { saveMailConfig } from '.';

@Component({
  selector: 'mail-notification',
  templateUrl: 'mail-notification.component.html',
  styleUrls: ['mail-notification.component.scss'],
})

export class MailNotificationComponent implements OnDestroy {

  public mailConfigSub: Subscription
  public mailForm: FormGroup

  constructor(
    public location: Location,
    private store: Store<RXState>,
    private formBuilder: FormBuilder,

  ) {
    global['MailNotificationComponent'] = this
    this.mailConfigSub = this.store
      .select<MailConfig>('mailConfig')
      .subscribe((mailConfig) => {
        this.mailForm = formBuilder.group({
          service: [mailConfig.service, Validators.required],
          user: [mailConfig.user, Validators.required],
          pass: [mailConfig.pass, Validators.required],
        })
      })
  }

  public ngOnDestroy() {
    this.mailConfigSub && this.mailConfigSub.unsubscribe();
  }

  /**
   * saveMailConfig saves the mail config through an action
   */
  public saveMailConfig() {
    if (this.mailForm.invalid) return;
    this.goBack()
    this.store.dispatch(
      saveMailConfig(this.mailForm.value)
    )
  }

  public goBack() {
    this.location.back();
  }
}
