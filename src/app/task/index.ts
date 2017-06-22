// Replace later with Webpack 2 Context for automated exports & variables

export * from './base-task'
export * from './log-task'
export * from './api-task'
export * from './json-task'
export * from './json-xml-task'

import {
  LogTaskType,
  ApiTaskType,
  JsonTaskType,
  JsonXmlTaskType,
} from '.';

export const tasksTypes: TaskType[] = [
  LogTaskType,
  ApiTaskType,
  JsonTaskType,
  JsonXmlTaskType,
];

// This ones are fixed
export * from './task.component'
export * from './task.selector'
export * from './task.reducers'
export * from './task.module'
