import { Injectable, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import nodemailer = require('nodemailer');

import { Subscription } from 'rxjs';

import { WebNotificationService } from '..';

@Injectable()
export class MailNotificationService implements OnDestroy {
  private mailConfigSub: Subscription

  private user: string = '';
  private pass: string = '';
  private transporter: nodemailer.Transporter;

  constructor(
    private webNotificationService: WebNotificationService,
    private store: Store<RXState>,
  ) {
    this.mailConfigSub = store.select<MailConfig>('mailConfig')
      .subscribe((mailConfig) => {
        if (
          !mailConfig.user ||
          !mailConfig.pass
        ) {
          return;
        }
        return this.connect(mailConfig)
      })
    console.log('Start MailNotificationService');
  }

  public ngOnDestroy() {
    this.mailConfigSub && this.mailConfigSub.unsubscribe()
  }

  public async connect({
    service = 'gmail',
    user = this.user,
    pass = this.pass,
  }: MailConfig) {
    this.user = user
    this.pass = pass
    this.transporter = nodemailer.createTransport({
      service,
      auth: {
        user,
        pass,
      }
    })
  }

  public async sendMail({
    from = this.user,
    to,
    subject = 'TaskScheduler Error',
    html,
    text = 'Unknown error',
  }: MailMessage) {
    if (
      !this.transporter ||
      !this.user ||
      !this.pass
    ) {
      return;
    }
    const mailOptions = {
      from,
      to,
      subject,
      text,
      html,
    }
    try {
      const info = await this.transporter.sendMail(mailOptions)
      this.webNotificationService.createNotification({
        title: 'Email sent',
        body: html || text,
      })
    } catch (error) {
      this.webNotificationService.createErrorNotification({
        title: 'Email error',
        body: JSON.stringify(error),
      })
      throw error;
    }
  }
}
