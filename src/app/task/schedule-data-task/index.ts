export * from './schedule-data.task.executor'
export * from './schedule-data.task'

import { ScheduleDataTaskComponent, ScheduleDataTaskExecutor } from '.';

export interface ScheduleDataTaskData {
  path: string;
  getDataFromScheduleId: boolean;
}

export const ScheduleDataTaskType: TaskType = {
    name: ScheduleDataTaskComponent.taskName,
    type: ScheduleDataTaskComponent.name,
    component: ScheduleDataTaskComponent,
    executor: ScheduleDataTaskExecutor,
};
