export * from './log.task.executor'
export * from './log.task'

import { LogTaskComponent, LogTaskExecutor } from '.';

export interface LogTaskData {
  text: string;
  logTasksData: boolean;
}

export const LogTaskType: TaskType = {
    name: LogTaskComponent.taskName,
    type: LogTaskComponent.name,
    component: LogTaskComponent,
    executor: new LogTaskExecutor(),
};
