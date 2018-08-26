import { createAction } from 'redux-actions';
import { SyncTypes } from './types';

const actions = {
    start: createAction(SyncTypes.START),
    finished: createAction(SyncTypes.FINISHED),
    error: createAction(SyncTypes.ERROR)
};

export const SyncActions = actions;
export type SyncActions = typeof SyncActions;
