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
    id: '',
    name: 'Mostrar todas',
  } as Task,
];

export const tasksReducer: ActionReducer<Task[]> = (state = initialTaskState, action) => {
  let defaults = {
    id: '',
    name: '',
    scheduleListId: '',
    useDateRange: false,
    minute: '*',
    hour: '*',
    dayOfMonth: '*',
    month: '*',
    dayOfWeek: '*',
    active: true,
    taskIds: [],
  } as Task;

  let selectedSceduleList: Task;

  switch (action.type) {
    case 'ADD_TASK':
      return [
          ...state,
          Object.assign({}, defaults, action.payload),
      ];
    case 'UPDATE_TASK':
      selectedSceduleList = action.payload
      return [
          ...state.filter((scheduleList) => scheduleList.id !== selectedSceduleList.id),
          selectedSceduleList,
      ];
    case 'DELETE_TASK':
      selectedSceduleList = action.payload
      return [
          ...state.filter((scheduleList) => scheduleList.id === selectedSceduleList.id),
      ];

    default:
      return state;
  }
}