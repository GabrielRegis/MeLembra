import { all, takeLatest } from 'redux-saga/effects';

import { LoginActions } from './login/actions';
import { ForgotPasswordActions } from './forgotPassword/actions';
import { StartupActions } from './startup';
import { startup } from './startup/sagas';
import { login } from './login/sagas';
import { resetPassword } from './forgotPassword/sagas';
import { logout } from './menu/sagas';
import { MenuActions } from './menu/actions';
import { SyncActions } from './sync';
import { sync } from './sync/sagas';

export default function* rootSagas() {
    yield all([
        takeLatest(StartupActions.startup, startup),
        takeLatest(LoginActions.login, login),
        takeLatest(ForgotPasswordActions.resetPassword, resetPassword),
        takeLatest(MenuActions.logout, logout),
        takeLatest(SyncActions.start, sync)
    ]);
}
