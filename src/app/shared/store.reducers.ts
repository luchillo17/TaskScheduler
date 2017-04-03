import { ActionReducer } from '@ngrx/store';

const initialListsState: ListsState = { selectedScheduleList: "", selectedTaskScedule: "" };

export const listsStateReducer: ActionReducer<ListsState> = (state = initialListsState, action) => {
  switch (action.type) {
    case 'SHOW_ALL':
      return Object.assign({}, state, {
        selectedScheduleList: "",
      } as ListsState);

    case 'SHOW_LIST':
      return Object.assign({}, state, {
        selectedScheduleList: action.payload,
      } as ListsState);

    default:
      return state;
  }
}

export const newListDialogStateReducer: ActionReducer<boolean> = (state = false, action) => {
  switch (action.type) {
    case 'SHOW_NEW_LIST_DIALOG':
      return true;
    case 'HIDE_NEW_LIST_DIALOG':
      return false;
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

  switch (action.type) {
    case 'ADD_LIST':
      return [
          ...state,
          Object.assign({}, defaults, action.payload),
      ];

    default:
      return state;
  }
}

export const AppReducers = {
  listsState:      listsStateReducer,
  scheduleLists:   scheduleListsReducer,
  newListDialogState: newListDialogStateReducer,
};
