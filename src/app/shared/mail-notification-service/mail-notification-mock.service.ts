import { Injectable } from '@angular/core';

@Injectable()
export class MailNotificationService {
  constructor() {
    console.log('Start MockMailNotificationService');
  }

  public async connect() {
    return null;
  }

  public async sendMail() {
    return null;
  }
}
