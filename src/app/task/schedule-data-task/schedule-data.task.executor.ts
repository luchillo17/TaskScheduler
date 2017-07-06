import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { ScheduleDataTaskData } from './index';
import { BaseTaskExecutor } from '../index';

@Injectable()
export class ScheduleDataTaskExecutor implements BaseTaskExecutor {

  public async executeTask(task: Task, data: any[] = [], taskIndex: number = 0) {
    const taskData: ScheduleDataTaskData = task.data;
    console.log(taskData.text);
    if (taskData.logTasksData) {
      console.log('Tasks data: ', data);
    }
  }
}
