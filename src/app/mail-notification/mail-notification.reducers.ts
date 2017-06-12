import { ActionReducer, Action } from '@ngrx/store'

export const SET_MAIL_CONFIGS = 'SET_MAIL_CONFIGS'
export const UPDATE_MAIL_CONFIGS = 'UPDATE_MAIL_CONFIGS'

export const saveMailConfig = (mailConfig: MailConfig): Action => ({
  type: SET_MAIL_CONFIGS,
  payload: mailConfig,
})

const initialMailConfig: MailConfig = {
  service: 'gmail',
  user: '',
  pass: '',
};

export const mailConfigReducer: ActionReducer<MailConfig> = (state = initialMailConfig, action) => {
  switch (action.type) {
    case SET_MAIL_CONFIGS:
      return Object.assign({}, initialMailConfig, action.payload)
    case UPDATE_MAIL_CONFIGS:
      return Object.assign({}, state, action.payload)
    default:
      return state
  }
};
