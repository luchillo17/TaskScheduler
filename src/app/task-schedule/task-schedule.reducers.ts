import { ActionReducer } from '@ngrx/store';

const initialTaskScheduleDialogState = { show: false, type: 'NEW' }

export const taskScheduleDialogStateReducer: ActionReducer<DialogState> =
  (state = initialTaskScheduleDialogState, action) => {
    switch (action.type) {
      case 'SHOW_TASK_SCHEDULE_DIALOG':
        return Object.assign({}, state, { show: true, type: action.payload, });
      case 'HIDE_TASK_SCHEDULE_DIALOG':
        return Object.assign({}, state, { show: false });
      default:
        return state;
    }
  }

const initialTaskScheduleState: TaskSchedule[] = [
  {
    id: '',
    name: 'Mostrar todas',
  } as TaskSchedule,
];

const taskScheduleDefaults = {
  id: '',
  name: '',
  folderId: '',
  useDateRange: false,
  minute: '*',
  hour: '*',
  dayOfMonth: '*',
  month: '*',
  dayOfWeek: '*',
  active: true,
  mailNotify: false,
  mailAddress: '',
} as TaskSchedule;

export const taskSchedulesReducer: ActionReducer<TaskSchedule[]> = (state = initialTaskScheduleState, action) => {

  let selectedTaskSchedule: TaskSchedule;

  switch (action.type) {
    case 'ADD_TASK_SCHEDULE':
      return [
          ...state,
          Object.assign({}, taskScheduleDefaults, action.payload),
      ];
    case 'UPDATE_TASK_SCHEDULE':
      selectedTaskSchedule = action.payload
      return [
          ...state.filter((taskSchedule) => taskSchedule.id !== selectedTaskSchedule.id),
          selectedTaskSchedule,
      ];
    case 'DELETE_TASK_SCHEDULE':
      selectedTaskSchedule = action.payload
      return [
          ...state.filter((taskSchedule) => taskSchedule.id !== selectedTaskSchedule.id),
      ];
    case 'DELETE_TASK_SCHEDULES_BY_FOLDER_ID':
      if (!action.payload) return state;
      return [
          ...state.filter((taskSchedule) => taskSchedule.folderId !== action.payload),
      ];

    default:
      return state;
  }
}

export const taskSchedulesExecutedAtReducer: ActionReducer<TaskSchedulesExecutedState> = (state = {}, action) => {
  switch (action.type) {
    case 'RESET_TASK_SCHEDULE_EXECUTED_AT':
     return {}

    case 'SET_TASK_SCHEDULE_EXECUTED_AT':
      const { id } = action.payload;
      return {
        ...state,
        [id]: action.payload,
      }

    default:
      return state;
  }
}
