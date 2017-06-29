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
} from '../task-schedule';

import { mailConfigReducer } from '../mail-notification';

/**
 * ScheduleList reducers
 */
const initialListsState: ListsState = {
  selectedFolder: '',
  selectedTaskSchedule: '',
  selectedTask: '',
};

export const listsStateReducer: ActionReducer<ListsState> = (state = initialListsState, action) => {
  switch (action.type) {
    case 'SHOW_ALL':
      return Object.assign({}, state, {
        selectedFolder: '',
        selectedTaskSchedule: '',
        selectedTask: '',
      } as ListsState);

    case 'SHOW_LIST':
      return Object.assign({}, state, {
        selectedFolder: action.payload,
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

const initialFolderDialogState = { show: false, type: 'NEW' };

export const folderDialogStateReducer: ActionReducer<DialogState> =
  (state = initialFolderDialogState, action) => {
    switch (action.type) {
      case 'SHOW_LIST_DIALOG':
        return Object.assign({}, state, { show: true, type: action.payload, });
      case 'HIDE_LIST_DIALOG':
        return Object.assign({}, state, { show: false });
      default:
        return state;
    }
  };

const initialFolderState: Folder[] = [
  {
    id: '',
    name: 'Mostrar todas',
  }
];

export const foldersReducer: ActionReducer<Folder[]> =
  (state = initialFolderState, action) => {
    const defaults = {
      id: '',
      name: '',
      active: true,
      taskScheduleIds: [],
    } as Folder;

    let selectedFolder: Folder;

    switch (action.type) {
      case 'ADD_LIST':
        return [
            ...state,
            Object.assign({}, defaults, action.payload),
        ];
      case 'UPDATE_LIST':
        selectedFolder = action.payload;
        return [
            ...state.filter((scheduleList) => scheduleList.id !== selectedFolder.id),
            selectedFolder,
        ];
      case 'DELETE_LIST':
        selectedFolder = action.payload;
        return [
            ...state.filter((scheduleList) => scheduleList.id !== selectedFolder.id),
        ];

      default:
        return state;
    }
  };

export const AppReducers = {
  listsState     : listsStateReducer,

  folders  : foldersReducer,
  folderDialogState: folderDialogStateReducer,

  taskSchedules          : taskSchedulesReducer,
  taskScheduleDialogState: taskScheduleDialogStateReducer,

  taskDialogState: taskDialogStateReducer,

  tasks      : tasksReducer,
  currentTask: currentTaskReducer,

  mailConfig: mailConfigReducer,
};
