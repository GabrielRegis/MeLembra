import moment from 'moment';
export interface Chassi {
    id: string;
    chassiNumber: number;
    createdDate?: Date | string | moment.Moment;
    lastModifiedDate?: Date | string | moment.Moment;
}

export namespace Chassi {
    export const Types = ['id', 'chassiNumber', 'createdDate', 'lastModifiedDate'];
}
