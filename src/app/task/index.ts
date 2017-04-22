// Replace later with Webpack 2 Context for automated exports & variables
import { BaseTaskComponent } from ".";
export * from './base-task/base.task'

export const tasksTypes: TaskType[] = [
  // {
  //   name: 'Tarea base',
  //   type: BaseTaskComponent.name,
  //   component: BaseTaskComponent,
  // },
];

// This ones are fixed
export * from './task.component'
export * from './task.selector'
export * from './task.reducers'
export * from './task.module'
