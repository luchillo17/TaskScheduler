// Replace later with Webpack 2 Context for automated exports & variables
import {
  BaseTaskComponent,
  LogTaskComponent
} from ".";

export * from './base-task/base.task'
export * from './log-task/log.task'

export const tasksTypes: TaskType[] = [
  {
    name: BaseTaskComponent.taskName,
    type: BaseTaskComponent.name,
    component: BaseTaskComponent,
  },
  {
    name: LogTaskComponent.taskName,
    type: LogTaskComponent.name,
    component: LogTaskComponent,
  },
];

// This ones are fixed
export * from './task.component'
export * from './task.selector'
export * from './task.reducers'
export * from './task.module'
