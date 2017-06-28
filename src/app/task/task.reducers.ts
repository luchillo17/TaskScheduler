import { ActionReducer } from '@ngrx/store';

import { tasksTypes } from '.';

const LogTaskType: TaskType = tasksTypes.find((taskType) => taskType.type === 'LogTaskComponent');

const taskDefaults: Task = {
  id: '',
  name: '',
  order: 0,
  active: true,
  taskScheduleId: '',

  crudMethod: 'NEW',
  type: LogTaskType,
};

const initialTaskState: Task[] = [];

export const currentTaskReducer: ActionReducer<Task> = (state = initialTaskState[0], action) => {
  switch (action.type) {
    case 'RESET_CURRENT_TASK':
      return taskDefaults;

    case 'CREATE_CURRENT_TASK':
      return Object.assign({}, taskDefaults, action.payload);

    case 'UPDATE_CURRENT_TASK':
      return Object.assign({}, state, action.payload);

    default:
      return state;
  }
}

export const tasksReducer: ActionReducer<Task[]> = (state = initialTaskState, action) => {
  let selectedTask: Task;

  switch (action.type) {
    case 'ADD_TASK':
      return ([
          ...state,
          Object.assign({}, taskDefaults, action.payload) as Task,
      ])
      .map((task, index) => ({...task, order: index}));

    case 'UPDATE_TASK':
      selectedTask = { ...taskDefaults, ...action.payload }
      return ([
          ...state.filter((task) => task.id !== selectedTask.id),
          selectedTask,
      ])
      .sort((a, b) => a.order - b.order)
      .map((task, index) => ({...task, order: index}));

    case 'DELETE_TASK':
      selectedTask = action.payload
      return [
          ...state.filter((scheduleList) => scheduleList.id !== selectedTask.id),
      ]
      .sort((a, b) => a.order - b.order)
      .map((task, index) => ({...task, order: index}));

    default:
      return state;
  }
}
