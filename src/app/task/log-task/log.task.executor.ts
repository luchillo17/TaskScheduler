import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { LogTaskData } from './';
import { BaseTaskExecutor } from '../';

@Injectable()
export class LogTaskExecutor implements BaseTaskExecutor {

  public async executeTask(task: Task, data: any[] = [], taskIndex: number = 0) {
    const taskData: LogTaskData = task.data;
    console.log(taskData.text);
    if (taskData.logTasksData) {
      console.log('Tasks data: ', data);
    }
  }
}
