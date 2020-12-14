import * as apiHelpers from '@/helpers/api.helper';
import * as Models from '@/models';

export async function getAllCollections(): Promise<Models.Collection[]> {
    try {
        return (await apiHelpers.get('/collections')).data as Models.Collection[];
    } catch (err) {
        throw new Models.ApiError(err.response.status, err.response.data)
    }
}

export async function getMyCollections(): Promise<Models.Collection[]> {
    try {
        return (await apiHelpers.get('/collections?mine=true')).data as Models.Collection[];
    } catch (err) {
        throw new Models.ApiError(err.response.status, err.response.data)
    }
}

export async function getMyCollectionsMin(): Promise<Models.CollectionMin[]> {
    try {
        return (await apiHelpers.get('/collections?mine=true&minified=true')).data as Models.CollectionMin[];
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

export async function createCollection(collection: Models.Collection): Promise<Models.Id> {
    try {
        return (await apiHelpers.post(`/collections`, collection)).data as Models.Id;
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

export async function deleteCollection(collectionId: string): Promise<void> {
    try {
        await apiHelpers.del(`/collections/${collectionId}`);
    } catch (err) {
        throw new Models.ApiError(err.response.status, err.response.data)
    }
}

export async function deleteWord(collectionId: string, wordId: string): Promise<void> {
    try {
        await apiHelpers.del(`/collections/${collectionId}/words/${wordId}`);
    } catch (err) {
        throw new Models.ApiError(err.response.status, err.response.data)
    }
}
