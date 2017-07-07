import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { get } from 'lodash';

import { ScheduleDataTaskData } from './';
import { BaseTaskExecutor } from '../';

@Injectable()
export class ScheduleDataTaskExecutor implements BaseTaskExecutor {

  constructor(private store: Store<RXState>) {}

  public async executeTask(task: Task, data: any[] = [], taskIndex: number = 0) {
    const {path, getDataFromScheduleId} = task.data as ScheduleDataTaskData;

    const taskSchedule = await this.store.select<TaskSchedule[]>('taskSchedules')
      .map((taskSchedules) => taskSchedules
        .find((taskScheduleItem) => taskScheduleItem.id === task.taskScheduleId
      ))
      .take(1)
      .toPromise()

    const taskData = path ? get(taskSchedule, path) : taskSchedule

    data.push(taskData)

    console.log('TaskSchedule data: ', taskData);
  }
}
