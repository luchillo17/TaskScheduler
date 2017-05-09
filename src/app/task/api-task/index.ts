export * from './api.task.executor'
export * from './api.task'

import { ApiTaskComponent, ApiTaskExecutor } from '.';

export interface ApiTaskData {
  url: string;
  method: 'GET' | 'POST';
  authorization: string;
  requestData: {
    query: string;
    variables: any;
  } | any;
}

export const ApiTaskType: TaskType = {
    name: ApiTaskComponent.taskName,
    type: ApiTaskComponent.name,
    component: ApiTaskComponent,
    executor: ApiTaskExecutor,
};
