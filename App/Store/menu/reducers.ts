import { Reducer } from 'redux';
import { createReducer } from 'reduxsauce';
import * as Immutable from 'seamless-immutable';
import { ImmutableMenuState, MenuState } from './state';
import { MenuActionType } from './types';
import { HttpRequestStatus } from '../../Model/HttpRequestStatus';

const INITIAL_STATE: ImmutableMenuState = Immutable.from<MenuState>({
    status: HttpRequestStatus.NOOP
});

const logout: Reducer<ImmutableMenuState> = (state: ImmutableMenuState) => {
    return state.merge({ status: HttpRequestStatus.ONGOING });
};

const logoutSuccess: Reducer<ImmutableMenuState> = (state: ImmutableMenuState) => {
    return state.merge({ status: HttpRequestStatus.SUCCESS });
};

const logoutError: Reducer<ImmutableMenuState> = (state: ImmutableMenuState) => {
    return state.merge({ status: HttpRequestStatus.ERROR });
};

const MenuReducer = createReducer<ImmutableMenuState>(INITIAL_STATE, {
    [MenuActionType.LOGOUT]: logout,
    [MenuActionType.LOGOUT_SUCCESS]: logoutSuccess,
    [MenuActionType.LOGOUT_ERROR]: logoutError
});

export default MenuReducer;
