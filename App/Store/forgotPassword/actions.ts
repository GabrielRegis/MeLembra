import { createAction } from 'redux-actions';
import { ForgotPasswordActionType } from './types';
import { HttpRequestStatus } from '../../Model/HttpRequestStatus';

export const ForgotPasswordActions = {
    resetPassword: createAction<string>(ForgotPasswordActionType.RESET_PASSWORD),

    resetPasswordSuccess: createAction<HttpRequestStatus>(ForgotPasswordActionType.RESET_PASSWORD_SUCCESS),

    resetPasswordError: createAction<string>(ForgotPasswordActionType.RESET_PASSWORD_ERROR)
};

export type ForgotPasswordActions = typeof ForgotPasswordActions;
