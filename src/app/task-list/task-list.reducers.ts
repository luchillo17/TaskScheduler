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
