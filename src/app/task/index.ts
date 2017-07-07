// Replace later with Webpack 2 Context for automated exports & variables

export * from './base-task'
export * from './log-task'
export * from './api-task'
export * from './json-task'
export * from './json-xml-task'
export * from './schedule-data-task'

import {
  LogTaskType,
  ApiTaskType,
  JsonTaskType,
  JsonXmlTaskType,
  ScheduleDataTaskType,
} from '.';

export const tasksTypes: TaskType[] = [
  LogTaskType,
  ApiTaskType,
  JsonTaskType,
  JsonXmlTaskType,
  ScheduleDataTaskType,
];

// This ones are fixed
export * from './task.component'
export * from './task.selector'
export * from './task.reducers'
export * from './task.module'
