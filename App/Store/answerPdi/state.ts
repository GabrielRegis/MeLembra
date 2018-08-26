import { HttpRequestStatus } from '../../Model/HttpRequestStatus';
import { ImmutableObject } from 'seamless-immutable';

export interface AnswerPdiState {
    chassiNumber?: number | null;
    mileage?: string | null;
    pdiDate?: Date | null;
    executedBy?: string | null;
    observation?: string | null;
    status?: HttpRequestStatus | null;
}

export type ImmutableAnswerPdiState = ImmutableObject<AnswerPdiState>;
