import { HttpRequestStatus } from '../../Model/HttpRequestStatus';
import { ImmutableObject } from 'seamless-immutable';

export interface ForgotPasswordState {
    email?: string | null;
    status?: HttpRequestStatus | null;
    errorMessage?: string | null;
}

export type ImmutableForgotPasswordState = ImmutableObject<ForgotPasswordState>;
