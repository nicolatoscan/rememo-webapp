import CONFIG from '@/config'
import axios from 'axios';
import * as apiHelpers from '@/helpers/api.helper';
import * as authHelper from '@/helpers/auth.helper'
import * as Models from '@/models';

export async function login(query: Models.LoginQuery): Promise<Models.UserLogin> {
    try {
        const res = (await apiHelpers.post('/auth/login', query)).data as Models.UserLogin;
        authHelper.saveToken(res.token);
        return res;
    } catch (err) {
        throw new Models.ApiError(err.response.status, err.response.data)
    }
}

export async function signup(query: Models.SignupQuery): Promise<Models.UserLogin> {
    try {
        const res = (await apiHelpers.post('/auth/signup', query)).data as Models.UserLogin;
        authHelper.saveToken(res.token);
        return res;
    } catch (err) {
        throw new Models.ApiError(err.response.status, err.response.data)
    }
}