import { ApiResponse } from 'apisauce';
import { api } from '.';
import { Chassi } from '../../Model/Chassi';
import { ResultPage } from '../../Model/ResultPage';

const chassiApi = () => {
    const query = (): Promise<ApiResponse<ResultPage<Chassi>>> => {
        return api.get<ResultPage<Chassi>>('/api/chassis');
    };

    return {
        query
    };
};

export default chassiApi();
