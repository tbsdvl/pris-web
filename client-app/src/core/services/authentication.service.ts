import type { AxiosResponse } from 'axios';
import { get, post } from './api.service';

export const getRedirectURL = async (): Promise<AxiosResponse<any, any> | undefined> => {
    return await get('redirect');
}

export const getAccessToken = async (code: string): Promise<AxiosResponse<string> | undefined> => {
    return await post('token', { data: { code: code } });
}

export const getAuthenticationStatus = async (): Promise<AxiosResponse<any, any> | undefined> => {
    return await get('');
}

// move these to a separate users service
export const getProfile = async (): Promise<AxiosResponse<any, any> | undefined> => {
    return await get('profile');
}

export const getAccounts = async (publicAlias: string): Promise<AxiosResponse<any, any> | undefined> => {
    return await get(`accounts/${publicAlias}`);
}