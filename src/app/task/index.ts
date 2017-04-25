// Replace later with Webpack 2 Context for automated exports & variables

export * from './base-task/base.task'
export * from './log-task/log.task'
import {
  BaseTaskComponent,
  LogTaskComponent,
  LogTaskType,
} from ".";

export const tasksTypes: TaskType[] = [
  // {
  //   name: BaseTaskComponent.taskName,
  //   type: BaseTaskComponent.name,
  //   component: BaseTaskComponent,
  // },
  {
    name: LogTaskComponent.taskName,
    type: LogTaskComponent.name,
    component: LogTaskComponent,
  },
  // LogTaskType,
];

// This ones are fixed
export * from './task.component'
export * from './task.selector'
export * from './task.reducers'
export * from './task.module'
