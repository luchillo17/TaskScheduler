import { ActionReducer } from '@ngrx/store';

const initialTaskScheduleDialogState = { show: false, type: 'NEW' }

export const taskScheduleDialogStateReducer: ActionReducer<DialogState> = (state = initialTaskScheduleDialogState, action) => {
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

export const taskSchedulesReducer: ActionReducer<TaskSchedule[]> = (state = initialTaskScheduleState, action) => {
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
  } as TaskSchedule;

  let selectedTaskScedule: TaskSchedule;

  switch (action.type) {
    case 'ADD_TASK_SCHEDULE':
      return [
          ...state,
          Object.assign({}, defaults, action.payload),
      ];
    case 'UPDATE_TASK_SCHEDULE':
      selectedTaskScedule = action.payload
      return [
          ...state.filter((taskSchedule) => taskSchedule.id !== selectedTaskScedule.id),
          selectedTaskScedule,
      ];
    case 'DELETE_TASK_SCHEDULE':
      selectedTaskScedule = action.payload
      return [
          ...state.filter((taskSchedule) => taskSchedule.id !== selectedTaskScedule.id),
      ];
    case 'DELETE_TASK_SCHEDULES_BY_SCHEDULE_LIST_ID':
      if (!action.payload) return state;
      return [
          ...state.filter((taskSchedule) => taskSchedule.scheduleListId !== action.payload),
      ];

    default:
      return state;
  }
}