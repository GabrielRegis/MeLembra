import { ForgotPasswordActions } from './actions';
import { put, call } from 'redux-saga/effects';
import { ActionOf } from 'reduxsauce';
import { ApiResponse } from 'apisauce';
import authentication from '../../Services/Api/authentication';
import { SagaIterator } from 'redux-saga';
import { HttpRequestStatus } from '../../Model/HttpRequestStatus';

export function* resetPassword(action: ActionOf<string>): SagaIterator {
    const response: ApiResponse<string> = yield call(authentication.resetPassword, action.payload);
    if (response.status === 200) {
        yield put(ForgotPasswordActions.resetPasswordSuccess(HttpRequestStatus.SUCCESS));
    } else {
        yield put(ForgotPasswordActions.resetPasswordError(response.data!));
    }
}
