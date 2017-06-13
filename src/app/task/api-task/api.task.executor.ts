import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { ApiTaskData } from './index';
import { BaseTaskExecutor } from '../index';

@Injectable()
export class ApiTaskExecutor implements BaseTaskExecutor {

  public async executeTask(task: Task, data: any[] = [], taskIndex: number = 0) {
    const {
      url,
      method,
      authorization,
      requestData: body,
    } = task.data as ApiTaskData;
    console.log('Api task data: ', task.data);

    const response = await fetch(url, {
      headers: new Headers({
        authorization,
        'accept': 'application/json',
        'content-type': 'application/json',
      }),
      mode: 'cors',
      method,
      body,
    });

    if (!response.ok) {
      throw await response.json()
    }

    data.push(await response.json())

    console.log('ApiTask response: ', response, data)
  }
}
