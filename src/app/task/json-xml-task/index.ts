export * from './json-xml.task.executor'
export * from './json-xml.task'

import { JsonXmlTaskComponent, JsonXmlTaskExecutor } from '.';

export interface JsonXmlTaskData {
  from: number
  path: string
}

export const JsonXmlTaskType: TaskType = {
    name: JsonXmlTaskComponent.taskName,
    type: JsonXmlTaskComponent.name,
    component: JsonXmlTaskComponent,
    executor: JsonXmlTaskExecutor,
};
