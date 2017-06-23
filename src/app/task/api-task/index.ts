export * from './api.task.executor'
export * from './api.task'

import { ApiTaskComponent, ApiTaskExecutor } from '.';

export interface ApiTaskData {
  url: string;
  method: 'GET' | 'POST';
  authInBody: boolean;
  authPath?: string;
  authorization: string;
  dataFromMemory: boolean;
  requestData?: JSON;
  requestPath?: string;
}

export const ApiTaskType: TaskType = {
    name: ApiTaskComponent.taskName,
    type: ApiTaskComponent.name,
    component: ApiTaskComponent,
    executor: ApiTaskExecutor,
};
