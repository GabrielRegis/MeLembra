import { ApiResponse } from 'apisauce';
import { Authentication } from '../../Model/Authentication';
import { api } from '.';

export const authenticate = () => {
    const login = (authentication: Authentication): Promise<ApiResponse<Authentication>> => {
        return api.post<Authentication>('/api/authenticate', authentication);
    };
    const resetPassword = (email: string): Promise<ApiResponse<string>> => {
        return api.post<string>('/api/account/reset_password/init', email);
    };

    return {
        login,
        resetPassword
    };
};

export default authenticate();
