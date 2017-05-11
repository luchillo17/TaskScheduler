import { Injectable } from '@angular/core';
import nodemailer = require('nodemailer');

import { WebNotificationService } from '..';
import { Store } from '@ngrx/store';

@Injectable()
export class MailNotificationService {

  private user: string = '';
  private pass: string = '';
  private transporter: nodemailer.Transporter;

  constructor(
    private webNotificationService: WebNotificationService,
    private store: Store<RXState>,
  ) {
    store.select<MailConfig>('mailConfig')
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
    text,
    html,
  }) {
    if (
      !this.transporter ||
      !this.user ||
      !this.pass
    ) {
      return;
    }
    let mailOptions = {
      from,
      to,
      subject,
      text,
      html,
    }
    try {
      let info = await this.transporter.sendMail(mailOptions)
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
