export * from './authentication';
export * from './chassiApi';

import apisauce, { ApisauceInstance } from 'apisauce';
import AppConfig from '../../Config/AppConfig';

const instance = (baseURL: string = AppConfig.apiUrl || 'http://localhost:8080/api'): ApisauceInstance => {
    const api: ApisauceInstance = apisauce.create({
        baseURL,
        headers: {
            'Content-Type': 'application/json'
        },
        timeout: 15000
    });

    return api as ApisauceInstance;
};

export const api = instance();

export const setAuthToken = (token: string) => api.setHeader('Authorization', 'Bearer ' + token);
export const removeAuthToken = () => api.setHeader('Authorization', '');
