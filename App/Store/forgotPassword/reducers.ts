import { AnyAction, Reducer } from 'redux';
import { createReducer } from 'reduxsauce';
import * as Immutable from 'seamless-immutable';
import { ImmutableForgotPasswordState, ForgotPasswordState } from './state';
import { ForgotPasswordActionType } from './types';
import { HttpRequestStatus } from '../../Model/HttpRequestStatus';
import { Authentication } from '../../Model/Authentication';

const INITIAL_STATE: ImmutableForgotPasswordState = Immutable.from<ForgotPasswordState>({
    email: '',
    status: HttpRequestStatus.NOOP,
    errorMessage: ''
});

const resetPassword: Reducer<ImmutableForgotPasswordState> = (state: ImmutableForgotPasswordState, { payload }: AnyAction & { payload?: string }) => {
    return payload ? state.merge({ status: HttpRequestStatus.ONGOING, email: payload }) : state;
};

const resetPasswordSuccess: Reducer<ImmutableForgotPasswordState> = (
    state: ImmutableForgotPasswordState,
    {  }: AnyAction & { payload?: Authentication }
) => {
    return state.merge({ status: HttpRequestStatus.SUCCESS });
};

const resetPasswordError: Reducer<ImmutableForgotPasswordState> = (
    state: ImmutableForgotPasswordState,
    { payload }: AnyAction & { payload?: string }
) => {
    return state.merge({ status: HttpRequestStatus.ERROR, errorMessage: payload });
};

const ForgotPasswordReducer = createReducer<ImmutableForgotPasswordState>(INITIAL_STATE, {
    [ForgotPasswordActionType.RESET_PASSWORD]: resetPassword,
    [ForgotPasswordActionType.RESET_PASSWORD_SUCCESS]: resetPasswordSuccess,
    [ForgotPasswordActionType.RESET_PASSWORD_ERROR]: resetPasswordError
});

export default ForgotPasswordReducer;
