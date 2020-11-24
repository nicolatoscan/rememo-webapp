import config from '@/config';
import * as authHelper from '@/helpers/auth.helper'
import axios, { AxiosResponse } from 'axios';

export function get(relativeUrl: string): Promise<AxiosResponse<any>> {
    return axios.get(
        `${config.API_ENDPOINT}${relativeUrl}`,
        { headers: authHelper.getAuthHeader() }
    );
}

export function post(relativeUrl: string, data: any): Promise<AxiosResponse<any>> {
    return axios.post(
        `${config.API_ENDPOINT}${relativeUrl}`,
        data,
        { headers: authHelper.getAuthHeader() }
    );
}

export function put(relativeUrl: string, data: any): Promise<AxiosResponse<any>> {
    return axios.put(
        `${config.API_ENDPOINT}${relativeUrl}`,
        data,
        { headers: authHelper.getAuthHeader() }
    );
}

export function del(relativeUrl: string): Promise<AxiosResponse<any>> {
    return axios.delete(
        `${config.API_ENDPOINT}${relativeUrl}`,
        { headers: authHelper.getAuthHeader() }
    );
}


