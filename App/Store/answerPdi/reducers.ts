import { Reducer } from 'redux';
import { createReducer } from 'reduxsauce';
import * as Immutable from 'seamless-immutable';
import { AnswerPdiState } from './state';
import { ImmutableAnswerPdiState } from './state';
import { AnswerPdiActionType } from './types';
import { HttpRequestStatus } from '../../Model/HttpRequestStatus';

const INITIAL_STATE: ImmutableAnswerPdiState = Immutable.from<AnswerPdiState>({
    status: HttpRequestStatus.NOOP
});

const loginError: Reducer<ImmutableAnswerPdiState> = (state: ImmutableAnswerPdiState) => {
    return state.merge({ status: HttpRequestStatus.ERROR });
};

const AnswerPdiReducer = createReducer<ImmutableAnswerPdiState>(INITIAL_STATE, {
    [AnswerPdiActionType.LOGIN_ERROR]: loginError
});

export default AnswerPdiReducer;
