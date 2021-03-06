import * as apiHelpers from '@/helpers/api.helper';
import * as Models from '@/models';

export async function getAllCollectionsByClass(mineTag = 'Mine'): Promise<{ [from: string]: Models.Collection[] }> {
    let colls: Models.Collection[] = [];
    const separetedColls: { [from: string]: Models.Collection[] } =  { };
    separetedColls[mineTag] = [];
    try {
        colls = await getAllCollections();
    } catch (err) {
        throw new Models.ApiError(err.getStatusCode(), err.getInfo())
    }
    for (const c of colls) {
        const k = c.inClassName ?? mineTag
        if (separetedColls[k]) {
            separetedColls[k].push(c);
        } else {
            separetedColls[k] = [c];
        }
    }

    return separetedColls;
}

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
export async function updateCollection(collectionId: string, name: string, description: string): Promise<void> {
    try {
        await apiHelpers.put(`/collections/${collectionId}`, {
            name: name,
            description: description,
            index: 1
        });
    } catch (err) {
        throw new Models.ApiError(err.response.status, err.response.data)
    }
}

