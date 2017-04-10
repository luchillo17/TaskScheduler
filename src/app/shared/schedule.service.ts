
import { Injectable } from '@angular/core';

import { Store } from '@ngrx/store';
import { Observable, Subject, Subscription } from 'rxjs';

import { v1 as uuidV1 } from 'uuid';
import * as schedule from "node-schedule";
import { UtilService } from "./";

@Injectable()
export class ScheduleService {

  public scheduleEmitter = new Subject<TaskSchedule>();
  public jobs: schedule.Job[] = [];

  constructor(
    public store: Store<RXState>,
    public util: UtilService,
  ) {
    console.log('ScheduleService Up');

    global['schedule'] = schedule;
    this.store
      .select<TaskSchedule[]>('taskSchedules')
      .map((taskSchedules) => taskSchedules.filter((taskSchedule) => taskSchedule.id != ''))
      .subscribe((taskSchedules) => {
        this.cancelJobs();
        this.scheduleJobs(taskSchedules);
      })

    this.scheduleEmitter.subscribe((taskSchedule) => {
      this.executeTasks(taskSchedule);
    });
  }
  private cancelJobs() {
    console.log('Cancelling jobs');
    this.jobs.forEach((job) => job.cancel());
  }
  private scheduleJobs(taskSchedules: TaskSchedule[]) {
    console.log('Scheduling jobs');
    this.jobs = [
      ...taskSchedules.map((taskSchedule) => {
        let rule = this.util.templateStringSingleLine(`
          ${taskSchedule.second || '*'}
          ${taskSchedule.minute || '*'}
          ${taskSchedule.hour || '*'}
          ${taskSchedule.dayOfMonth || '*'}
          ${taskSchedule.month || '*'}
          ${taskSchedule.dayOfWeek || '*'}
        `);
        return schedule.scheduleJob(taskSchedule.name, rule, () => {
          this.scheduleEmitter.next(taskSchedule);
        })
      })
    ]
  }
  private executeTasks(taskSchedule: TaskSchedule) {
    console.log('Executing TaskSchedule: ', taskSchedule.name);
  }
}
