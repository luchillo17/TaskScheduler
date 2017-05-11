import { ActionReducer } from '@ngrx/store';

const initialMailConfig: MailConfig = {
  service: 'gmail',
  user: '',
  pass: '',
};

export const mailConfigReducer: ActionReducer<MailConfig> = (state = initialMailConfig, action) => {
  switch (action.type) {
    case 'SET_MAIL_CONFIGS':
      return Object.assign({}, initialMailConfig, action.payload)
    case 'UPDATE_MAIL_CONFIGS':
      return Object.assign({}, state, action.payload)
    default:
      return state
  }
};
