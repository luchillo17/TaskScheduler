// Replace later with Webpack 2 Context for automated exports & variables

export * from './base-task'
export * from './log-task'
export * from './api-task'

import {
  LogTaskType,
  ApiTaskType,
} from '.';

export const tasksTypes: TaskType[] = [
  LogTaskType,
  ApiTaskType,
];

// This ones are fixed
export * from './task.component'
export * from './task.selector'
export * from './task.reducers'
export * from './task.module'
