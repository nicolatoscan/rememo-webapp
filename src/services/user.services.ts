import * as apiHelpers from '@/helpers/api.helper';
import * as Models from '@/models';

export async function getUserInfo(): Promise<Models.User> {
    try {
        return (await apiHelpers.get('/users')).data as Models.User;
    } catch (err) {
        throw new Models.ApiError(err.response.status, err.response.data)
    }
}