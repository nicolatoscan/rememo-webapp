import * as apiHelpers from '@/helpers/api.helper';
import * as Models from '@/models';

export async function getUserInfo(): Promise<Models.User> {
    try {
        return (await apiHelpers.get('/users')).data as Models.User;
    } catch (err) {
        throw new Models.ApiError(err.response.status, err.response.data)
    }
}

export async function updateUserInfo(updateProps: { [id: string]: string }): Promise<void> {
    try {
        await apiHelpers.put('/users', updateProps);
    } catch (err) {
        throw new Models.ApiError(err.response.status, err.response.data)
    }
}