import { ActionReducer } from '@ngrx/store';

const initialTaskDialogState = { show: false, type: 'NEW' }

export const taskDialogStateReducer: ActionReducer<DialogState> = (state = initialTaskDialogState, action) => {
  switch (action.type) {
    case 'SHOW_TASK_DIALOG':
      return Object.assign({}, state, { show: true, type: action.payload, });
    case 'HIDE_TASK_DIALOG':
      return Object.assign({}, state, { show: false });
    default:
      return state;
  }
}

const initialTaskState: Task[] = [
  {
    id: '0',
    name: 'Task 1',
    order: 1,
    active: true,
    taskScheduleId: '2783fc70-2395-11e7-b013-756e75906f8b',

    type: 'base',
  },
  {
    id: '1',
    name: 'Task 2',
    order: 0,
    active: true,
    taskScheduleId: '2783fc70-2395-11e7-b013-756e75906f8b',

    type: 'base',
  },
  {
    id: '2',
    name: 'Task 3',
    order: 0,
    active: true,
    taskScheduleId: '2783fc70-2395-11e7-b013-756e75906f8b',

    type: 'base',
  },
  {
    id: '3',
    name: 'Task 4',
    order: 0,
    active: true,
    taskScheduleId: '3e82d3b0-2395-11e7-b013-756e75906f8b',

    type: 'base',
  },
];

export const tasksReducer: ActionReducer<Task[]> = (state = initialTaskState, action) => {
  let defaults = {
    id: '',
    name: '',
    order: 0,
    active: true,
    taskScheduleId: '',

    type: 'base',
  } as Task;

  let selectedSceduleList: Task;

  switch (action.type) {
    case 'ADD_TASK':
      return ([
          ...state,
          Object.assign({}, defaults, action.payload),
      ] as Task[]).sort((a, b) => b.order - a.order);

    case 'UPDATE_TASK':
      selectedSceduleList = action.payload
      return ([
          ...state.filter((scheduleList) => scheduleList.id !== selectedSceduleList.id),
          selectedSceduleList,
      ] as Task[]).sort((a, b) => b.order - a.order);

    case 'DELETE_TASK':
      selectedSceduleList = action.payload
      return [
          ...state.filter((scheduleList) => scheduleList.id === selectedSceduleList.id),
      ];

    default:
      return state;
  }
}