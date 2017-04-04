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

const initialListDialogState = { show: false, type: 'NEW' }

export const listDialogStateReducer: ActionReducer<ListDialogState> = (state = initialListDialogState, action) => {
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
          ...state.filter((scheduleList) => scheduleList.id === selectedSceduleList.id),
          selectedSceduleList,
      ];
    case 'DELETE_LIST':
      selectedSceduleList = action.payload
      return [
          ...state.filter((scheduleList) => scheduleList.id === selectedSceduleList.id),
      ];

    default:
      return state;
  }
}

export const AppReducers = {
  listsState:      listsStateReducer,
  scheduleLists:   scheduleListsReducer,
  listDialogState: listDialogStateReducer,
};
