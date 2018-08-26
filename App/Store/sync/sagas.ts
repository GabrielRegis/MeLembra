import { SagaIterator } from 'redux-saga';
import { select, call, put } from 'redux-saga/effects';
import database from '../../Services/Repository/config/database';
import { RootState } from '../state';
import { setAuthToken } from '../../Services/Api';
import { is } from 'ramda';
import { SyncService, SyncResult } from './SyncService';
import { SyncActions } from '.';

export const selectToken = (state: RootState) => state.login.token;
export function* sync(): SagaIterator {
    const token = yield select(selectToken);
    if (is(String, token)) {
        setAuthToken(token);
    }

    database.setCurrentUser('deividi-chassi-test-2');

    const syncService = new SyncService();
    const result = yield call(syncService.performSync);

    result === SyncResult.SUCCESS ? yield put(SyncActions.finished()) : yield put(SyncActions.error());
}
