export * from './api.task.executor'
export * from './api.task'

import { ApiTaskComponent, ApiTaskExecutor } from '.';

export interface ApiTaskData {

}

export const ApiTaskType: TaskType = {
    name: ApiTaskComponent.taskName,
    type: ApiTaskComponent.name,
    component: ApiTaskComponent,
    executor: new ApiTaskExecutor(),
};
