import * as apiHelpers from '@/helpers/api.helper';
import * as Models from '@/models';

export async function getMyCollections(): Promise<Models.Collection[]> {
    try {
        return (await apiHelpers.get('/collections')).data as Models.Collection[];
    } catch (err) {
        throw new Models.ApiError(err.response.status, err.response.data)
    }
}
