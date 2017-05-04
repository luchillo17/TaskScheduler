// Replace later with Webpack 2 Context for automated exports & variables

export * from './base-task'
export * from './log-task'

import {
  LogTaskType,
} from ".";

export const tasksTypes: TaskType[] = [
  LogTaskType,
];

// This ones are fixed
export * from './task.component'
export * from './task.selector'
export * from './task.reducers'
export * from './task.module'
