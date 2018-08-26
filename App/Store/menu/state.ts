import { HttpRequestStatus } from '../../Model/HttpRequestStatus';
import { ImmutableObject } from 'seamless-immutable';

export interface MenuState {
    status?: HttpRequestStatus | null;
}

export type ImmutableMenuState = ImmutableObject<MenuState>;
