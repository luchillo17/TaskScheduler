export * from './json.task.executor'
export * from './json.task'

import { JsonTaskComponent, JsonTaskExecutor } from '.';

export interface JsonTaskData {
  from: number
  format: MapFormat
}

export const JsonTaskType: TaskType = {
    name: JsonTaskComponent.taskName,
    type: JsonTaskComponent.name,
    component: JsonTaskComponent,
    executor: JsonTaskExecutor,
};
