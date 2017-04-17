import { ActionReducer } from '@ngrx/store';

import {
  taskScheduleDialogStateReducer,
  taskSchedulesReducer,
  tasksReducer
} from "..";

const initialListsState: ListsState = { selectedScheduleList: "", selectedTaskScedule: "", selectedTask: '' };

export const listsStateReducer: ActionReducer<ListsState> = (state = initialListsState, action) => {
  switch (action.type) {
    case 'SHOW_ALL':
      return Object.assign({}, state, {
        selectedScheduleList: '',
        selectedTaskScedule: '',
        selectedTask: '',
      } as ListsState);

    case 'SHOW_LIST':
      return Object.assign({}, state, {
        selectedScheduleList: action.payload,
        selectedTaskScedule: '',
        selectedTask: '',
      } as ListsState);

    case 'SHOW_TASK_SCHEDULE':
      return Object.assign({}, state, {
        selectedTaskScedule: action.payload,
        selectedTask: '',
      } as ListsState);

    case 'SHOW_TASK':
      return Object.assign({}, state, {
        selectedTask: action.payload,
      } as ListsState);

    default:
      return state;
  }
}

const initialListDialogState = { show: false, type: 'NEW' }

export const listDialogStateReducer: ActionReducer<DialogState> = (state = initialListDialogState, action) => {
  switch (action.type) {
    case 'SHOW_LIST_DIALOG':
      return Object.assign({}, state, { show: true, type: action.payload, });
    case 'HIDE_LIST_DIALOG':
      return Object.assign({}, state, { show: false });
    default:
      return state;
  }
}

const initialScheduleListState: ScheduleList[] = [
  {
    id: '',
    name: 'Mostrar todas',
  }
];

export const scheduleListsReducer: ActionReducer<ScheduleList[]> = (state = initialScheduleListState, action) => {
  let defaults = {
    id: '',
    name: '',
    active: true,
    taskScheduleIds: [],
  } as ScheduleList;

  let selectedSceduleList: ScheduleList;

  switch (action.type) {
    case 'ADD_LIST':
      return [
          ...state,
          Object.assign({}, defaults, action.payload),
      ];
    case 'UPDATE_LIST':
      selectedSceduleList = action.payload
      return [
          ...state.filter((scheduleList) => scheduleList.id !== selectedSceduleList.id),
          selectedSceduleList,
      ];
    case 'DELETE_LIST':
      selectedSceduleList = action.payload
      return [
          ...state.filter((scheduleList) => scheduleList.id !== selectedSceduleList.id),
      ];

    default:
      return state;
  }
}

export const AppReducers = {
  listsState     : listsStateReducer,
  scheduleLists  : scheduleListsReducer,
  listDialogState: listDialogStateReducer,

  tasks                  : tasksReducer,
  taskSchedules          : taskSchedulesReducer,
  taskScheduleDialogState: taskScheduleDialogStateReducer,
};
