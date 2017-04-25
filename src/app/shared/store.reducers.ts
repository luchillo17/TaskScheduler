import { ActionReducer } from '@ngrx/store';

/**
 * Reducers import
 */
import {
  tasksReducer,
  currentTaskReducer,
} from '../task/task.reducers';

import {
  taskDialogStateReducer
} from '../task-list';

import {
  taskSchedulesReducer,
  taskScheduleDialogStateReducer
} from '../task-lists';

/**
 * ScheduleList reducers
 */
const initialListsState: ListsState = {
  selectedScheduleList: '',
  selectedTaskSchedule: '',
  selectedTask: '',
};

export const listsStateReducer: ActionReducer<ListsState> = (state = initialListsState, action) => {
  switch (action.type) {
    case 'SHOW_ALL':
      return Object.assign({}, state, {
        selectedScheduleList: '',
        selectedTaskSchedule: '',
        selectedTask: '',
      } as ListsState);

    case 'SHOW_LIST':
      return Object.assign({}, state, {
        selectedScheduleList: action.payload,
        selectedTaskSchedule: '',
        selectedTask: '',
      } as ListsState);

    case 'SHOW_TASK_SCHEDULE':
      return Object.assign({}, state, {
        selectedTaskSchedule: action.payload,
        selectedTask: '',
      } as ListsState);

    case 'SHOW_TASK':
      return Object.assign({}, state, {
        selectedTask: action.payload,
      } as ListsState);

    default:
      return state;
  }
};

const initialListDialogState = { show: false, type: 'NEW' };

export const listDialogStateReducer: ActionReducer<DialogState> =
  (state = initialListDialogState, action) => {
    switch (action.type) {
      case 'SHOW_LIST_DIALOG':
        return Object.assign({}, state, { show: true, type: action.payload, });
      case 'HIDE_LIST_DIALOG':
        return Object.assign({}, state, { show: false });
      default:
        return state;
    }
  };

const initialScheduleListState: ScheduleList[] = [
  {
    id: '',
    name: 'Mostrar todas',
  }
];

export const scheduleListsReducer: ActionReducer<ScheduleList[]> =
  (state = initialScheduleListState, action) => {
    let defaults = {
      id: '',
      name: '',
      active: true,
      taskScheduleIds: [],
    } as ScheduleList;

    let selectedScheduleList: ScheduleList;

    switch (action.type) {
      case 'ADD_LIST':
        return [
            ...state,
            Object.assign({}, defaults, action.payload),
        ];
      case 'UPDATE_LIST':
        selectedScheduleList = action.payload;
        return [
            ...state.filter((scheduleList) => scheduleList.id !== selectedScheduleList.id),
            selectedScheduleList,
        ];
      case 'DELETE_LIST':
        selectedScheduleList = action.payload;
        return [
            ...state.filter((scheduleList) => scheduleList.id !== selectedScheduleList.id),
        ];

      default:
        return state;
    }
  };

export const AppReducers = {
  listsState     : listsStateReducer,

  scheduleLists  : scheduleListsReducer,
  listDialogState: listDialogStateReducer,

  taskSchedules          : taskSchedulesReducer,
  taskScheduleDialogState: taskScheduleDialogStateReducer,

  taskDialogState: taskDialogStateReducer,

  tasks      : tasksReducer,
  currentTask: currentTaskReducer,
};
