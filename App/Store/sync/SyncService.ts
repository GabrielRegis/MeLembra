import { ResultPage } from '../../Model/ResultPage';
import { Chassi } from '../../Model/Chassi';
import chassiApi from '../../Services/Api/chassiApi';
import { ApiResponse } from 'apisauce';
import ChassiRepository from '../../Services/Repository/ChassiRepository';

export class SyncService {
    async performSync(): Promise<SyncResult> {
        const chassiHttpResult: ApiResponse<ResultPage<Chassi>> = await chassiApi.query();

        if (!chassiHttpResult.ok || chassiHttpResult.data === undefined) {
            return Promise.reject(SyncResult.ERROR);
        }

        const chassiPage: ResultPage<Chassi> = chassiHttpResult.data;
        await ChassiRepository.save(chassiPage.content);
        const all = await ChassiRepository.findAll();
        console.log(chassiPage.content, all);

        return Promise.resolve(SyncResult.SUCCESS);
    }
}

export enum SyncResult {
    SUCCESS,
    ERROR
}
