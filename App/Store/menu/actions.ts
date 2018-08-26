import { createAction } from 'redux-actions';
import { MenuActionType } from './types';

export const MenuActions = {
    logout: createAction(MenuActionType.LOGOUT),

    logoutSuccess: createAction(MenuActionType.LOGOUT_SUCCESS),

    logoutError: createAction(MenuActionType.LOGOUT_ERROR)
};

export type MenuActions = typeof MenuActions;