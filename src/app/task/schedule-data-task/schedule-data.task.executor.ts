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
    const {path} = task.data as ScheduleDataTaskData;

    const taskScheduleWithDateObservable = Observable.combineLatest(
      // Get task parent taskSchedule
      this.store.select<TaskSchedule[]>('taskSchedules')
      .map((taskSchedules) => taskSchedules
        .find((taskScheduleItem) => taskScheduleItem.id === task.taskScheduleId
      )),
      // Get TaskScheduleExecutedState
      this.store
        .select<TaskSchedulesExecutedState>('taskSchedulesExecutedState'),
      // Combine executedAt into taskSchedule
      (taskSchedule, taskScheduleExecutedState) => {
        const {executedAt} = taskScheduleExecutedState[taskSchedule.id] ||
          { executedAt: new Date(0) };
        return {
          ...taskSchedule,
          executedAt,
        }
      }
    )

    const taskScheduleWithDate = await taskScheduleWithDateObservable
      .take(1)
      .toPromise()

    const taskData = path ? get(taskScheduleWithDate, path) : taskScheduleWithDate

    data.push(taskData)

    console.log('TaskSchedule data: ', taskData);
  }
}
