
import { Injectable, OnDestroy } from '@angular/core';

import { Store } from '@ngrx/store';
import { Observable, Subject, Subscription } from 'rxjs';

import { v1 as uuidV1 } from 'uuid';
import * as schedule from "node-schedule";
import { UtilService } from "./";

@Injectable()
export class ScheduleService implements OnDestroy {

  public scheduleEmitter = new Subject<TaskSchedule>();
  public jobs: schedule.Job[] = [];

  constructor(
    public store: Store<RXState>,
    public util: UtilService,
  ) {
    console.log('ScheduleService Up');

    global['scheduleService'] = this;
    global['schedule'] = schedule;
    Observable.combineLatest(
      this.store
        .select<ScheduleList[]>('scheduleLists')
        .map(scheduleLists => scheduleLists.filter(scheduleList => scheduleList.id != '' && scheduleList.active))
        .map(scheduleLists => scheduleLists.map(scheduleList => scheduleList.id)),

      this.store
        .select<TaskSchedule[]>('taskSchedules')
        .map((taskSchedules) => taskSchedules.filter((taskSchedule) => taskSchedule.id != '' && taskSchedule.active)),

      (scheduleListsIds, taskSchedules) => {
        return taskSchedules.filter(taskSchedule => scheduleListsIds.includes(taskSchedule.scheduleListId))
      }
    )
      .subscribe((taskSchedules) => {
        this.cancelJobs();
        this.scheduleJobs(taskSchedules);
      })

    this.scheduleEmitter.subscribe((taskSchedule) => {
      this.executeTasks(taskSchedule);
    });
  }
  public ngOnDestroy() {
    this.cancelJobs();
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
        let ruleObj = {rule};

        if (taskSchedule.useDateRange) {
          Object.assign(ruleObj, {
            start: taskSchedule.start,
            end: taskSchedule.end,
          });
        }
        return schedule.scheduleJob(taskSchedule.name, ruleObj, () => {
          this.scheduleEmitter.next(taskSchedule);
        })
      })
    ].filter(job => job);
  }
  private executeTasks(taskSchedule: TaskSchedule) {
    console.log('Executing TaskSchedule: ', taskSchedule.name);
  }
}
