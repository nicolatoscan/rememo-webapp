import * as apiHelpers from '@/helpers/api.helper';
import * as Models from '@/models';

export async function getMyCollections(): Promise<Models.Collection[]> {
    try {
        return (await apiHelpers.get('/collections')).data as Models.Collection[];
    } catch (err) {
        throw new Models.ApiError(err.response.status, err.response.data)
    }
}

export async function getCollectionById(collectionId: string): Promise<Models.Collection> {
    try {
        return (await apiHelpers.get(`/collections/${collectionId}`)).data as Models.Collection;
    } catch (err) {
        throw new Models.ApiError(err.response.status, err.response.data)
    }
}


export async function createWord(collectionId: string, word: Models.Word): Promise<Models.Id> {
    try {
        return (await apiHelpers.post(`/collections/${collectionId}/words`, word)).data as Models.Id;
    } catch (err) {
        throw new Models.ApiError(err.response.status, err.response.data)
    }
}
