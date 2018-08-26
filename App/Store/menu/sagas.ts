import { MenuActions } from './actions';
import { put } from 'redux-saga/effects';
import { SagaIterator } from 'redux-saga';
import { removeAuthToken } from '../../Services/Api/index';

export function* logout(): SagaIterator {
    try {
        removeAuthToken();
        yield put(MenuActions.logoutSuccess());
    } catch (e) {
        yield put(MenuActions.logoutError());
    }
}
