import { createAction } from 'redux-actions';
import { AnswerPdiActionType } from './types';

export const AnswerPdiActions = {

    loginError: createAction(AnswerPdiActionType.LOGIN_ERROR)
};
export type AnswerPdiActions = typeof AnswerPdiActions;
