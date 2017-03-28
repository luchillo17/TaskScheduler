import { ActionReducer } from '@ngrx/store';

const scheduleListsReducer: ActionReducer<ScheduleList[]> = (state = [], action) => {
  switch (action.type) {
    case 'SHOW_ALL':
      return state;
    case 'ADD_LIST':
      return [
          ...state,
          action.payload,
      ];

    default:
      return state;
  }
}

export const AppReducers = {
  scheduleLists: scheduleListsReducer,
};
